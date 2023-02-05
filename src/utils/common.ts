import crypto from 'crypto';
import { plainToInstance } from 'class-transformer';
import { ClassConstructor } from 'class-transformer/types/interfaces/class-constructor.type.js';
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
    offerAuthorId: offerAuthorId,
    commentsNumber: parseInt(commentsNumber, 10),
    location: {
      latitude: parseFloat(locationLatitude),
      longitude: parseFloat(locationLongitude),
    }
  };
};

export const getErrorMessage = (error: unknown): string =>
  error instanceof Error ? error.message : '';

export const createSHAHasher = (line: string, salt: string) => {
  const SHAHasher = crypto.createHmac('sha256', salt);

  return SHAHasher.update(line).digest('hex');
};

export const fillDTO = <T, V>(someDto: ClassConstructor<T>, plainObject: V) =>
  plainToInstance(someDto, plainObject, { excludeExtraneousValues: true });

export const createErrorObject = (message: string) => ({
  error: message,
});
