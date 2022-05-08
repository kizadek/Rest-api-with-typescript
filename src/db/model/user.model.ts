import mongoose, { Schema, model, Document } from 'mongoose';
import bcript from 'bcrypt';
import config from 'config';

// typescript definition of the user schema (interface )
export interface UserDocument extends Document {
  email: string;
  name: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

//hashing user password
userSchema.pre('save', async function (next) {
  let user = this as UserDocument;
  if (!user.isModified('password')) {
    return next();
  }
  const salt = await bcript.genSalt(config.get<number>('saltWorkFactor'));
  const hash = await bcript.hashSync(user.password, salt);
  user.password = hash;
  return next();
});

// function to comp user password
userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  const user = this as UserDocument;
  return bcript.compare(candidatePassword, user.password).catch((e) => false);
};

const UserModel = model('User', userSchema);

export default UserModel;
