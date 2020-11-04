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

const credentials: { email: string, password: string } = {  email: "example@example.com", password: "password1" }
let response: {
  "data": {
    "data": {
      "updateProfile": {
        "id": string;
        "name": string;
        "email": string;
      }
    }
  }
}
let token: string
let updatedInfo: { name: string; password: string }

Given('I\'m already logged-in', async function () {
  const query = `
    query authenticateUser($input: AuthenticateUserInput!) {
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

When("I try to update my name and or password to {string} and {string} respectively", async function (string, string2) {
  updatedInfo = { name: string, password: string2 }
  
  const query = `
    mutation updateProfile($input: UpdateProfileInput!){
      updateProfile(input: $input) {
        id,
        name,
        email
      }
    }
  `

  response = await instance.post('graphql', {
    query: query,
    variables: { "input": updatedInfo }
  }, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })

  if(!response) throw new Error("Something happened!")
});

Then('I should get my updated name, along with ID and email', async function () {
  const res = response.data.data.updateProfile

  expect(res).to.have.all.keys('id', 'email', 'name');
  expect(res).to.deep.equal({
    "id": res.id,
    "email": credentials.email,
    "name": updatedInfo.name
  })
});
