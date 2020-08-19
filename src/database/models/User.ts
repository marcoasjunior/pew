import { UserSchema, IUserSchema } from './Schema'
import { mongoose } from '../mongoose'

export default mongoose.model<IUserSchema>("User", UserSchema)