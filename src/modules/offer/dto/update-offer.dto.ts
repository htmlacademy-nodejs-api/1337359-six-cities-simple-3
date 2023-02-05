import { OfferType } from '../../../types/offer-type.enum.js';
import { GoodsType } from '../../../types/goods-type.enum.js';
import { LocationType } from '../../../types/location-type.type.js';

export default class UpdateOfferDto {
  public title?: string;
  public description?: string;
  public offerDate?: Date;
  public previewImage?: string;
  public images?: string[];
  public isPremium?: boolean;
  public rating?: number;
  public type?: OfferType;
  public roomsNumber?: number;
  public maxGuests?: number;
  public price?: number;
  public goods?: GoodsType[];
  public offerAuthorId?: string;
  public commentsNumber?: number;
  public location?: LocationType;
}
