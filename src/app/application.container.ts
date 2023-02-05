import { Container } from 'inversify';
import { ExceptionFilterInterface } from '../common/errors/exception-filter.interface.js';
import Application from './application.js';
import { ConfigInterface } from '../common/config/config.interface.js';
import ConfigService from '../common/config/config.service.js';
import { LoggerInterface } from '../common/logger/logger.interface.js';
import LoggerService from '../common/logger/logger.service.js';
import { DatabaseInterface } from '../common/database-client/database.interface.js';
import DatabaseService from '../common/database-client/database.service.js';
import ExceptionFilter from '../common/errors/exception-filter.js';
import { Component } from '../types/component.types.js';

const appContainer = new Container();
appContainer.bind<Application>(Component.Application).to(Application).inSingletonScope();
appContainer.bind<ConfigInterface>(Component.ConfigInterface).to(ConfigService).inSingletonScope();
appContainer.bind<LoggerInterface>(Component.LoggerInterface).to(LoggerService).inSingletonScope();
appContainer.bind<DatabaseInterface>(Component.DatabaseInterface).to(DatabaseService).inSingletonScope();
appContainer.bind<ExceptionFilterInterface>(Component.ExceptionFilterInterface).to(ExceptionFilter).inSingletonScope();

export {appContainer};
