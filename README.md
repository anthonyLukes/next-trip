# Metro Transit - Next Trip

## Overview

The project utilizes the [Metro Transit Web Services](https://svc.metrotransit.org/nextrip). The application will display a list of stops for any of its given routes chosen in the order that that was chosen (Southbound/Northbound or Eastbound/Westbound).

## Technical Requirements

This project runs in node 16.0.0 or higher. The project includes a `yarn.lock` file since it was developed using Yarn as the package manager, but it should also build and run using npm. There's an `.nvmrc` included in the project to easily include the correct version of node for users that have [NVM](https://github.com/nvm-sh/nvm) installed on their system.

## Project Assumptions

- URL routing tracks changes to route and direction form controls. If URLs are changed manually the application will attempt to load the correct route and direction. If either are invalid the user controls value(s) will be reset without showing the user an error.
- Project runs in the latest version of Chrome, Firefox, and Safari. No testing has been done in Internet Explorer or Edge.
- Assumed that it is okay to display one error from the API at a time. If multiple errors are happening at a time, just one will show until errors are no longer present.

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
