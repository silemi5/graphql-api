import { User } from './models/user'

export const resolvers = {
  Query: {
    users: async () => {
      // TODO: Must be protected route
      return await User.find({})
    }
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
