import React, { Suspense, lazy } from 'react';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import Layout from 'LAYOUTS/Default';
import Routes from 'ROUTES';
import Loader from 'COMPONENTS/Loader';

const RestaurantsList = lazy(() => import(/* webpackChunkName: 'restaurants-list' */ 'PAGES/RestaurantsList/index'));
const RouteNotFound = lazy(() => import(/* webpackChunkName: 'route-404' */ 'PAGES/RouteNotFound'));
const RestaurantDetails = lazy(() => import(/* webpackChunkName: 'restaurants-details' */ 'PAGES/RestaurantDetails/index'));
const RestaurantCheckout = lazy(() => import(/* webpackChunkName: 'restaurants-checkout' */ 'PAGES/RestaurantCheckout/index'));
const TestPage = lazy(() => import(/* webpackChunkName: 'route-test' */ 'PAGES/Test'));


export default class App extends React.Component {
  render () {
    // Use responsive layout when displaying the RestaurantsList page,
    // use fixed layout otherwise
    const route = document.location.pathname;
    const fixedLayout = route !== Routes.HOME &&
      route !== Routes.ROOT &&
      route.substring(0, 5) !== '/list';

    return (
      <Layout fixedWidth={fixedLayout}>
        <Suspense fallback={<Loader size={100}/>}>
          <Switch>
            <Route exact path={Routes.TEST} component={TestPage} />
            <Route exact path={Routes.ROOT} component={RestaurantsList} />
            <Route exact path={Routes.HOME} component={RestaurantsList} />
            <Route exact path={Routes.RESTAURANTS_LIST} component={RestaurantsList} />
            <Route exact path={Routes.RESTAURANT_DETAILS} component={RestaurantDetails} />
            <Route exact path={Routes.RESTAURANT_CHECKOUT} component={RestaurantCheckout} />
            <Route component={RouteNotFound} />
          </Switch>
        </Suspense>
      </Layout>
    );
  }
}
