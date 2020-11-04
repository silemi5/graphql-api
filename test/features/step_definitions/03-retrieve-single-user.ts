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

const ID_TO_SEARCH = "abcdefghijklmnopqrstuvwxyz"

const credentials: { email: string, password: string } = {  email: "example@example.com", password: "password1" }
let response: { _id: string; name: string; email: string}
let token: string

Given('I\'m already logged-in with an account', async function () {
  const query = `
    mutation authenticateUser($input: AuthenticateUserInput) {
      authenticateUser(input: $input) {
        token
      }
    }
  `
  const tokenResponse: { "token": string } = await instance.post('graphql', {
    query: query,
    variables: { "input": credentials }
  })

  if(!tokenResponse) throw new Error("Something happened!")

  token = tokenResponse.token
});

When('I try to get a single user', async function () {
  await User.create({ _id: ID_TO_SEARCH, email: "abc@example.com"})

  const query = `
    user($id: string) {
      id,
      name,
      email
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


});

Then('I should get its ID, email, and name', async function () {
  expect(response).to.have.all.keys('id', 'email', 'name');
  expect(response).to.include({
    id: ID_TO_SEARCH,
  })
});
