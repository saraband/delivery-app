import { createStore, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import baskets from 'STORE/Baskets';

const rootReducer = combineReducers({
  baskets
});

const persistedReducer = persistReducer({
  key: 'root',
  storage
}, rootReducer);

export let store = createStore(
  persistedReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export let persistor = persistStore(store);