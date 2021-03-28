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
import { documentsFormReducer } from './documentsForm';
import { verAccountFormReducer } from './verAccountForm';
import { IRootState } from './models';
import { imagesReducer } from './images';
const composeDevTools = composeWithDevTools({});

export const createCustomStore = () => (...middlewares: Array<Middleware<any>>) => () => {
	return createStore(
		combineReducers<IRootState>({
			enroll: enrollReducer,
			regForm: regFormReducer,
			personForm: personFormReducer,
			contactsForm: contactsFormReducer,
			educationForm: educationFormReducer,
			applicationsForm: applicationsFormReducer,
			dictionaries: dictionaryReducer,
			documentsForm: documentsFormReducer,
			verAccountForm: verAccountFormReducer,
			transactions: transactionsReducer as any,
			images: imagesReducer,
		}),
		composeDevTools(applyMiddleware(...middlewares)),
		// process.env.PRIEM_BUILD !== 'production'
		// 	? composeDevTools(applyMiddleware(...middlewares))
		// : applyMiddleware(...middlewares),
	);
};
