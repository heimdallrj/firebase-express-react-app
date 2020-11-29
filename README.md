# firebase-express-react-app

## Approach

- Here, I'm using `yarn` over `npm` as `yarn workspaces` support for managing multiple applications in a single repository.
- Used `ESLint`, `Prettier` with `husky` to enforce code styles and standards.
- Used `postman` for testing the api

### API - backend

- Used `Express` for the API layer
- Developed on `Nodejs v12.18.3 | NPM v6.14.6`. No transpilation has been done.
- You can find the backend codebase in `server/*`
- Before start, you'll have to update `server/src/firebase/serviceAccountKey.json` with firebase service account credentials. (I have removed it from the repository for security reasons)
- Used `mocha`, `chai` and `supertest` for test setup

### React Frontend

- Used `create-react-app` for bootstrapping the react application.
- You can find the frontend codebase in `app/*`
- Before start, you'll have to update `app/.env` with firebase credentials. (I have removed it from the repository for security reasons)
- I prefer to use `TailwindCSS` alongside `styled-components`. But, given the scope of this application, using `TailwindCSS` is an overkill. So, just going with`styled-components` only.
- Used`formik` for handling form related stuff.
- Also, `redux` (along with `@reduxjs/toolkit`) for state management even though it's kind of too much for this case.
- Configured test setup with `enzyme`.
- TODO: Write e2e tests with cypress
- TODO: Storybook setup

## Getting Started

First, clone the repository as follows;

```
git clone git@github.com:thinkholic/firebase-express-react-app.git
```

You don't need to run both apps separately. Just a simple `yarn start` from the root directory would be sufficient. But, you'll need to install dependencies first.

Run `yarn` from the root directory.

```
cd firebase-express-react-app
yarn
```

### Update `firebase` credentials first

You'll have to update relevant firebase credentials in both backend and frontend.

Update `server/src/firebase/serviceAccountKey.json` with provided google service account credentials.

Update `app/.env` with provided firebase credentials.

### Run application with `yarn start`

Once everything ready, running `yarn start` (from the root directory) would start both backend and frontend apps together, separately.

Frontend on http://localhost:3000

Backend on http://localhost:3001/api

Cheers!.
