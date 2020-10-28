import { GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList,
  GraphQLID
} from 'graphql';

import { UserType } from './type-definition'

export const RootQueryType = new GraphQLObjectType({ 
  name: '',
  description: '',
  fields: () => ({
    users: {
      type: new GraphQLList(UserType),
      description: 'List of all users',
      resolve: (ctx) =>  getAllUsers
    }
  })
})

async function getAllUsers(ctx) {
  
}
