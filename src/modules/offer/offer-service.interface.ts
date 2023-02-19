import { DocumentType } from '@typegoose/typegoose';

import CreateOfferDto from './dto/create-offer.dto.js';
import { OfferEntity } from './offer.entity.js';
import UpdateOfferDto from './dto/update-offer.dto.js';
import { DocumentExistsInterface } from '../../types/document-exists.interface.js';

export interface OfferServiceInterface extends DocumentExistsInterface {
  create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>>;
  findOfferByTitle(title: string): Promise<DocumentType<OfferEntity> | null>;
  findOrCreateOffer(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>>;
  findOfferById(offerId: string, count?: number): Promise<DocumentType<OfferEntity> | null>;
  findOffersByCity(city: string, count?: number): Promise<DocumentType<OfferEntity>[]>;
  find(count?: number): Promise<DocumentType<OfferEntity>[]>;
  updateOfferById(offerId: string, dto: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null>;
  deleteOfferById(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  incCommentCount(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  findWidthComments(count?: number): Promise<DocumentType<OfferEntity>[]>;
  exists(offerId: string): Promise<boolean>;
  findOfferWithoutUser(offerId: string): Promise<DocumentType<OfferEntity> | null>
}
