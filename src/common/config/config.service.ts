import { config } from 'dotenv';
import { inject, injectable } from 'inversify';

import { ConfigInterface } from './config.interface.js';
import { LoggerInterface } from '../logger/logger.interface.js';
import { configSchema, ConfigSchema } from './config.schema.js';
import { Component } from '../../types/component.types.js';

@injectable()
export default class ConfigService implements ConfigInterface {
  private config: ConfigSchema;
  private logger: LoggerInterface;

  constructor(@inject(Component.LoggerInterface) logger: LoggerInterface) {
    this.logger = logger;

    const parseOutput = config();

    if (parseOutput.error) {
      throw new Error('Can\'t read .env file, check for file existence' );
    }

    configSchema.load({});
    configSchema.validate({
      allowed: 'strict',
      output: this.logger.info,
    });

    this.config = configSchema.getProperties();
    this.logger.info('.env file was found and parsed successfully');
  }

  public get<T extends keyof ConfigSchema>(key: T) {
    return this.config[key];
  }
}
