# Full-Stack Theme Base GraphQL Server

## Creating a new GraphQL Model and its Operations

1. Create the new model in the models folder

2. Create a matching GraphQL type and the needed queries, mutations and resolvers in typeDefs.js

3. Create the resolver functions in resolvers.js

## Running E2E tests with Cypress

1. Start the node server in test mode: **npm run test**

Available additional queries in test mode:

### deletes all users

```
mutation {
    deleteUsers
}
```

### creates new admin user

```
mutation {
    createAdminUser(username: "admin")
    {
        username
        roles
    }
}

returns an object like this:

{
  "data": {
    "createAdminUser": {
      "username": "admin",
      "roles": [
        "ADMIN"
      ]
    }
  }
}
```
