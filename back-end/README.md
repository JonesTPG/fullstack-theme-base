# Full-Stack Theme Base GraphQL Server

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
