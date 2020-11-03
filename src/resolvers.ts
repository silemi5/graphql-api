import { User } from './models/user'
import { sign } from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const JWT_SECRET: string = process.env.JWT_SECRET || ""

export const resolvers = {
  Query: {
    users: async () => {
      // TODO: Must be protected route
      return await User.find({})
    },
    user: async (_: null, id: string) => {
      // TODO: Must be protected route
      return await User.find({ id: id })
    },
    authenticateUser: async (_: null, { input }: { input: { email: string, password: string } }) => {
      const user: User = await User.find(input)

      if(!user) throw new Error("Invalid credentials!")

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
        return await User.create({
          email: input.email,
          password: input.password
        })
      } catch {
        throw new Error(`Something happened~`)
      }
    }
  }
}
