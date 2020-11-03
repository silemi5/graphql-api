import UserModel, { UserDocument } from './models/user'
import { sign } from 'jsonwebtoken'
import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config()

const JWT_SECRET: string = process.env.JWT_SECRET || ""
const DB_URI: string = process.env.CONNECTION_URI || ""

mongoose.connect(DB_URI)

export const resolvers = {
  Query: {
    users: async () => {
      // TODO: Must be protected route
      return await UserModel.find({})
    },
    user: async (_: null, id: string) => {
      // TODO: Must be protected route
      return await UserModel.find({ id: id })
    },
    authenticateUser: async (_: null, { input }: { input: { email: string, password: string } }) => {
      const user: any = await UserModel.find(input)

      if(!user || user === []) throw new Error("Invalid credentials!")

      return {
        token: sign({
          id: user._id,
          name: user.name,
          email: user.email
        }, JWT_SECRET)
      }

    },

  },
  Mutation: {
    createUser: async (_: null, { input }: { input: { email: string; password: string; } }) => {
      try {
        return await UserModel.create(input)
      } catch {
        throw new Error(`Something happened~`)
      }
    }
  }
}
