import express from 'express'
import { graphqlHTTP } from 'express-graphql'
import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull
} from 'graphql'
import mongoose from 'mongoose'

export const app = express();

app.listen(5000., () => console.log('Server running!'))
