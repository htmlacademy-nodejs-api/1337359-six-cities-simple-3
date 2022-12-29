import { got } from 'got';
import { appendFile } from 'fs/promises';
import { CliCommandInterface } from './cli-command.interface.js';
import { MockData } from '../types/mock-data.type.js';
import OfferGenerator from '../common/offer-generator.js';

export default class GenerateCommand implements CliCommandInterface {
  public readonly name = '--generate';
  private initialData!: MockData;

  public async execute(...parameters: string[]): Promise<void> {
    const [count, resultPath, sourceDataUrl] = parameters;
    const offerCount = parseInt(count, 10);

    try {
      this.initialData = await got.get(sourceDataUrl).json();
    } catch {
      console.log(`Не удалось загрузить данные с ${sourceDataUrl}`);
    }

    const offerGeneratorString = new OfferGenerator(this.initialData);

    for (let i = 1; i <= offerCount; i++) {
      await appendFile(resultPath, `${offerGeneratorString.generate()}\n`, 'utf-8');
    }

    console.log(`Файл ${resultPath} создан`);
  }
}
