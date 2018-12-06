import { createStore, combineReducers } from 'redux';
import baskets from 'STORE/Baskets';

const rootReducer = combineReducers({
  baskets
});

export default createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);