import { Request, Response, Router } from 'express';

const healthCheckRouter = Router();

healthCheckRouter.get('/api/health_check', (_req: Request, res: Response) => {
  res.json('railway API is healthy <3');
});

export default healthCheckRouter;