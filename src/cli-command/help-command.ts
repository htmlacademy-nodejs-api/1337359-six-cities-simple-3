import chalk from 'chalk';
import { CliCommandInterface } from './cli-command.interface.js';

export default class HelpCommand implements CliCommandInterface {
  public readonly name = '--help';

  public async execute(): Promise<void> {
    console.log(`
      ${chalk.yellowBright.underline('Программа для подготовки данных для REST API сервера.')}

        ${chalk.magentaBright('Пример: cli.js --<command> [--arguments]')}

        ${chalk.cyanBright('Команды:')}

        ${chalk.greenBright('--version:')}                   ${chalk.blueBright('# выводит номер версии')}
        ${chalk.greenBright('--help:')}                      ${chalk.blueBright('# печатает этот текст')}
        ${chalk.greenBright('--import <path>:')}             ${chalk.blueBright('# импортирует данные из TSV')}
        ${chalk.greenBright('--generate <n> <path> <url>')}  ${chalk.blueBright('# генерирует произвольное количество тестовых данных')}
    `);
  }
}
