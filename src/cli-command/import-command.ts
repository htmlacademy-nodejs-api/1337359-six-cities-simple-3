import chalk from 'chalk';
import TSVFileReader from '../common/tsv-file-reader.js';
import { CliCommandInterface } from './cli-command.interface.js';

export default class ImportCommand implements CliCommandInterface {
  public readonly name = '--import';

  public execute(fileName: string): void {
    const fileReader = new TSVFileReader(fileName.trim());

    try {
      fileReader.read();
      console.log(fileReader.parseData());

    } catch (err) {
      if (!(err instanceof Error)) {
        throw err;
      }

      console.log(chalk.redBright(`Не удалось импортировать данные из файла по причине: «${chalk.underline(err.message)}»`));
    }
  }
}
