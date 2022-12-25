#!/usr/bin/env node

import VersionCommand from './cli-command/version-command.js';
import HelpCommand from './cli-command/help-command.js';
import ImportCommand from './cli-command/import-command.js';
import CLIApplication from './app/cli-application.js';

const commandManager = new CLIApplication();
commandManager.registerCommands([new VersionCommand, new HelpCommand, new ImportCommand]);
commandManager.processCommand(process.argv);
