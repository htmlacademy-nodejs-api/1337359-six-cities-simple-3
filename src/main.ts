import 'reflect-metadata';
import { Container } from 'inversify';
import { appContainer } from './app/application.container.js';
import Application from './app/application.js';
import { Component } from './types/component.types.js';
import { userContainer } from './modules/user/user.container.js';
import { offerContainer } from './modules/offer/offer.container.js';

async function bootstrap() {
  const mainContainer = Container.merge(appContainer, userContainer, offerContainer);
  const application = mainContainer.get<Application>(Component.Application);
  await application.init();
}

bootstrap();
