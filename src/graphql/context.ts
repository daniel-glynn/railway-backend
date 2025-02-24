import {graphqlClient} from '../services/graphql-client';
import { Logger } from  '../util/logger';
import prismaClient from '../prisma/index';

export type Context = {
  logger: Logger;
  graphRequest: typeof graphqlClient;
  prisma: typeof prismaClient
};
