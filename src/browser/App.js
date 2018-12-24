import React, { Suspense, lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import Layout from 'LAYOUTS/Default';
import Routes from 'ROUTES';
import Loader from 'COMPONENTS/Loader';

const RestaurantsList = lazy(() => import(/* webpackChunkName: 'restaurants-list' */ 'PAGES/RestaurantsList/index'));
const RouteNotFound = lazy(() => import(/* webpackChunkName: 'route-404' */ 'PAGES/RouteNotFound'));
const Restaurant = lazy(() => import(/* webpackChunkName: 'restaurants-details' */ 'PAGES/RestaurantDetails/index'));
const TestPage = lazy(() => import(/* webpackChunkName: 'route-test' */ 'PAGES/Test'));
const Home = lazy(() => import(/* webpackChunkName: 'home' */ 'PAGES/Home'));


export default class App extends React.Component {
  render () {
    if (document.location.pathname === Routes.HOME) {
      return (
        <Suspense fallback={<Loader size={100}/>}>
          <Home />
        </Suspense>
      );
    }

    return (
      <Layout>
        <Suspense fallback={<Loader size={100}/>}>
          <Switch>
            <Route exact path={Routes.HOME} component={Home} />
            <Route exact path={Routes.TEST} component={TestPage} />
            <Route exact path={Routes.RESTAURANTS_LIST} component={RestaurantsList} />
            <Route exact path={Routes.RESTAURANT_DETAILS} component={Restaurant} />
            <Route component={RouteNotFound} />
          </Switch>
        </Suspense>
      </Layout>
    );
  }
}
