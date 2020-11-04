import { Given, When, Then } from 'cucumber'
import axios from 'axios'
import chai from "chai";
import User from '../../../src/models/user'
import mongoose from 'mongoose'
import { verify } from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config();
const expect = chai.expect;
const DB_URI: string = process.env.CONNECTION_URI || ""
const JWT_SECRET: string = process.env.JWT_SECRET || ""
mongoose.connect(DB_URI)

const uri = 'http://localhost:4000'

const instance = axios.create({
  baseURL: uri,
  headers: {
    'Content-Type': 'application/json'
  }
})

let credentials: { email: string, password: string }
let createdUser
let response: { 
  "data": {
    "data": {
      "authenticateUser": {
        "token": string 
      }
    }
  } 
}

Given('I already have an account with {string} as my email and {string} as my password', async function (string, string2) {
  credentials = { email: string, password: string2 }
  createdUser = await User.findOne({ email: string })

  if(!createdUser) throw new Error("Something happened!")
});

When('I try to login using the abovementioned credentials', async function () {
  const query = `
    query authenticateUser($input: AuthenticateUserInput!)
    {
      authenticateUser(input: $input) {
        token
      }
    }
  `

  response = await instance.post('graphql', {
    query: query,
    variables: { "input": credentials }
  })

  if(!response) throw new Error("Something happened!")
});

Then('I should receive a token, with my id, name, and email as the payload', async function () {
  const res: { 'token': string } = response.data.data.authenticateUser
  expect(res).to.have.all.keys('token');
  expect(verify(res.token, JWT_SECRET)).have.all.keys('id', 'email', 'name', 'iat');
});
