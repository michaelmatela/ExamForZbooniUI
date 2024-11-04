import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import authReducer from './authReducer';

const rootReducer = combineReducers({
  auth: authReducer,
});

const store = createStore(rootReducer);

export type RootState = ReturnType<typeof rootReducer>;

export default store;