# firebase-express-react-app

## Approach

- I am using `yarn workspaces` to manage both apps (backend and frontend) in a single repository.
- `Express` for the API layer
- `create-react-app` for bootstrapping the react project.
- `ESLint`, `Prettier` with `husky` to enforce code styles and standards.

### API

- Developed on `Nodejs v12.18.3 | NPM v6.14.6`. No transpilation done.

### React Frontend

- I prefer to use `TailwindCSS` with React alongside `styled-components`. But, given this is a small application, using `TailwindCSS` is an overkill. So, decided to go with`styled-components` only.
