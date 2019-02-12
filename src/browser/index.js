import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter } from 'react-router-dom';
import { Provider as StoreProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from 'STORE/index';
import App from './App';

const apolloClient = new ApolloClient({
  uri: `${APP_BASE_URL}/graphql`
});

const render = (App) => {
  ReactDOM.render(
    <ApolloProvider client={apolloClient}>
      <StoreProvider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </PersistGate>
      </StoreProvider>
    </ApolloProvider>,
    document.getElementById('root')
  );
};

render(App);

if (module.hot) {
  module.hot.accept('./App', () => {
    render(require('./App'));
    console.log('App updated successfully.');
  });
}
