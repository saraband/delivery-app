# delivery-app

This is a demo app.

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
