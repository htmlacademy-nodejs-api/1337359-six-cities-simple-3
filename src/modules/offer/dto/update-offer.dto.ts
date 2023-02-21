import { IsArray, IsString, IsBoolean, IsDateString, IsEnum, ArrayMinSize, ArrayMaxSize, IsInt, Max, MaxLength, Min, MinLength, IsOptional } from 'class-validator';

import { OfferType } from '../../../types/offer-type.enum.js';
import { GoodsType } from '../../../types/goods-type.enum.js';
import { LocationType } from '../../../types/location-type.type.js';
import { VALIDATION_ERROR } from '../offer.constant.js';

export default class UpdateOfferDto {
  @IsOptional()
  @MinLength(10, { message: VALIDATION_ERROR.TITLE_MIN })
  @MaxLength(100, { message: VALIDATION_ERROR.TITLE_MAX })
  public title?: string;

  @IsOptional()
  @MinLength(20, { message: VALIDATION_ERROR.DESCRIPTION_MIN })
  @MaxLength(1024, { message: VALIDATION_ERROR.DESCRIPTION_MAX })
  public description?: string;

  @IsOptional()
  @IsDateString({}, { message: VALIDATION_ERROR.DATE })
  public offerDate?: Date;

  @IsOptional()
  @IsString({ message: VALIDATION_ERROR.IMAGE })
  public previewImage?: string;

  @IsOptional()
  @ArrayMinSize(6, { message: VALIDATION_ERROR.PREV_IMAGES })
  @ArrayMaxSize(6, { message: VALIDATION_ERROR.PREV_IMAGES })
  public images?: string[];

  @IsOptional()
  @IsBoolean({ message: VALIDATION_ERROR.PREMIUM })
  public isPremium?: boolean;

  @IsOptional()
  @IsEnum(OfferType, { message: VALIDATION_ERROR.TYPE })
  public type?: OfferType;

  @IsOptional()
  @IsInt({ message: VALIDATION_ERROR.INTEGER })
  @Min(1, { message: VALIDATION_ERROR.ROOMS_NUMBER_MIN })
  @Max(8, { message: VALIDATION_ERROR.ROOMS_NUMBER_MAX })
  public roomsNumber?: number;

  @IsOptional()
  @IsInt({ message: VALIDATION_ERROR.INTEGER })
  @Min(1, { message: VALIDATION_ERROR.MAX_GUESTS_MIN })
  @Max(10, { message: VALIDATION_ERROR.MAX_GUESTS_MAX })
  public maxGuests?: number;

  @IsOptional()
  @IsInt({ message: VALIDATION_ERROR.INTEGER })
  @Min(100, { message: VALIDATION_ERROR.PRICE_MIN })
  @Max(100000, { message: VALIDATION_ERROR.PRICE_MAX })
  public price?: number;

  @IsOptional()
  public rating?: number;

  @IsOptional()
  @IsArray({ message: VALIDATION_ERROR.GOODS })
  public goods?: GoodsType[];

  @IsOptional()
  public location?: LocationType;
}
