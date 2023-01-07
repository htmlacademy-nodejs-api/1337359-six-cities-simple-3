import { got } from 'got';
import { CliCommandInterface } from './cli-command.interface.js';
import TSVFileWriter from '../common/tsv-file-writer.js';
import { MockData } from '../types/mock-data.type.js';
import OfferGenerator from '../common/offer-generator.js';

export default class GenerateCommand implements CliCommandInterface {
  public readonly name = '--generate';
  private initialData?: MockData;

  public async execute(...parameters: string[]): Promise<void> {
    const [count, resultPath, sourceDataUrl] = parameters;
    const offerCount = parseInt(count, 10);

    try {
      this.initialData = await got.get(sourceDataUrl).json();
    } catch {
      console.log(`Не удалось загрузить данные с ${sourceDataUrl}`);
    }

    if (this.initialData) {
      const offerGeneratorString = new OfferGenerator(this.initialData);
      const fileWriter = new TSVFileWriter(resultPath);

      for (let i = 1; i <= offerCount; i++) {
        await fileWriter.write(offerGeneratorString.generate());
      }

      console.log(`Файл ${resultPath} создан`);
    } else {
      console.log(`Не удалось создать файл ${resultPath}`);
    }
  }
}
