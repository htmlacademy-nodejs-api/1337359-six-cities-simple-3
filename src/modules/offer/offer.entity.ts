import typegoose, { getModelForClass, defaultClasses } from '@typegoose/typegoose';
import { Offer } from '../../types/offer.type.js';
import { OfferType } from '../../types/offer-type.enum.js';
import { GoodsType } from '../../types/goods-type.enum.js';
import { LocationType } from '../../types/location-type.type.js';
import { City } from '../../types/city-type.enum.js';
import { UserEntity } from '../user/user.entity.js';
import { COLLECTION_NAME, DEFAULT_VALUE } from '../../common/const.js';

const { prop, modelOptions } = typegoose;

export interface OfferEntity extends defaultClasses.Base { }

@modelOptions({ schemaOptions: { collection: COLLECTION_NAME.OFFER } })
export class OfferEntity extends defaultClasses.TimeStamps implements Offer {
  constructor(data: Offer) {
    super();

    this.title = data.title;
    this.description = data.description;
    this.offerDate = data.offerDate;
    this.city = data.city;
    this.previewImage = data.previewImage;
    this.images = data.images;
    this.isPremium = data.isPremium;
    this.rating = data.rating;
    this.type = data.type;
    this.roomsNumber = data.roomsNumber;
    this.maxGuests = data.maxGuests;
    this.price = data.price;
    this.goods = data.goods;
    this.commentsNumber = data.commentsNumber;
    this.location = data.location;
    this.userId = data.userId;
  }

  @prop({ trim: true })
  public title: string;

  @prop({ default: DEFAULT_VALUE.DESCRIPTION, trim: true })
  public description: string;

  @prop({ default: new Date })
  public offerDate: Date;

  @prop({ default: DEFAULT_VALUE.CITY })
  public city: City;

  @prop({ default:  DEFAULT_VALUE.PREV_IMG})
  public previewImage: string;

  @prop({ default: [] })
  public images: string[];

  @prop ({ default: false })
  public isPremium: boolean;

  @prop ({ default: DEFAULT_VALUE.RATING})
  public rating: number;

  @prop({ default: DEFAULT_VALUE.TYPE, type: () => String, enum: OfferType })
  public type: OfferType;

  @prop ({ default: DEFAULT_VALUE.ROOM })
  public roomsNumber: number;

  @prop({ default: DEFAULT_VALUE.GUEST })
  public maxGuests: number;

  @prop({ default: DEFAULT_VALUE.PRICE })
  public price: number;

  @prop({ default: [], type: () => Array })
  public goods: GoodsType[];

  @prop({ default: 0 })
  public commentsNumber: number;

  @prop({
    ref: UserEntity,
  })
  public userId: string;

  @prop({ required: true, type: () => Object, default: {} })
  public location: LocationType;
}

export const OfferModel = getModelForClass(OfferEntity);
