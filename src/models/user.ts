import mongoose, { Document } from 'mongoose';

export type UserDocument = {
  _id: string;
  name?: string;
  email: string;
  password?: string;
}

const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    select: true
  },
  password: {
    type: String,
    select: false
  },
})

export default mongoose.model<Document & UserDocument>('User', userSchema)



