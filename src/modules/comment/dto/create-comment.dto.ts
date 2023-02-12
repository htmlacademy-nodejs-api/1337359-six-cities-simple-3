import { IsMongoId, Max, MaxLength, Min, MinLength, IsString, IsInt } from 'class-validator';
import { VALIDATION_ERROR } from '../comment.constant.js';

export default class CreateCommentDto {
  @IsString({ message: VALIDATION_ERROR.REQUIRED_TEXT })
  @MinLength(10, { message: VALIDATION_ERROR.TEXT_MIN })
  @MaxLength(100, { message: VALIDATION_ERROR.TEXT_MAX })
  public text!: string;

  @IsInt({ message: VALIDATION_ERROR.REQUIRED_RATING })
  @Min(1, { message: VALIDATION_ERROR.RATING_MIN })
  @Max(5, { message: VALIDATION_ERROR.RATING_MAX })
  public rating!: number;

  @IsMongoId({ message: VALIDATION_ERROR.ID })
  public offerId!: string;

  @IsMongoId({ message: VALIDATION_ERROR.ID })
  public userId!: string;
}
