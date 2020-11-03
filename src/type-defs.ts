import { gql } from 'apollo-server'

export const typeDefs = gql`
  type User {
    id: ID!
    email: String!
    name: String
  }

  type Token {
    token: String!
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
    email: String
    password: String
  }

  type Mutation {
    createUser(input: CreateUserInput!): User!
    updateProfile(input: UpdateProfileInput!): User!
  }

  type Query {
    users: [User!]!
    authenticateUser(input: AuthenticateUserInput!): Token!
    user(id: ID!): User
  }
`
