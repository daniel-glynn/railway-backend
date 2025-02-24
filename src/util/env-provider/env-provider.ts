import { EnvKeys } from '../../constants';

type ProcessEnv = NodeJS.ProcessEnv;

export class EnvProvider {
  constructor(private readonly env: ProcessEnv) {
    this.env = env;
  }

  get(variable: EnvKeys): string {
    return this.env[variable] || '';
  }
}
