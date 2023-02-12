import { IsArray, IsString, IsBoolean, IsDateString, IsEnum, ArrayMinSize, ArrayMaxSize, IsInt, Max, MaxLength, Min, MinLength } from 'class-validator';
import { OfferType } from '../../../types/offer-type.enum.js';
import { GoodsType } from '../../../types/goods-type.enum.js';
import { LocationType } from '../../../types/location-type.type.js';
import { VALIDATION_ERROR } from '../offer.constant.js';

export default class UpdateOfferDto {
  @MinLength(10, { message: VALIDATION_ERROR.TITLE_MIN })
  @MaxLength(100, { message: VALIDATION_ERROR.TITLE_MAX })
  public title?: string;

  @MinLength(20, { message: VALIDATION_ERROR.DESCRIPTION_MIN })
  @MaxLength(1024, { message: VALIDATION_ERROR.DESCRIPTION_MAX })
  public description?: string;

  @IsDateString({}, { message: VALIDATION_ERROR.DATE })
  public offerDate?: Date;

  @IsString({ message: VALIDATION_ERROR.IMAGE })
  public previewImage?: string;

  @ArrayMinSize(6, { message: VALIDATION_ERROR.PREV_IMAGES })
  @ArrayMaxSize(6, { message: VALIDATION_ERROR.PREV_IMAGES })
  public images?: string[];

  @IsBoolean({ message: VALIDATION_ERROR.PREMIUM })
  public isPremium?: boolean;

  @IsEnum(OfferType, { message: VALIDATION_ERROR.TYPE })
  public type?: OfferType;

  @IsInt({ message: VALIDATION_ERROR.INTEGER })
  @Min(1, { message: VALIDATION_ERROR.ROOMS_NUMBER_MIN })
  @Max(8, { message: VALIDATION_ERROR.ROOMS_NUMBER_MAX })
  public roomsNumber?: number;

  @IsInt({ message: VALIDATION_ERROR.INTEGER })
  @Min(1, { message: VALIDATION_ERROR.MAX_GUESTS_MIN })
  @Max(10, { message: VALIDATION_ERROR.MAX_GUESTS_MAX })
  public maxGuests?: number;

  @IsInt({ message: VALIDATION_ERROR.INTEGER })
  @Min(100, { message: VALIDATION_ERROR.PRICE_MIN })
  @Max(100000, { message: VALIDATION_ERROR.PRICE_MAX })
  public price?: number;

  @IsArray({ message: VALIDATION_ERROR.GOODS })
  public goods?: GoodsType[];

  public location?: LocationType;
}
