# Front-End Development Setup

## Environment variables

The React App gets it's API URL via environment variables. Different env variable files are used in development and production.

### Production variables

.env.production file (that is in source control) defines the production API endpoint

### Development variables

.env.local file (not in source control) should be made by all developers that overrides the production endpoint when developing with npm start.
Example .env.local:

REACT_APP_API_URL=http://localhost:4000/
REACT_APP_WEBSOCKET_URL=ws://localhost:4000/

More information [here](https://create-react-app.dev/docs/adding-custom-environment-variables/).

The "normal" .env FILE is a "fallback" file that should not be needed in different environments.

### Running front-end with SSL (generally not needed)

Start the back-end server with command **npm run ssl**. This starts the SSL server to port 4001. Remember to change the front-end env variables accordingly!
