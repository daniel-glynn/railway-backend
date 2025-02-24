import {graphqlClient} from '../services/graphql-client';
import { Logger } from '../util/logger';

export type Context = {
  logger: Logger;
  graphRequest: typeof graphqlClient;
};
