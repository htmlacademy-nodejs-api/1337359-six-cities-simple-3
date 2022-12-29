import TSVFileReader from '../common/tsv-file-reader.js';
import { CliCommandInterface } from './cli-command.interface.js';
import { createOffer, getErrorMessage } from '../utils/common.js';

export default class ImportCommand implements CliCommandInterface {
  public readonly name = '--import';

  private onCompleteLine(line: string): void {
    const offer = createOffer(line);
    console.log(offer);
  }

  private onCompleteFile(linesCount: number): void {
    console.log(`Импортировано ${linesCount} строк`);
  }

  public async execute(fileName: string): Promise<void> {
    const fileReader = new TSVFileReader(fileName.trim());

    fileReader.on('completeLine', this.onCompleteLine);
    fileReader.on('end', this.onCompleteFile);

    try {
      await fileReader.read();
    } catch (err) {
      console.log(`Не удалось прочитать файл: ${getErrorMessage(err)}`);
    }
  }
}
