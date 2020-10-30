import { Given, When, Then } from 'cucumber'
import axios from 'axios'
import chai from "chai";

const expect = chai.expect;


const uri = 'http://localhost:4000'
const input: { email: string; password: string; name?: string } = { email: '', password: ''}
let res: { _id: string; email: string; password: string; name?: string }

const instance = axios.create({
  baseURL: uri,
  headers: {
    'Content-Type': 'application/json'
  }
})


Given('I entered {string} as my email and {string} as my password', async function (string: string, string2: string) {
  input.email = string
  input.password = string2;
})


When('we try to create a new user', async function() {
  const query = `
    mutation createUser($input: CreateUserInput!) {
      createUser(input: $input) {
        id
        name
        email
      }
    }
  `
  const response = await instance.post('/graphql', {
    query: query,
    variables: { "input": input }
  })

  if(!response) throw new Error("Something happened!")

  res = response.data.data.createUser
})

Then('we should have given an ID, email, and name', async function () {
  expect(res).to.have.all.keys('id', 'email', 'name');
})

Then('email should match with what has given at the start', async function () {
  expect(res).to.include({ "email": input.email, "name": null });
});
