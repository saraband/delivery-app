# delivery-app

This is a demo app.

## How to try it out

This app can be tested here (link WIP).
If you want to try it locally, make sure to have Postgres running.
Tweak the file src/server/config.json to fit your localhost database credentials:

```json
{
  "development": {
    "username": "YOUR_USERNAME_HERE",
    "password": "YOUR_PASSWORD_HERE",
    "database": "YOUR_DB_NAME_HERE",
    "host": "127.0.0.1",
    "port": 5432,
    "dialect": "postgres"
  }
}
```

Once you've properly configured config.json, run the following:

```
yarn install                    # Install dependencies
sequelize db:migrate            # Migrate DB schemas
sequelize db:seed:all           # Populate the DB (This can take some time)


yarn server                     # Launch the server app on port 4000
yarn webpack                    # Launch the client app on port 8080
```

## Folder structure

* [src/server/](./src/server/) Server app
    * [data/](./src/server/data/) Miscellaneous data
    * [models/](./src/server/models/) Sequelize models
    * [seeders/](./src/server/seeders/) Sequelize data seeds
    * [migrations/](./src/server/migrations/) Sequelize migrations

* [src/browser/](./src/browser/) Client app
    * [components/](./src/browser/components/) Components used throughout the app
    * [constants/](./src/browser/constants/) Constants (Colors, Styles, ...)
    * [hocs/](./src/browser/hocs/) HOCS adding general purpose functionnalities (Loaders, dropdowns, ...)
    * [icons/](./src/browser/icons/) SVG icons as components
    * [layouts/](./src/browser/layouts/) Main layouts
    * [misc/](./src/browser/misc/) Miscellaneous (CSS animations, helpers, generic styled-components)
    * [pages/](./src/browser/pages/) Different pages of the client app
    * [routes/](./src/browser/routes/) Routes path and helpers
    * [store/](./src/browser/store/) Redux store reducers and actions

## This project is using
#### Client-side
* [React](https://reactjs.org/) Client-side interface
* [React Router DOM](https://www.npmjs.com/package/react-router-dom) Routing
* [Redux](https://redux.js.org/) Managing global state
* [Styled Components](https://www.styled-components.com/) Styling React components
* [Apollo](https://github.com/apollographql) Interacting with GraphQL API client-side
* [Webpack](https://webpack.js.org/) Bundling up everything
* [Babel](https://babeljs.io/) Transpiling shit cause that's what cool kids do

#### Server-side

* [GraphQL](https://graphql.org/) GraphQL API
* [NodeJS](https://nodejs.org/en/) Well, NodeJS
* [Express](https://expressjs.com/) NodeJS server
* [Morgan](https://github.com/expressjs/morgan) Logging middleware for Express
* [Sequelize](http://docs.sequelizejs.com/) ORM
* [PostgreSQL](https://www.postgresql.org/) Database
* [Lodash](https://lodash.com/) Provides cool utilities
* [Chalk](https://github.com/chalk/chalk) Pretty colors in the console (Absolutely mandatory)
