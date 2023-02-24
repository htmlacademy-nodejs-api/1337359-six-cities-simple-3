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
import { FIELD_NAME } from '../../common/const.js';

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

  public async findOfferWithoutUser(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findById(offerId)
      .exec();
  }

  public async findOfferById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findById(offerId)
      .populate([FIELD_NAME.USER_ID])
      .exec();
  }

  public async findOffersByCity(city: string, count?: number): Promise<DocumentType<OfferEntity>[]> {
    const limit = count ?? DEFAULT_OFFER_COUNT;
    return this.offerModel
      .find({ city: city }, {}, { limit })
      .populate([FIELD_NAME.USER_ID])
      .exec();
  }

  public async find(count?: number): Promise<DocumentType<OfferEntity>[]> {
    const limit = count ?? DEFAULT_OFFER_COUNT;

    return this.offerModel
      .find()
      .sort({ createdAt: SortType.Down })
      .limit(limit)
      .populate([FIELD_NAME.USER_ID])
      .exec();
  }

  public async updateOfferById(offerId: string, dto: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, dto, { new: true })
      .populate([FIELD_NAME.USER_ID])
      .exec();
  }

  public async deleteOfferById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
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
      ])
      .sort({ createdAt: SortType.Down })
      .limit(limit)
      .exec()
      .then((offers) => offers.map((it) => {
        const result = {
          ...it,
          commentsNumber: it.commentsRatings.length,
          rating: it.commentsRatings.length === 0 ? 0 :
            it.commentsRatings.reduce((sum: number, current: Record<string, number>) => sum + current.rating, 0) / it.commentsRatings.length,
        };
        delete result.commentsRatings;

        return result;
      }));
  }

  public async exists(offerId: string): Promise<boolean> {
    return (await this.offerModel
      .exists({ _id: offerId })) !== null;
  }
}
