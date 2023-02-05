import typegoose, { getModelForClass, defaultClasses, Ref } from '@typegoose/typegoose';
import { Offer } from '../../types/offer.type.js';
import { OfferType } from '../../types/offer-type.enum.js';
import { GoodsType } from '../../types/goods-type.enum.js';
import { LocationType } from '../../types/location-type.type.js';
import { City } from '../../types/city-type.type.js';
import { UserEntity } from '../user/user.entity.js';

interface IOffer extends Offer {
  userId: Ref<UserEntity | undefined>;
}

const { prop, modelOptions } = typegoose;

export interface OfferEntity extends defaultClasses.Base { }

@modelOptions({ schemaOptions: { collection: 'offers' } })
export class OfferEntity extends defaultClasses.TimeStamps implements Offer {
  constructor(data: IOffer) {
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

  @prop({ required: true, trim: true, minlength: 10, maxlength: 100 })
  public title: string;

  @prop({ required: true, default: 'This is empty offer description', trim: true, minlength: 20, maxlength: 1024 })
  public description: string;

  @prop({ required: true, default: new Date })
  public offerDate: Date;

  @prop({ required: true, default: 'Paris' })
  public city: City;

  @prop({ required: true, default: 'https://assets.htmlacademy.ru/intensives/javascript-3/hotel/10.jpg' })
  public previewImage: string;

  @prop({ required: true, default: [] })
  public images: string[];

  @prop ({ required: true, default: false })
  public isPremium: boolean;

  @prop ({ min: 1, max: 5, default: 1})
  public rating: number;

  @prop({ required: true, default: 'Apartment', type: () => String, enum: OfferType })
  public type: OfferType;

  @prop ({ required: true, min: 1, max: 8, default: 2 })
  public roomsNumber: number;

  @prop({ required: true, min: 1, max: 10, default: 2 })
  public maxGuests: number;

  @prop({ required: true, min: 100, max: 100000, default: 2000 })
  public price: number;

  @prop({ required: true, default: [], type: () => Array })
  public goods: GoodsType[];

  @prop({ default: 0 })
  public commentsNumber: number;

  @prop({
    ref: UserEntity,
  })
  public userId: Ref<UserEntity>;

  @prop()
  public offerAuthorId!: string;

  @prop({ required: true, type: () => Object, default: {} })
  public location: LocationType;
}

export const OfferModel = getModelForClass(OfferEntity);
