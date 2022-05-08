import { Express, Request, Response } from 'express';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import { createUserHandler } from './controllers/user.controller';
import validateRequest from './middleware/validateRequest';
import { createUserSchema } from './db/schema/user.schema';

const routes = (app: Express) => {
  app.get('/healthcheck', (req: Request, res: Response) =>
    res.sendStatus(StatusCodes.OK)
  );

  app.post(
    '/api/users',
    [validateRequest(createUserSchema)],
    createUserHandler
  );
};

export default routes;
