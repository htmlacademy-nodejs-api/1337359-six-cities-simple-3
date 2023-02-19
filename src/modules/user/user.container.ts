import { Container } from 'inversify';
import { types } from '@typegoose/typegoose';

import { UserServiceInterface } from './user-service.interface.js';
import { ControllerInterface } from '../../common/controller/controller.interface.js';
import UserService from './user.service.js';
import UserController from './user.controller.js';
import { Component } from '../../types/component.types.js';
import { UserEntity, UserModel } from './user.entity.js';

const userContainer = new Container();

userContainer.bind<UserServiceInterface>(Component.UserServiceInterface).to(UserService).inSingletonScope();
userContainer.bind<types.ModelType<UserEntity>>(Component.UserModel).toConstantValue(UserModel);
userContainer.bind<ControllerInterface>(Component.UserController).to(UserController).inSingletonScope();

export { userContainer };
