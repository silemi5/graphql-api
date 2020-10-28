import { User } from './models/user'

export const resolvers = {
  Query: {
    users: () => {
      return getAllUsers()
    }
  },
  Mutation: {
    createUser: (ctx)
  }
}

async function createUser(ctx) {
  // TODO: Create user
}

async function getAllUsers() {
  return await User.find({})
}
