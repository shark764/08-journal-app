import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import authReducer from '@/reducers/authReducer';
import notesReducer from '@/reducers/notesReducer';
import uiReducer from '@/reducers/uiReducer';

const reducers = combineReducers({
  auth: authReducer,
  ui: uiReducer,
  notes: notesReducer,
});

const middleware = [thunkMiddleware];

// Deprecated
const store = createStore(
  reducers,
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
