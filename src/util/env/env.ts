import type { Logger } from '../logger';
import type { EnvKeys } from '../../constants';
import type { EnvProvider } from '../env-provider/env-provider';

export class Env {
  constructor(private env: EnvProvider, private logger: Logger) {}

  get(variable: EnvKeys): string {
    const value = this.env.get(variable);

    if (!value) {
      this.logger.warn(`Environment variable "${variable}" has not been set.`);
    }

    return value;
  }
}
