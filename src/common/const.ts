export const ENCODING = 'utf-8';
export const JWT_EXPIRATION_TIME = '2d';
export const HIGH_WATER_MARK = 2 ** 14;

export const ROUTE = {
  ROOT: '/',
  OFFERS: '/offers',
  OFFER: '/offer',
  COMMENTS: '/comments',
  USERS: '/users',
  UPLOAD: '/upload',
  LOGIN: '/login',
  REGISTER: '/register',
  OFFER_ID: '/:offerId',
  USER_ID: '/:userId',
  AVATAR: '/avatar',
  CITY: '/:city',
};

export const EVENT_NAME = {
  LINE: 'completeLine',
  FILE: 'end',
};

export const ENTITY_NAME = {
  OFFER: 'Offer',
  USER: 'User',
  COMMENT: 'Comment',
};

export const FIELD_NAME = {
  OFFER_ID: 'offerId',
  USER_ID: 'userId',
  AVATAR: 'avatar',
  RATING: 'rating'
};

export const COLLECTION_NAME = {
  OFFER: 'offers',
  USER: 'users',
  COMMENT: 'comments',
};

export const DEFAULT_VALUE = {
  CITY: 'Paris',
  DESCRIPTION: 'This is empty offer description',
  PREV_IMG: 'https://assets.htmlacademy.ru/intensives/javascript-3/hotel/10.jpg',
  TYPE: 'Apartment',
  PRICE: 1000,
  ROOM: 1,
  GUEST: 2,
  RATING: 1,
};
