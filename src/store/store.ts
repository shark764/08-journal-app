import { combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import authReducer from '@/reducers/authReducer';

const reducers = combineReducers({
  auth: authReducer,
});

// Deprecated
const store = createStore(
  reducers,
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  composeWithDevTools()
);

export default store;
