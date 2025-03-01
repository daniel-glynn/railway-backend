import { EnvKeys } from '../../constants';
import { EnvProvider } from './env-provider';
import ProcessEnv = NodeJS.ProcessEnv;

describe('EnvService', () => {
  let envService: EnvProvider;
  let env: ProcessEnv;

  beforeEach(() => {
    env = {
      PORT: '3000',
    };
    envService = new EnvProvider(env);
  });

  it('returns env config value', () => {
    const value = envService.get(EnvKeys.PORT);
    expect(value).toEqual('3000');
  });

  it('returns an empty string when env config is not set', () => {
    const value = envService.get(EnvKeys.DATABASE_URL);
    expect(value).toEqual('');
  });
});
