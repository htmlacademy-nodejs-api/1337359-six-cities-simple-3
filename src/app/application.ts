import { inject, injectable } from 'inversify';
import { LoggerInterface } from '../common/logger/logger.interface.js';
import { ConfigInterface } from '../common/config/config.interface.js';
import { DatabaseInterface } from '../common/database-client/database.interface.js';
import { Component } from '../types/component.types.js';
import { getURI } from '../utils/db.js';
import { OfferServiceInterface } from '../modules/offer/offer-service.interface.js';

@injectable()
export default class Application {
  constructor(
    @inject(Component.LoggerInterface) private logger: LoggerInterface,
    @inject(Component.ConfigInterface) private config: ConfigInterface,
    @inject(Component.DatabaseInterface) private dbClient: DatabaseInterface,
    @inject(Component.OfferServiceInterface) private offerService: OfferServiceInterface,
  ) {}

  public async init() {
    this.logger.info('Application was initialized');
    this.logger.info(`Get value from env $PORT: ${this.config.get('PORT')}`);

    const uri = getURI(
      this.config.get('DB_USER'),
      this.config.get('DB_PASSWORD'),
      this.config.get('DB_HOST'),
      this.config.get('DB_PORT'),
      this.config.get('DB_NAME')
    );

    await this.dbClient.connect(uri);

    const offers = await this.offerService.findWidthComments();
    console.log(offers);

    await this.dbClient.disconnect();
  }
}
