import { config, DotenvParseOutput } from 'dotenv';
import { ConfigInterface } from './config.interface.js';
import { LoggerInterface } from '../logger/logger.interface.js';

export default class ConfigService implements ConfigInterface {
  private config: DotenvParseOutput;
  private logger: LoggerInterface;

  constructor(logger: LoggerInterface) {
    this.logger = logger;

    const parseOutput = config();

    if (parseOutput.error) {
      throw new Error('Can\'t read .env file, check for file existence' );
    }

    this.config = <DotenvParseOutput>parseOutput.parsed;
    this.logger.info('.env file was found and parsed successfully');
  }

  public get(key: string): string | undefined {
    return this.config[key];
  }
}
