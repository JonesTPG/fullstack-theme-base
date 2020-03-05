# Setting up a new application using Full Stack Theme Base

Follow this guide to setup a new application using the Full Stack Theme Base.

## Version Control

Set up a new repository preferably at [GitLab.com](https://gitlab.com). The DevOps pipeline is setup in GitLab so it would be convenient to also have the source control there.

## Global Variables

## Front-End

## Back-End

## Database

## Production Environment

## DevOps Pipeline

The GitLab pipeline requires some variables in order for it to work correctly. Set up the following variables at GitLab project repository -> Settings -> CI/CD > Variables:

- DOCKER_ACCESS_TOKEN: pipeline uses the token to access the remote docker repository where the newest application version will be pushed.
- JWT_SECRET: application uses this variable in jwt authentication
- MONGODB_TEST_URI: test database url. cypress tests are run using test database
- MONGODB_URI: production database url.
