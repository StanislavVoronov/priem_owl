import reducers from './reducers';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
const store = createStore(reducers, applyMiddleware(thunk));

export * from './models';
export default store;
