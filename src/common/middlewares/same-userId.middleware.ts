import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { MiddlewareInterface } from '../../types/middleware.interface.js';
import { FindOfferByIdInterface } from '../../types/find-offer-by-id.interface.js';
import HttpError from '../errors/http-error.js';

export class SameUserIdMiddleware implements MiddlewareInterface {
  constructor(
    private readonly param: string,
    private readonly service: FindOfferByIdInterface,
  ) { }

  public async execute(req: Request, _res: Response, next: NextFunction): Promise<void> {
    const { params, user } = req;
    const offer = await this.service.findOfferWithoutUser(params[this.param]);

    if (offer?.userId === user.id) {
      return next();
    }

    throw new HttpError(
      StatusCodes.BAD_REQUEST,
      `This offer does not belong to the user ${user.id}`,
      'SameUserIdMiddleware'
    );
  }
}
