import { logger } from '../logger';
import { envProvider } from '../env-provider';
import { Env } from './env';

export const env = new Env(envProvider, logger);

export { Env };
