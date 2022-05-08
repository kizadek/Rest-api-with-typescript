import { Request, Response, NextFunction } from 'express';
import { omit } from 'lodash';
import logger from './../utils/logger';
import { crateUser } from '../service/user.service';
import { CreateUserInput } from '../db/schema/user.schema';

//function to crate a user
export async function createUserHandler(
  req: Request<{}, {}, CreateUserInput['body']>,
  res: Response,
  next: NextFunction
) {
  try {
    const user = await crateUser(req.body); // call create user service
    const data = omit(user.toJSON(), 'password', '_id');
    return res.status(200).json({
      successes: true,
      data,
    });
  } catch (e: any) {
    logger.error(e);
    //409 conflict
    return res.status(409).json({
      successes: false,
      massage: e.massage,
    });
  }
}
