import rootReducer from './rootReducer';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
export * from './selectors';
export * from './transactions';
export * from './registrationForm';
export * from './personForm';
export * from './contactsForm';

const store = createStore(rootReducer, applyMiddleware(thunk));

export * from './models';
export default store;
