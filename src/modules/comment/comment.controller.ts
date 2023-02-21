import { Request, Response } from 'express';
import { inject } from 'inversify';
import { StatusCodes } from 'http-status-codes';

import { Controller } from '../../common/controller/controller.js';
import { Component } from '../../types/component.types.js';
import { LoggerInterface } from '../../common/logger/logger.interface.js';
import { CommentServiceInterface } from './comment-service.interface.js';
import CreateCommentDto from './dto/create-comment.dto.js';
import { OfferServiceInterface } from '../offer/offer-service.interface.js';
import HttpError from '../../common/errors/http-error.js';
import { HttpMethod } from '../../types/http-method.enum.js';
import { fillDTO } from '../../utils/common.js';
import CommentResponse from './response/comment.response.js';
import { PrivateRouteMiddleware } from '../../common/middlewares/private-route.middleware.js';
import { ValidateDtoMiddleware } from '../../common/middlewares/validate-dto.middleware.js';
import { ROUTE } from '../../common/const.js';

export default class CommentController extends Controller {
  constructor(
    @inject(Component.LoggerInterface) logger: LoggerInterface,
    @inject(Component.CommentServiceInterface) private readonly commentService: CommentServiceInterface,
    @inject(Component.OfferServiceInterface) private readonly offerService: OfferServiceInterface,
  ) {
    super(logger);

    this.logger.info('Register routes for CommentController…');
    this.addRoute({
      path: ROUTE.ROOT,
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateDtoMiddleware(CreateCommentDto),
      ],
    });
  }

  public async create(
    req: Request<object, object, CreateCommentDto>,
    res: Response
  ): Promise<void> {
    const { body } = req;

    if (!await this.offerService.exists(body.offerId)) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${body.offerId} not found.`,
        'CommentController'
      );
    }

    const comment = await this.commentService.create({ ...body, userId: req.user.id });
    const avgRatings = await this.commentService.findAvgRating();
    const avgRating = avgRatings.find((it) => it._id.toString() === body.offerId)?.avg;
    const newRating = avgRating ? Math.trunc(avgRating * 10) / 10 : body.rating;

    await this.offerService.incCommentCount(body.offerId);
    await this.offerService.updateOfferById(body.offerId, { rating: newRating });

    this.created(res, fillDTO(CommentResponse, comment));
  }
}
