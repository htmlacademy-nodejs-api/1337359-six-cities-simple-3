import { readFileSync } from 'fs';
import { FileReaderInterface } from './file-reader.interface.js';
import { Offer } from '../types/offer.type.js';
import { City } from '../types/city-type.type.js';
import { OfferType } from '../types/offer-type.enum.js';
import { GoodsType } from '../types/goods-type.enum.js';

export default class TSVFileReader implements FileReaderInterface {
  private data = '';

  constructor(public fileName: string) { }

  public read(): void {
    this.data = readFileSync(this.fileName, { encoding: 'utf8' });
  }

  public parseData(): Offer[] {
    if (!this.data) {
      return [];
    }

    return this.data.split('\n')
      .filter((str) => str.trim() !== '')
      .map((str) => str.split('\t'))
      .map(([
        title,
        description,
        offerDate,
        city,
        previewImage,
        images,
        isPremium,
        rating,
        type,
        roomsNumber,
        maxGuests,
        price,
        goods,
        offerAuthorId,
        commentsNumber,
        locationLatitude,
        locationLongitude,
      ]) => ({
        title,
        description,
        offerDate: new Date(offerDate),
        city: city as City,
        previewImage,
        images: images.split(';'),
        isPremium: Boolean(isPremium),
        rating: +rating,
        type: OfferType[type as 'Apartment' | 'House' | 'Room' | 'Hotel'],
        roomsNumber: +roomsNumber,
        maxGuests: +maxGuests,
        price: +price,
        goods: goods.split(';') as GoodsType[],
        offerAuthorId: +offerAuthorId,
        commentsNumber: +commentsNumber,
        location: {
          latitude: +locationLatitude,
          longitude: +locationLongitude,
        }
      }));
  }
}
