# Metro Transit - Next Trip

## Overview

The project utilizes the [Metro Transit Web Services](https://svc.metrotransit.org/nextrip). The application will show a list of stops for any of its given routes.

## Project Assumptions

- URL routing tracks changes to route and direction form controls. If URLs are changed manually the application will attempt to load the correct route and direction. If either are invalid the user controls value(s) will be reset without showing the user an error.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!
