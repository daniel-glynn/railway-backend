import express, { type Application }  from 'express';

import buildGraphQLApp from './graphql-app'
import { logger } from './util/index';
import healthCheckRouter from './routes/health-check/health-check'

export interface ExpressConfig {
  port?: string;
}

const buildGenericExpressApp = ({ port }: ExpressConfig): Application => {
  const app = express();
  app.set('port', port);
  app.use('/', healthCheckRouter);

  return app;
};

process.on('unhandledRejection', (err: Error) => {
  logger.error(`Process received an unhandledRejection: ${err?.message}`);
});

const start = async () => {
  const port = 3007;
  const app = buildGraphQLApp(buildGenericExpressApp({ port: port.toString() }))

  // Run HTTP server
  await new Promise<void>(resolve => app.listen({ port }, resolve));
  logger.info(`Pricing API started on port ${port}`); 
};

start()
