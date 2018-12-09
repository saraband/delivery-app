import React from 'react';
import styled, { keyframes } from 'styled-components';
import {
  Switch,
  Route
} from 'react-router-dom';

import Layout from './layouts/default';
import Routes from 'ROUTES';
import RestaurantsList from './pages/RestaurantsList';
import RouteNotFound from './pages/RouteNotFound';
import Restaurant from 'PAGES/RestaurantDetails';
import TestPage from 'PAGES/Test';

export default class App extends React.Component {
  render () {
    return(
      <Layout>
        <Switch>
          <Route exact path={Routes.HOME} component={TestPage} />
          {/*<Route exact path={Routes.HOME} component={RestaurantsList} />*/}
          <Route exact path={Routes.TEST} component={TestPage} />
          <Route exact path={Routes.RESTAURANTS_LIST} component={RestaurantsList} />
          <Route exact path={Routes.RESTAURANT_DETAILS} component={Restaurant} />
          <Route component={RouteNotFound} />
        </Switch>
      </Layout>
    );
  }
}