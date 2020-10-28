import { GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLID
} from 'graphql';

export const UserType = new GraphQLObjectType({
  name: 'User',
  description: 'This represents a user',
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLID) },
    email: { type: GraphQLNonNull(GraphQLString) },
    name: { type: GraphQLString },
    password: { type: GraphQLNonNull(GraphQLString) },
  })
})

export const CreateUserInput = new GraphQLObjectType({
  name: '',
  description: '',
  fields: () => ({
    email: { type: GraphQLNonNull(GraphQLString) },
    password: { type: GraphQLNonNull(GraphQLString) },
    name: { type: GraphQLString },
  })
})

export const UpdateProfileInput = new GraphQLObjectType({
  name: '',
  description: '',
  fields: () => ({
    name: { type: GraphQLString },
    password: { type: GraphQLString },
  })
})

