import { IsEmail, IsString, IsBoolean, MaxLength, MinLength } from 'class-validator';

import { VALIDATION_ERROR } from '../user.constant.js';

export default class CreateUserDto {
  @IsString({ message: VALIDATION_ERROR.REQUIRED_NAME })
  @MinLength(1, { message: VALIDATION_ERROR.NAME_MIN })
  @MaxLength(15, { message: VALIDATION_ERROR.NAME_MAX })
  public name!: string;

  @IsString({ message: VALIDATION_ERROR.REQUIRED_PASSWORD })
  @MinLength(6, { message: VALIDATION_ERROR.PASSWORD_MIN })
  @MaxLength(12, { message: VALIDATION_ERROR.PASSWORD_MAX })
  public password!: string;


  @IsString({ message: VALIDATION_ERROR.REQUIRED_EMAIL })
  @IsEmail({}, { message: VALIDATION_ERROR.EMAIL })
  public email!: string;

  @IsString({ message: VALIDATION_ERROR.AVATAR })
  public avatar!: string;

  @IsBoolean({ message: VALIDATION_ERROR.PRO })
  public isPro!: boolean;
}
