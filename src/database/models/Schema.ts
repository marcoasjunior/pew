import { Document, Types, Schema} from 'mongoose'

export interface IUserSchema extends Document {
    username: string;
    email: string;
    password: string;
    gender: Gender;
    follow: Types.Array<string>;
}

enum Gender {
    MALE = 'Male',
    FEMALE = 'Female'
}

export const UserSchema = new Schema({

    username: {
        type: String,
        unique: true,
        required: true,
        lowercase: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: Number,
        enum: Object.values(Gender),
        required: true
    },
    follow: [{
        type: Types.ObjectId,
        ref: 'User'
    }],
})