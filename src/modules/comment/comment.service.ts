import 'reflect-metadata';
import { inject, injectable } from 'inversify';
import { DocumentType, types } from '@typegoose/typegoose';

import { CommentServiceInterface } from './comment-service.interface.js';
import { Component } from '../../types/component.types.js';
import { CommentEntity } from './comment.entity.js';
import { LoggerInterface } from '../../common/logger/logger.interface.js';
import CreateCommentDto from './dto/create-comment.dto.js';
import { DEFAULT_COMMENT_COUNT } from './comment.constant.js';
// сюда добавить увеличение числа комментов из offer?

@injectable()
export default class CommentService implements CommentServiceInterface {
  constructor(
    @inject(Component.LoggerInterface) private logger: LoggerInterface,
    @inject(Component.CommentModel) private readonly commentModel: types.ModelType<CommentEntity>
  ) {}

  public async create(dto: CreateCommentDto): Promise<DocumentType<CommentEntity>> {
    const comment = await this.commentModel.create(dto);
    this.logger.info(`New comment created: ${comment.text}`);

    return comment.populate('userId');
  }

  public async findByOfferId(offerId: string, count?: number): Promise<DocumentType<CommentEntity>[]> {
    const limit = count ?? DEFAULT_COMMENT_COUNT;

    return this.commentModel
      .find({ offerId }, {}, { limit })
      .populate('userId');
  }

  public async findAvgRating(): Promise<DocumentType<CommentEntity>[]> {

    return this.commentModel
      .aggregate([{ $group: { _id: '$offerId' , avg:{$avg:'$rating'}}}]);
  }

  public async deleteByOfferId(offerId: string): Promise<number> {
    const result = await this.commentModel
      .deleteMany({ offerId })
      .exec();

    return result.deletedCount;
  }
}
