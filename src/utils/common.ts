import { Offer } from '../types/offer.type.js';
import { City } from '../types/city-type.type.js';
import { OfferType } from '../types/offer-type.enum.js';
import { GoodsType } from '../types/goods-type.enum.js';

export const createOffer = (row: string): Offer => {
  const [title, description, offerDate, city, previewImage, images, isPremium, rating, type, roomsNumber, maxGuests,
    price, goods, offerAuthorId, commentsNumber, locationLatitude, locationLongitude] = row.replace('\n', '').split('\t');

  return {
    title,
    description,
    offerDate: new Date(offerDate),
    city: <City>city,
    previewImage,
    images: images.split(';'),
    isPremium: Boolean(isPremium),
    rating: parseFloat(rating),
    type: OfferType[type as 'Apartment' | 'House' | 'Room' | 'Hotel'],
    roomsNumber: parseInt(roomsNumber, 10),
    maxGuests: parseInt(maxGuests, 10),
    price: parseInt(price, 10),
    goods: goods.split(';') as GoodsType[],
    offerAuthorId: parseInt(offerAuthorId, 10),
    commentsNumber: parseInt(commentsNumber, 10),
    location: {
      latitude: parseFloat(locationLatitude),
      longitude: parseFloat(locationLongitude),
    }
  };
};

export const getErrorMessage = (error: unknown): string =>
  error instanceof Error ? error.message : '';
