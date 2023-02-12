export const DEFAULT_OFFER_COUNT = 60;

export const VALIDATION_ERROR = {
  TITLE_MIN: 'Minimum title length must be 10',
  TITLE_MAX: 'Maximum title length must be 100',
  DESCRIPTION_MIN: 'Minimum description length must be 20',
  DESCRIPTION_MAX: 'Maximum description length must be 1024',
  DATE: 'Date must be valid ISO date',
  CITY: 'City must be one of the cities: Amsterdam / Dusseldorf / Brussels / Cologne / Paris / Hamburg',
  IMAGE: 'Preview image must be string',
  PREV_IMAGES: 'There must be 6 preview images',
  PREMIUM: 'Type must be boolean',
  TYPE: 'Type must be one of the  Apartment / House / Room / Hotel',
  INTEGER: 'Value must be integer',
  ROOMS_NUMBER_MIN: 'Minimum rooms number is 1',
  ROOMS_NUMBER_MAX: 'Maximum rooms number is 8',
  MAX_GUESTS_MIN: 'Minimum guests number is 1',
  MAX_GUESTS_MAX: 'Maximum guests number is 10',
  PRICE_MIN: 'Minimum price is 100',
  PRICE_MAX: 'Maximum price is 100000',
  GOODS: 'Goods field must be an array of valid good type',
  ID: 'Field must be valid an id',
  LOCATION: '',
};
