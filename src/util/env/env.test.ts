import type { Logger } from '../logger';
import { EnvKeys } from '../../constants';
import { EnvProvider } from '../env-provider/env-provider';
import { Env } from './env';

describe('Env', () => {
  const envProvider: Partial<EnvProvider> = {
    get: jest.fn().mockImplementation((key: EnvKeys) => {
      return key === EnvKeys.PORT ? '3001' : '';
    }),
  };
  const logger: Partial<Logger> = {
    warn: jest.fn(),
  };
  const env = new Env(<EnvProvider>envProvider, <Logger>logger);

  it('returns env variable value without a warning', () => {
    const value = env.get(EnvKeys.PORT);
    expect(value).toBe('3001');
    expect(logger.warn).not.toHaveBeenCalled();
  });

  it('logs a warning when request env variable has not been set', () => {
    const value = env.get(EnvKeys.RAILWAY_PUBLIC_API);
    expect(value).toBe('');
    expect(logger.warn).toHaveBeenCalledWith(
      'Environment variable "RAILWAY_PUBLIC_API" has not been set.'
    );
  });
});
