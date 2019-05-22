import { combineReducers } from 'redux';
import { dictionaryReducer } from '@mgutm-fcu/dictionary';

import { enrollRegistration } from './enrollRegForm';
import { enroll } from './transactions';
const rootReducer = combineReducers<any>({
	enrollRegistration,
	dictionaries: dictionaryReducer,
	enroll,
});

export default rootReducer;
