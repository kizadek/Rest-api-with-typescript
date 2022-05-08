import { Express, Request, Response } from 'express';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import { createUserHandler } from './controllers/user.controller';
import validateRequest from './middleware/validateRequest';
import { createUserSchema } from './db/schema/user.schema';
import config from 'config';

const routes = (app: Express) => {
  app.get('/healthcheck', (req: Request, res: Response) =>
    res.status(StatusCodes.OK).json({
      success: true,
      massage: `server is running healthy on Port:: ${config.get<number>(
        'port'
      )}😊 `,
    })
  );

  app.post('/api/users', validateRequest(createUserSchema), createUserHandler);
};

export default routes;
