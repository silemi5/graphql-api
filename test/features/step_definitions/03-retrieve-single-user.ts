import { Given, When, Then } from 'cucumber'
import axios from 'axios'
import chai from "chai";
import User from '../../../src/models/user'
import mongoose from 'mongoose'
import { sign, verify } from 'jsonwebtoken'
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

let ID_TO_SEARCH: string

const credentials: { email: string, password: string } = {  email: "example@example.com", password: "password1" }
let response: {
  "data": {
    "data": {
      "user": {
        "id": string; 
        "name": string; 
        "email": string
      }
    }
  }
  
}
let token: string

Given('I\'m already logged-in with an account', async function () {
  const query = `
    query authenticateUser($input: AuthenticateUserInput!)
    {
      authenticateUser(input: $input) {
        token
      }
    }
  `
  const tokenResponse: { 
    "data": {
      "data": {
        "authenticateUser": {
          "token": string 
        }
      }
    } 
  } = await instance.post('graphql', {
    query: query,
    variables: { "input": credentials }
  })

  if(!tokenResponse) throw new Error("Something happened!")

  token = tokenResponse.data.data.authenticateUser.token
});

When('I try to get a single user', async function () {
  const userExample = await User.create({ email: "abc@example.com", password: "passpass"})

  ID_TO_SEARCH = userExample._id.toString()

  const query = `
    query user($id: ID!) {
      user(id: $id) {
        id,
        name
        email
      }
    }
  `

  response = await instance.post('graphql', {
      query: query,
      variables: { "id": ID_TO_SEARCH }
    }, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
  })
  
  if(!response) throw new Error("User not found!")

});

Then('I should get its ID, email, and name', async function () {
  const res: { 'id': string; 'email': string; 'name': string } = response.data.data.user
  expect(res).to.have.all.keys('id', 'email', 'name');
  expect(res).to.include({
    "id": ID_TO_SEARCH,
  })
});
