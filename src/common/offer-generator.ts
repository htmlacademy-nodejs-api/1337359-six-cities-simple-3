import dayjs from 'dayjs';
import { OfferGeneratorInterface } from './offer-generator.interface.js';
import { MockData } from '../types/mock-data.type.js';
import { City } from '../types/city-type.type.js';
import { getRandomItem, getRandomArr, generateRandomInt, generateRandomFloat, getPrettyNumber } from '../utils/random.js';

const IMAGES_NUMBER = 6;
const MAX_ROOMS = 8;
const MAX_GUESTS = 10;
const MAX_ID = 1000;
const MAX_COMMENTS = 30;
const DAYS_BEFORE = 14;

const PRICE = {
  min: 100,
  max: 100000,
};

const RATING = {
  min: 1,
  max: 5,
  decimal: 1,
};

const LOCATION = {
  'Dusseldorf': {
    latitude: '51.22',
    longitude: '6.77',
  },
  'Brussels': {
    latitude: '50.84',
    longitude: '4.35',
  },
  'Amsterdam': {
    latitude: '52.37',
    longitude: '4.89',
  },
  'Cologne': {
    latitude: '50.93',
    longitude: '6.95',
  },
  'Paris': {
    latitude: '48.85',
    longitude: '2.35',
  },
  'Hamburg': {
    latitude: '53.55',
    longitude: '10.00',
  },
};

const LOCATIONS_DIGITS_TEMPLATE = '0000';
const MAX_LOCATION_DIGITS = 9999;

const getAdditionalLocationDigits = (): string =>
  (LOCATIONS_DIGITS_TEMPLATE + generateRandomInt(MAX_LOCATION_DIGITS).toString()).slice(-LOCATIONS_DIGITS_TEMPLATE.length);

export default class OfferGenerator implements OfferGeneratorInterface {
  constructor(private readonly mockData: MockData) {}

  public generate(): string {
    const title = getRandomItem(this.mockData.title);
    const description = getRandomItem(this.mockData.description);
    const offerDate = dayjs().subtract(generateRandomInt(DAYS_BEFORE), 'day').toISOString();
    const city = <City>getRandomItem(this.mockData.city);
    const previewImage = getRandomItem(this.mockData.images);
    const images = getRandomArr(this.mockData.images, IMAGES_NUMBER);
    const isPremium = Math.random() > 0.7;
    const rating = generateRandomFloat(RATING.max, RATING.min, RATING.decimal);
    const type = getRandomItem(this.mockData.type);
    const roomsNumber = generateRandomInt(MAX_ROOMS);
    const maxGuests = generateRandomInt(MAX_GUESTS);
    const price = getPrettyNumber(generateRandomInt(PRICE.max, PRICE.min), 2);
    const goods = getRandomArr(this.mockData.goods);
    const offerAuthorId = `${generateRandomInt(MAX_ID)}`;
    const commentsNumber = generateRandomInt(MAX_COMMENTS);
    const latitude = LOCATION[city].latitude + getAdditionalLocationDigits();
    const longitude = LOCATION[city].longitude + getAdditionalLocationDigits();

    return [title, description, offerDate, city, previewImage, images.join(';'), isPremium, rating, type, roomsNumber, maxGuests,
      price, goods.join(';'), offerAuthorId, commentsNumber, latitude, longitude].join('\t');
  }
}
