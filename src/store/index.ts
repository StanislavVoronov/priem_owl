import rootReducer from './rootReducer';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
export * from './selectors';
export * from './transactions';
export * from './enrollRegForm';

const store = createStore(rootReducer, applyMiddleware(thunk));

export * from './models';
export default store;
