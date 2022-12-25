import { CliCommandInterface } from '../cli-command/cli-command.interface.js';

type Command = {
  [key: string]: string[],
}

export default class CliApplication {
  private commands: { [propertyName: string]: CliCommandInterface } = {};

  private defaultCommand = '--help';

  private parseCommand(args: string[]): Command {
    const parsedCommand: Command = {};
    let command = '';

    return args.reduce((acc, item) => {
      if (item.startsWith('--')) {
        acc[item] = [];
        command = item;
      } else if (command && item) {
        acc[command].push(item);
      }

      return acc;
    }, parsedCommand);
  }

  public registerCommands(commandList: CliCommandInterface[]): void {
    commandList.reduce((acc, command) => {
      acc[command.name] = command;

      return acc;
    }, this.commands);
  }

  public getCommand(commandName: string): CliCommandInterface {
    return this.commands[commandName] ?? this.commands[this.defaultCommand];
  }

  public processCommand(argv: string[]): void {
    const parsedCommand = this.parseCommand(argv);
    const [commandName] = Object.keys(parsedCommand);
    const command = this.getCommand(commandName);
    const args = parsedCommand[commandName] ?? [];

    command.execute(...args);
  }
}
