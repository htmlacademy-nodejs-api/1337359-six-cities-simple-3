import { IsMongoId, Max, MaxLength, Min, MinLength, IsString, IsInt } from 'class-validator';

import { VALIDATION_ERROR } from '../comment.constant.js';

export default class CreateCommentDto {
  @IsString({ message: VALIDATION_ERROR.REQUIRED_TEXT })
  @MinLength(5, { message: VALIDATION_ERROR.TEXT_MIN })
  @MaxLength(1024, { message: VALIDATION_ERROR.TEXT_MAX })
  public text!: string;

  @IsInt({ message: VALIDATION_ERROR.REQUIRED_RATING })
  @Min(1, { message: VALIDATION_ERROR.RATING_MIN })
  @Max(5, { message: VALIDATION_ERROR.RATING_MAX })
  public rating!: number;

  @IsMongoId({ message: VALIDATION_ERROR.ID })
  public offerId!: string;

  public userId!: string;
}
