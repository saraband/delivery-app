import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Layout from './layouts/default';
import Routes from 'ROUTES';
import Loader from 'COMPONENTS/Loader';

const RestaurantsList = React.lazy(() => import(/* webpackChunkName: 'restaurants-list' */ 'PAGES/RestaurantsList/index'));
const RouteNotFound = React.lazy(() => import(/* webpackChunkName: 'route-404' */ 'PAGES/RouteNotFound'));
const Restaurant = React.lazy(() => import(/* webpackChunkName: 'restaurants-details' */ 'PAGES/RestaurantDetails/index'));
const TestPage = React.lazy(() => import(/* webpackChunkName: 'route-test' */ 'PAGES/Test'));

export default class App extends React.Component {
  render () {
    return (
      <Layout>
        <React.Suspense fallback={<Loader size={100}/>}>
          <Switch>
            <Route exact path={Routes.HOME} component={TestPage} />
            {/*<Route exact path={Routes.HOME} component={RestaurantsList} />*/}
            <Route exact path={Routes.TEST} component={TestPage} />
            <Route exact path={Routes.RESTAURANTS_LIST} component={RestaurantsList} />
            <Route exact path={Routes.RESTAURANT_DETAILS} component={Restaurant} />
            <Route component={RouteNotFound} />
          </Switch>
        </React.Suspense>
      </Layout>
    );
  }
}
