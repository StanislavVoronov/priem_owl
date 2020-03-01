import { combineReducers } from '@black_bird/utils';
import { applyMiddleware, createStore, Middleware } from 'redux';
import { dictionaryReducer } from '@black_bird/dictionaries';
import { composeWithDevTools } from 'redux-devtools-extension';
import { enrollReducer } from './enroll';
import { regFormReducer } from './regForm';
import { personFormReducer } from './personForm';
import { contactsFormReducer } from './contactsForm';
import { applicationsFormReducer } from './applicationsForm';
import { educationFormReducer } from './educationForm';
import transactionsReducer from './transactionReducer';

import { IRootState } from './models';
const composeDevTools = composeWithDevTools({});

export const createCustomStore = () => (...middlewares: Array<Middleware<any>>) => () => {
	return createStore(
		combineReducers<any>({
			enroll: enrollReducer,
			regForm: regFormReducer,
			personForm: personFormReducer,
			contactsForm: contactsFormReducer,
			educationForm: educationFormReducer,
			applicationsFrom: applicationsFormReducer,
			dictionaries: dictionaryReducer,
			transactions: transactionsReducer,
		}),
		composeDevTools(applyMiddleware(...middlewares)),
	);
};
