import dotenv from 'dotenv';
import { EnvProvider } from './env-provider';

dotenv.config({ path: '.env' });

export const envProvider = new EnvProvider(process.env);
