import { OfferType } from './offer-type.enum.js';
import { GoodsType } from './goods-type.enum.js';
import { LocationType } from './location-type.type.js';
import { City } from './city-type.enum.js';

export type Offer = {
  title: string;
  description: string;
  offerDate: Date;
  city: City;
  previewImage: string;
  images: string[];
  isPremium: boolean;
  rating: number;
  type: OfferType;
  roomsNumber: number;
  maxGuests: number;
  price: number;
  goods: GoodsType[];
  commentsNumber: number;
  location: LocationType;
  userId: string;
}
