import { IsString, IsBoolean, MaxLength, MinLength, IsOptional } from 'class-validator';

import { VALIDATION_ERROR } from '../user.constant.js';

export default class UpdateUserDto {
  @IsOptional()
  @IsString({ message: VALIDATION_ERROR.AVATAR })
  public avatar?: string;

  @IsOptional()
  @IsString({ message: VALIDATION_ERROR.REQUIRED_NAME })
  @MinLength(1, { message: VALIDATION_ERROR.NAME_MIN })
  @MaxLength(15, { message: VALIDATION_ERROR.NAME_MAX })
  public name?: string;

  @IsOptional()
  @IsBoolean({ message: VALIDATION_ERROR.PRO })
  public isPro?: boolean;
}
