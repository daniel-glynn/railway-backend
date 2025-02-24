import express from 'express';
import http from 'http';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import type { Application } from 'express';
import cors from 'cors';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

import { Context } from './graphql/context'
import {graphqlClient} from './services/graphql-client'
import { logger } from './util/logger';
import {resolvers} from './graphql/schema';
import prismaClient from './prisma';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const typeDefs = readFileSync(`${__dirname}/graphql/schema.graphql`, 'utf8');

const buildGraphQLApp = (app: Application): Application => {
  app.use(express.json());

  const startApolloServer = async () => {
    const httpServer = http.createServer(app);

    const server = new ApolloServer<Context>({
      schema: makeExecutableSchema({
        typeDefs,
        resolvers,
      }),
      plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    });
    await server.start();

    app.use(
      '/graphql',
      cors<cors.CorsRequest>(),
      express.json(),
      expressMiddleware(server, {
        context: async ({ req }) => ({
          logger: logger,
          graphRequest: graphqlClient,
          prisma: prismaClient
        }),
      }),
    );
  };

  startApolloServer().catch((err: Error) => {
    logger.error(err.message);
  });


  return app;
};

export default buildGraphQLApp;
