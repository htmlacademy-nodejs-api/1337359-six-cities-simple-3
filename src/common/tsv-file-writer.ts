import { createWriteStream, WriteStream } from 'fs';

import { FileWriterInterface } from './file-writer.interface.js';
import { HIGH_WATER_MARK } from '../common/const.js';

export default class TSVFileWriter implements FileWriterInterface {
  private stream: WriteStream;

  constructor(public readonly fileName: string) {
    this.stream = createWriteStream(this.fileName, {
      flags: 'w',
      encoding: 'utf8',
      highWaterMark: HIGH_WATER_MARK,
      autoClose: true,
    });
  }

  public async write(row: string): Promise<void> {
    if (!this.stream.write(`${row}\n`)) {
      return new Promise((resolve) => {
        this.stream.once('drain', () => resolve());
      });
    }

    return Promise.resolve();
  }
}
