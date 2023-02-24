import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import * as core from 'express-serve-static-core';

import { StatusCodes } from 'http-status-codes';
import { Controller } from '../../common/controller/controller.js';
import { Component } from '../../types/component.types.js';
import { LoggerInterface } from '../../common/logger/logger.interface.js';
import { OfferServiceInterface } from './offer-service.interface.js';
import { HttpMethod } from '../../types/http-method.enum.js';
import { RequestQuery } from '../../types/request-query.type.js';
import OfferResponse from './response/offer.response.js';
import CreateOfferDto from './dto/create-offer.dto.js';
import UpdateOfferDto from './dto/update-offer.dto.js';
import { CommentServiceInterface } from '../comment/comment-service.interface.js';
import CommentResponse from '../comment/response/comment.response.js';
import { fillDTO } from '../../utils/common.js';
import HttpError from '../../common/errors/http-error.js';
import { ValidateObjectIdMiddleware } from '../../common/middlewares/validate-objectid.middleware.js';
import { ValidateDtoMiddleware } from '../../common/middlewares/validate-dto.middleware.js';
import { DocumentExistsMiddleware } from '../../common/middlewares/document-exists.middleware.js';
import { PrivateRouteMiddleware } from '../../common/middlewares/private-route.middleware.js';
import { SameUserIdMiddleware } from '../../common/middlewares/same-userId.middleware.js';
import { ROUTE, ENTITY_NAME, FIELD_NAME } from '../../common/const.js';

type ParamsGetOffer = {
  offerId: string;
}

type ParamsGetFromCity = {
  city: string;
}

@injectable()
export default class OfferController extends Controller {
  constructor(@inject(Component.LoggerInterface) logger: LoggerInterface,
    @inject(Component.OfferServiceInterface) private readonly offerService: OfferServiceInterface,
    @inject(Component.CommentServiceInterface) private readonly commentService: CommentServiceInterface
  ) {
    super(logger);

    this.logger.info('Register routes for OfferController');

    this.addRoute({ path: ROUTE.ROOT, method: HttpMethod.Get, handler: this.index });

    this.addRoute({
      path: ROUTE.ROOT,
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateDtoMiddleware(CreateOfferDto)
      ],
    });

    this.addRoute({
      path: ROUTE.OFFER + ROUTE.OFFER_ID,
      method: HttpMethod.Get,
      handler: this.show,
      middlewares: [
        new ValidateObjectIdMiddleware(FIELD_NAME.OFFER_ID),
        new DocumentExistsMiddleware(this.offerService, ENTITY_NAME.OFFER, FIELD_NAME.OFFER_ID),
      ],
    });

    this.addRoute({ path: ROUTE.CITY, method: HttpMethod.Get, handler: this.getFromCity });

    this.addRoute({
      path: ROUTE.OFFER_ID,
      method: HttpMethod.Delete,
      handler: this.delete,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware(FIELD_NAME.OFFER_ID),
        new SameUserIdMiddleware(FIELD_NAME.OFFER_ID, this.offerService),
        new DocumentExistsMiddleware(this.offerService, ENTITY_NAME.OFFER, FIELD_NAME.OFFER_ID),
      ],
    });

    this.addRoute({
      path: ROUTE.OFFER_ID,
      method: HttpMethod.Patch,
      handler: this.update,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware(FIELD_NAME.OFFER_ID),
        new SameUserIdMiddleware(FIELD_NAME.OFFER_ID, this.offerService),
        new ValidateDtoMiddleware(UpdateOfferDto),
        new DocumentExistsMiddleware(this.offerService, ENTITY_NAME.OFFER, FIELD_NAME.OFFER_ID),
      ],
    });

    this.addRoute({
      path: ROUTE.OFFER_ID + ROUTE.COMMENTS,
      method: HttpMethod.Get,
      handler: this.getComments,
      middlewares: [
        new ValidateObjectIdMiddleware(FIELD_NAME.OFFER_ID),
        new DocumentExistsMiddleware(this.offerService, ENTITY_NAME.OFFER, FIELD_NAME.OFFER_ID),
      ],
    });
  }

  public async index(_req: Request, res: Response): Promise<void> {
    const offers = await this.offerService.find();
    const offerResponse = fillDTO(OfferResponse, offers);
    this.send(res, StatusCodes.OK, offerResponse);
  }

  public async create(
    req: Request<Record<string, unknown>, Record<string, unknown>, CreateOfferDto>,
    res: Response
  ): Promise<void> {
    const { body, user } = req;

    const existOffer = await this.offerService.findOfferByTitle(body.title);
    if (existOffer) {
      throw new HttpError(
        StatusCodes.UNPROCESSABLE_ENTITY,
        `Offer with name «${body.title}» exists.`,
        'OfferController'
      );
    }

    const result = await this.offerService.create({ ...body, userId: user.id });
    const offer = await this.offerService.findOfferById(result.id);
    this.created(res, fillDTO(OfferResponse, offer));
  }

  public async show(
    { params }: Request<core.ParamsDictionary | ParamsGetOffer>,
    res: Response
  ): Promise<void> {
    const { offerId } = params;
    const offer = await this.offerService.findOfferById(offerId);

    this.ok(res, fillDTO(OfferResponse, offer));
  }

  public async delete(
    req: Request<core.ParamsDictionary | ParamsGetOffer>,
    res: Response
  ): Promise<void> {
    const { params } = req;
    const { offerId } = params;
    const offer = await this.offerService.deleteOfferById(offerId);

    await this.commentService.deleteByOfferId(offerId);

    this.noContent(res, offer);
  }

  public async update(
    req: Request<core.ParamsDictionary | ParamsGetOffer, Record<string, unknown>, UpdateOfferDto>,
    res: Response
  ): Promise<void> {
    const { body, params } = req;
    const updatedOffer = await this.offerService.updateOfferById(params.offerId, body);

    this.ok(res, fillDTO(OfferResponse, updatedOffer));
  }

  public async getFromCity(
    { params, query }: Request<core.ParamsDictionary | ParamsGetFromCity, unknown, unknown, RequestQuery>,
    res: Response
  ): Promise<void> {
    const offers = await this.offerService.findOffersByCity(params.city, query.limit);
    this.ok(res, fillDTO(OfferResponse, offers));
  }

  public async getComments(
    { params }: Request<core.ParamsDictionary | ParamsGetOffer, object, object>,
    res: Response
  ): Promise<void> {
    const comments = await this.commentService.findByOfferId(params.offerId);
    this.ok(res, fillDTO(CommentResponse, comments));
  }
}
