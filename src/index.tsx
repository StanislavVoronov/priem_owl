import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { userReducer } from '@mgutm-fcu/auth';
import { dictionaryReducer } from '@mgutm-fcu/dictionary';
import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';

import App from './App';

const state = combineReducers({
	user: userReducer as any,
	dictionaries: dictionaryReducer as any,
});

const store = createStore(state);

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root') as HTMLElement,
);
