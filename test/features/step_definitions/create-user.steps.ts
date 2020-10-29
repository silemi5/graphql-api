import { Before, Given, When, Then } from 'cucumber'
import { User } from '../../../src/models/user'
import { server } from '../../../src/server'
import axios from 'axios'
import dotenv from 'dotenv'
import { assert } from 'console'

dotenv.config();

let email: string
let password: string
let response
const uri = 'http://localhost:4000'
const JWT_SECRET: string = process.env.JWT_SECRET || ""


Given('I entered {string} as my email and {string} as my password', async function (string: string, string2: string) {
  email = string;
  password = string2;
})


When('we try to create a new user', async function() {
  const query = `mutation: createUser(input: { email: $email, password: $password}) { name email }`

  response = await axios.post(uri, JSON.stringify({
    "query": query,
    "variables": { "email": email, "password": password}
  }))
  
  // throw new Error('Not implemented')
})

Then('we should receive', function () {
  throw new Error('Not implemented')
})
