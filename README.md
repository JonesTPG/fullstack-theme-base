# Production environment information

## Database

Full Stack Theme Base uses [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) as its database service.
The application connects to the database via Node.js environment variables. The production environment runs the Node.js
application with environment variables defined in the **GitLab CI/CD pipeline variables**. In case the database address
changes, it must be updated in the GitLab.com UI.

## Web Server Configuration

The application runs inside an AWS EC2 instance.
