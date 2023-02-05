import { Expose } from 'class-transformer';

export default class OfferResponse {
  @Expose()
  public _id!: string;

  @Expose()
  public title!: string;
}
