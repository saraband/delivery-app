import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from "apollo-boost"
import { ApolloProvider } from 'react-apollo'
import { BrowserRouter } from 'react-router-dom';
import { Provider as StoreProvider } from 'react-redux';
import store from 'STORE/index';
import App from './App';

const apolloClient = new ApolloClient({
  uri: 'http://localhost:3000/graphql'
});

const render = (App) => {
  ReactDOM.render(
    <ApolloProvider client={apolloClient}>
      <StoreProvider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </StoreProvider>
    </ApolloProvider>,
    document.getElementById('root')
  );
}

render(App);

if (module.hot) {
  module.hot.accept('./App', () => {
    render(require('./App'));
    console.log('App updated successfully.');
  });
}