import typegoose, { getModelForClass, defaultClasses } from '@typegoose/typegoose';

import { User } from '../../types/user.type.js';
import { createSHAHasher } from '../../utils/common.js';

const { prop, modelOptions } = typegoose;

export interface UserEntity extends defaultClasses.Base {}

@modelOptions({ schemaOptions: { collection: 'users' }})
export class UserEntity extends defaultClasses.TimeStamps implements User {
  constructor(data: User) {
    super();

    this.name = data.name;
    this.email = data.email;
    this.avatar = data.avatar;
    this.isPro = data.isPro;
  }

  @prop({required: true })
  public name: string;

  @prop({ unique: true, required: true })
  public email: string;

  @prop({ default: '' })
  public avatar: string;

  @prop({required: true})
  private password!: string;

  @prop({required: true})
  public isPro: boolean;

  public setPassword(password: string, salt: string) {
    this.password = createSHAHasher(password, salt);
  }

  public getPassword() {
    return this.password;
  }

  public verifyPassword(password: string, salt: string) {

    return createSHAHasher(password, salt) === this.password;
  }
}

export const UserModel = getModelForClass(UserEntity);
