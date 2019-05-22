import { combineReducers } from 'redux';
import { dictionaryReducer } from '@mgutm-fcu/dictionary';

import { enrollRegistration } from './enrollRegForm';
import transactions from './transactions';

const rootReducer = combineReducers<any>({
	enrollRegistration,
	dictionaries: dictionaryReducer,
	transactions,
});

export default rootReducer;
