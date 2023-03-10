import { Container } from 'inversify';
import { types } from '@typegoose/typegoose';

import { OfferServiceInterface } from './offer-service.interface.js';
import { ControllerInterface } from '../../common/controller/controller.interface.js';
import OfferService from './offer.service.js';
import { Component } from '../../types/component.types.js';
import OfferController from './offer.controller.js';
import { OfferEntity, OfferModel } from './offer.entity.js';

const offerContainer = new Container();

offerContainer.bind<OfferServiceInterface>(Component.OfferServiceInterface).to(OfferService).inSingletonScope();
offerContainer.bind<types.ModelType<OfferEntity>>(Component.OfferModel).toConstantValue(OfferModel);
offerContainer.bind<ControllerInterface>(Component.OfferController).to(OfferController).inSingletonScope();

export { offerContainer };
