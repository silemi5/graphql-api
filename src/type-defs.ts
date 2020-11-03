import { gql } from 'apollo-server'

export const typeDefs = gql`
  type User {
    id: ID!
    email: String!
    name: String
  }

  input CreateUserInput {
    email: String!
    password: String!
    name: String
  }

  input UpdateProfileInput {
    name: String
    password: String
  }

  input AuthenticateUserInput {
    name: String
    password: String
  }

  type Mutation {
    createUser(input: CreateUserInput!): User!
    updateProfile(input: UpdateProfileInput!): User!
  }

  type Query {
    users: [User!]!
    # user(id: ID!): User!
  }
`
