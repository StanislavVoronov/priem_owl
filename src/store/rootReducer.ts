import { combineReducers } from 'redux';
import { dictionaryReducer } from '@mgutm-fcu/dictionary';

import { enrollRegistration } from './enrollRegistration';

const rootReducer = combineReducers<any>({
	enrollRegistration,
	dictionaries: dictionaryReducer,
});

export default rootReducer;
