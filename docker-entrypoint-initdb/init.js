db.createUser({
  user: "silemi5",
  pwd: "ocisly",
  roles: [
    {
      role: "readWrite",
      db: "graphql-api-db"
    }
  ]
})

db.createCollection("users");
