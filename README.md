# Hotbox demo app

This demo app simulates a food delivery website.

## How to try it out

This app can be live tested here (link WIP).
If you want to run it locally, make sure first to have Postgres running a postgres database running.
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

Once you've properly configured config.json, run the following to set up the project:

```
yarn install                    # Install dependencies
yarn setup                      # Run several scripts in order to setup the app
                                # Those scripts are described below

# What `yarn setup` does:

sequelize db:migrate            # Migrate DB schemas
sequelize db:seed:all           # Populate the DB with fake data

yarn generate-images            # Generates static images of different resolutions (Can take some time)
yarn update-thumbnails          # Generate base 64 thumbnails from the images previously generated
                                # and updates the DB
```

You may now launch the project:

```
yarn server                     # Launch the server app on port 3000
yarn dev                        # Launch the client app on port 8080
```

## Folder structure

* [src/browser/](./src/browser/) Client app
    * [components/](./src/browser/components/) Components used throughout the app
    * [constants/](./src/browser/constants/) Constants (Colors, styles, etc)
    * [helpers/](./src/browser/helpers/) Various helpers
    * [hocs/](./src/browser/hocs/) HOCS adding general purpose utilities (Loaders, dropdowns, etc)
    * [icons/](./src/browser/icons/) SVG icons as components **(TODO: MAYBE REMOVE THIS ?)**
    * [layouts/](./src/browser/layouts/) Page layouts
    * [misc/](./src/browser/misc/) Everything that doesn't fit in neither of these folders
    * [pages/](./src/browser/pages/) Different pages of the client app
    * [routes/](./src/browser/routes/) Route paths and related helpers
    * [store/](./src/browser/store/) Redux store, reducers and actions

* [src/server/](./src/server/) Server app
    * [data/](./src/server/data/) Miscellaneous data
    * [models/](./src/server/models/) Sequelize models
    * [seeders/](./src/server/seeders/) Sequelize data seeds
    * [migrations/](./src/server/migrations/) Sequelize migrations
    * [schemas/](./src/server/schemas/) GraphQL schemas

* [src/utils/](./src/utils/) Utilities, constants and helpers used in the client AND the server.

* [src/loaders/](./src/loaders/) Custom webpack loaders (Inlining SVG)

* [assets/](./assets/) Assets (images mainly)

* [scripts/](./scripts/) Setup scripts

* [templates/](./src/templates/) HTML template for HTMLWebpackPlugin

## This project is using
#### Client-side
* [React](https://reactjs.org/) Client-side interface
* [React Router DOM](https://www.npmjs.com/package/react-router-dom) Routing
* [Redux](https://redux.js.org/) Managing global state
* [Styled Components](https://www.styled-components.com/) Styling React components
* [Apollo](https://github.com/apollographql) Interacting with GraphQL API client-side
* [makeCancelable](https://www.npmjs.com/package/makecancelable) Cancelable promises
* [Webpack](https://webpack.js.org/) Bundling up everything
* [Babel](https://babeljs.io/) Transpiling shit cause that's what cool kids do

#### Server-side

* [GraphQL](https://graphql.org/) GraphQL API
* [NodeJS](https://nodejs.org/en/) Well, NodeJS
* [Express](https://expressjs.com/) NodeJS HTTP server
* [Sequelize](http://docs.sequelizejs.com/) ORM
* [PostgreSQL](https://www.postgresql.org/) Database
* [Lodash](https://lodash.com/) Provides cool utilities
* [Chalk](https://github.com/chalk/chalk) Pretty colors in the console
* [Faker](https://github.com/marak/Faker.js/) Fake data generation
* [Sharp](https://github.com/lovell/sharp) NodeJS image processing (Dat boi is hella fast)

## Credits

* WIP: logo licenses
