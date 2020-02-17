import { combineReducers } from '@black_bird/utils';
import { applyMiddleware, createStore, Middleware } from 'redux';
import { dictionaryReducer } from '@black_bird/dictionaries';
import { composeWithDevTools } from 'redux-devtools-extension';
import { regFormReducer } from './regForm';
import { contactsFormReducer } from './contactsForm';
import { enrollReducer } from './enroll';

import transactions from './transactions';
import { IRootState } from './models';

const composeDevTools = composeWithDevTools({});

export const createCustomStore = () => (...middlewares: Array<Middleware<any>>) => () => {
	return createStore(
		combineReducers<any>({
			enroll: enrollReducer,
			regForm: regFormReducer,
			contactsForm: contactsFormReducer,
			dictionaries: dictionaryReducer,
			transactions,
		}),
		composeDevTools(applyMiddleware(...middlewares)),
	);
};
