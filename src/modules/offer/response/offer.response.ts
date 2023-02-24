import { Expose, Type } from 'class-transformer';

import UserResponse from '../../user/response/user.response.js';
import { FIELD_NAME } from '../../../common/const.js';

export default class OfferResponse {
  @Expose()
  public id!: string;

  @Expose()
  public title!: string;

  @Expose()
  public description!: string;

  @Expose()
  public offerDate!: string;

  @Expose()
  public city!: string;

  @Expose()
  public previewImage!: string;

  @Expose()
  public images!: string[];

  @Expose()
  public isPremium!: boolean;

  @Expose()
  public rating!: number;

  @Expose()
  public type!: string;

  @Expose()
  public roomsNumber!: number;

  @Expose()
  public maxGuests!: number;

  @Expose()
  public price!: number;

  @Expose()
  public goods!: string[];

  @Expose()
  public commentsNumber!: number;

  @Expose()
  public location!: object;

  @Expose({ name: FIELD_NAME.USER_ID })
  @Type(() => UserResponse)
  public author!: UserResponse;
}
