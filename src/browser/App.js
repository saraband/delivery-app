import React from 'react';
import styled, { keyframes } from 'styled-components';
import {
  Switch,
  Route
} from 'react-router-dom';

import Layout from './layouts/default';
import Routes from './constants/Routes';
import RestaurantsList from './pages/RestaurantsList';
import RouteNotFound from './pages/RouteNotFound';

export default class App extends React.Component {
  render () {
    return(
      <Layout>
        <Switch>
          <Route exact path={Routes.RESTAURANTS_LIST} component={RestaurantsList} />
          <Route component={RouteNotFound} />
        </Switch>
      </Layout>
    );
  }
}