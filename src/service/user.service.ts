import { DocumentDefinition } from 'mongoose';
import looger from './../utils/logger';
import UserModel, { UserDocument } from '../db/model/user.model';

export async function crateUser(input: DocumentDefinition<UserDocument>) {
  try {
    return await UserModel.create(input);
  } catch (e: any) {
    throw new Error(e);
  }
}
