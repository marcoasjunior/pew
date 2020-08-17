import { UserSchema, IUserSchema } from './Schema'
import { model } from 'mongoose';

export default model<IUserSchema>("User", UserSchema)