import { IsEmail, IsString } from 'class-validator';
import { VALIDATION_ERROR } from '../user.constant.js';

export default class LoginUserDto {
  @IsString({ message: VALIDATION_ERROR.REQUIRED_EMAIL })
  @IsEmail({}, { message: VALIDATION_ERROR.EMAIL })
  public email!: string;

  @IsString({ message: VALIDATION_ERROR.REQUIRED_PASSWORD })
  public password!: string;
}
