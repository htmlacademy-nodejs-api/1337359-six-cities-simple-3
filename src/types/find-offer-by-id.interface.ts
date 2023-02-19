import { DocumentType } from '@typegoose/typegoose';
import { OfferEntity } from '../modules/offer/offer.entity.js';

export interface FindOfferByIdInterface {
  findOfferWithoutUser(offerId: string): Promise<DocumentType<OfferEntity> | null>
}
