import 'reflect-metadata';
import { inject, injectable } from 'inversify';
import { DocumentType, types } from '@typegoose/typegoose';
import { OfferServiceInterface } from './offer-service.interface.js';
import CreateOfferDto from './dto/create-offer.dto.js';
import UpdateOfferDto from './dto/update-offer.dto.js';
import { OfferEntity } from './offer.entity.js';
import { LoggerInterface } from '../../common/logger/logger.interface.js';
import { Component } from '../../types/component.types.js';
import { SortType } from '../../types/sort-type.enum.js';
import { DEFAULT_OFFER_COUNT } from './offer.constant.js';

@injectable()
export default class OfferService implements OfferServiceInterface {
  constructor(
    @inject(Component.LoggerInterface) private logger: LoggerInterface,
    @inject(Component.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>,
  ) {}

  public async create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>> {
    const offer = new OfferEntity(dto);

    const result = await this.offerModel.create(offer);
    this.logger.info(`New offer created: ${offer.title}`);

    return result;
  }

  public async findOfferByTitle(title: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel.findOne({ title });
  }

  public async findOrCreateOffer(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>> {
    const existedOffer = await this.findOfferByTitle(dto.title);

    if (existedOffer) {
      return existedOffer;
    }

    return this.create(dto);
  }

  public async findById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findById(offerId)
      .populate(['userId'])
      .exec();
  }

  public async find(count?: number): Promise<DocumentType<OfferEntity>[]> {
    const limit = count ?? DEFAULT_OFFER_COUNT;

    return this.offerModel
      .find()
      .sort({ createdAt: SortType.Down })
      .limit(limit)
      .populate(['userId'])
      .exec();
  }

  public async updateById(offerId: string, dto: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, dto, { new: true })
      .populate(['userId'])
      .exec();
  }

  public async deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndDelete(offerId)
      .exec();
  }

  public async incCommentCount(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, {
        '$inc': {
          commentsNumber: 1,
        }
      }).exec();
  }

  public async findWidthComments(count?: number): Promise<DocumentType<OfferEntity>[]> {
    const limit = count ?? DEFAULT_OFFER_COUNT;

    return this.offerModel
      .aggregate([
        {
          $lookup: {
            from: 'comments',
            let: { offerId: '$_id' },
            pipeline: [
              { $match: { $expr: { $eq: ['$$offerId', '$offerId'] } } },
              { $project: { rating: 1 } },
            ],
            as: 'commentsRatings',
          },
        },
        {
          $addFields:
          {
            commentsNum: { $size: '$commentsRatings' },
            avgRating: { $avg: '$commentsRatings' },
            // Вопрос: Как правильно здесь посчитать среднее?
          },
        },
        { $unset: 'commentsRatings' },
      ])
      .sort({ createdAt: SortType.Down })
      .limit(limit)
      // Вопрос: если добавлять .populate... , получаю ошибку Свойство "populate" не существует в типе "Aggregate<any[]>"
      // видимо, юзера нужно добавлять тоже через aggregate? Если да, это должен быть второй aggregate из users?
      // .populate(['userId'])
      .exec();
  }
}
