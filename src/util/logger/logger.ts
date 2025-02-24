import type { Logger as PinoLogger } from 'pino';
import pino from 'pino';

export class Logger {
  private logger: PinoLogger;
  constructor() {
    const pinoLogger = pino(
      {
        enabled: true,
        level: 'INFO',
      },
    );

    this.logger = pinoLogger;
  }

  info(msg: string, obj?: any): void {
    this.logger?.info(obj, msg);
  }

  debug(message: any): void {
    this.logger?.debug(message);
  }

  warn(message: any): void {
    this.logger?.warn(message);
  }

  error(message: any): void {
    this.logger?.error(message);
  }
}