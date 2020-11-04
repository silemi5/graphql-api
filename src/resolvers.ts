import UserModel, { UserDocument } from './models/user'
import { sign, verify } from 'jsonwebtoken'
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
    user: async (_: null, id: { id: string } ) => {
      // TODO: Must be protected route
      return await UserModel.findById(id.id)
    },
    authenticateUser: async (_: null, { input }: { input: { email: string, password: string } }) => {
      const user: any = await UserModel.findOne(input)

      if(!user) throw new Error("Invalid credentials!")

      return {
        token: sign({
          id: user._id,
          name: user.name || null,
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
    },
    updateProfile: async(_: null, { input }: { input: {name: string; password: string } }, context: { 'auth': string }) => {
      const decodedPayload: any = await checkAuthentication(context)

      if(!decodedPayload) throw new Error('User not logged in!')

      const user = await UserModel.findById(decodedPayload.id).select('password')

      if(user) {
        user.name = input.name || user.name 
        user.password = input.password || user.password
        user.save()

        return {
          id: user.id,
          email: user.email,
          name: user.name
        }
      }
      else {
        throw new Error("User not found!")
      }
    }
  }
}

async function checkAuthentication(ctx: { 'auth': string }) {
  const token = ctx.auth.split("Bearer ")[1]
  return verify(token, JWT_SECRET)
}
