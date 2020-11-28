# firebase-express-react-app

## Approach

- I'm using `yarn workspaces` to manage both apps (backend and frontend) in a single repository.
- `Express` for the API layer
- `create-react-app` for bootstrapping the react project.
- `ESLint`, `Prettier` with `husky` to enforce code styles and standards.

### API

- Developed on `Nodejs v12.18.3 | NPM v6.14.6`. No transpilation done.

### React Frontend

- I prefer to use `TailwindCSS` with React alongside `styled-components`. But, given this is a small application, using `TailwindCSS` is an overkill. So, decided to go with`styled-components` only.
- Using `formik` for form hadnling related stuff with custom input components.
- I'm using `redux` (along with `@reduxjs/toolkit`) for state management even though it's kind of overkill for this case.

## Getting Started

```
git clone git@github.com:thinkholic/firebase-express-react-app.git
cd firebase-express-react-app.git
yarn
```

### `.env` file

You can find a file named `.env.example` in both `app/` and `server/` directory. You'll need to update correct firebase configurations before start the application.

Once done, a simple `yarn start` will start both backend and frontend apps seperately.
