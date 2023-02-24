import TSVFileReader from '../common/tsv-file-reader.js';
import { CliCommandInterface } from './cli-command.interface.js';
import { createOffer, getErrorMessage } from '../utils/common.js';
import { DatabaseInterface } from '../common/database-client/database.interface.js';
import DatabaseService from '../common/database-client/database.service.js';
import { getURI } from '../utils/db.js';
import { UserServiceInterface } from '../modules/user/user-service.interface.js';
import { OfferServiceInterface } from '../modules/offer/offer-service.interface.js';
import UserService from '../modules/user/user.service.js';
import OfferService from '../modules/offer/offer.service.js';
import { OfferModel } from '../modules/offer/offer.entity.js';
import { UserModel } from '../modules/user/user.entity.js';
import { LoggerInterface } from '../common/logger/logger.interface.js';
import ConsoleLoggerService from '../common/logger/console-logger.service.js';
import { Offer } from '../types/offer.type.js';
import { EVENT_NAME } from '../common/const.js';

const DEFAULT_PARAM = {
  DB_PORT: 27017,
  USER_EMAIL: 'nouser@usera.net',
  USER_ID: '63e9055178f4d29c543a2beb',
} as const;

export default class ImportCommand implements CliCommandInterface {
  public readonly name = '--import';
  private databaseService!: DatabaseInterface;
  private userService!: UserServiceInterface;
  private offerService!: OfferServiceInterface;
  private logger: LoggerInterface;

  constructor() {
    this.onCompleteLine = this.onCompleteLine.bind(this);
    this.onCompleteFile = this.onCompleteFile.bind(this);

    this.logger = new ConsoleLoggerService();
    this.offerService = new OfferService(this.logger, OfferModel);
    this.userService = new UserService(this.logger, UserModel);
    this.databaseService = new DatabaseService(this.logger);
  }

  private async saveOffer(offer: Offer) {

    const user = await this.userService.findByEmail(DEFAULT_PARAM.USER_EMAIL);

    await this.offerService.create({
      ...offer,
      userId: user ? user.id : DEFAULT_PARAM.USER_ID,
    });
  }

  private async onCompleteLine(line: string, resolve: () => void) {
    const offer = createOffer(line);
    await this.saveOffer(offer);
    resolve();
  }

  private onCompleteFile(linesCount: number) {
    console.log(`${linesCount} rows imported.`);
    this.databaseService.disconnect();
  }

  public async execute(filename: string, login: string, password: string, host: string, dbname: string): Promise<void> {
    const uri = getURI(login, password, host, DEFAULT_PARAM.DB_PORT, dbname);

    await this.databaseService.connect(uri);

    const fileReader = new TSVFileReader(filename.trim());

    fileReader.on(EVENT_NAME.LINE, this.onCompleteLine);
    fileReader.on(EVENT_NAME.FILE, this.onCompleteFile);

    try {
      await fileReader.read();
    } catch (err) {
      console.log(`Не удалось прочитать файл: ${getErrorMessage(err)}`);
    }
  }
}
