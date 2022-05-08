import { Request, Response, NextFunction } from 'express';
import logger from './../utils/logger';
import { crateUser } from '../service/user.service';

//function to crate a user
export async function createUserHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const user = await crateUser(req.body);
    return user; // call create user service
  } catch (e: any) {
    logger.error(e);
    //409 conflict
    return res.status(409).json({
      successes: false,
      massage: e.massage,
    });
  }
}
