import 'reflect-metadata';
import { inject, injectable } from 'inversify';
import { DocumentType, types } from '@typegoose/typegoose';
import { OfferServiceInterface } from './offer-service.interface.js';
import CreateOfferDto from './dto/create-offer.dto.js';
import { OfferEntity } from './offer.entity.js';
import { LoggerInterface } from '../../common/logger/logger.interface.js';
import { Component } from '../../types/component.types.js';

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
}
