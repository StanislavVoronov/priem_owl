import { combineReducers } from 'redux';
import { dictionaryReducer } from '@mgutm-fcu/dictionary';

import { enrollRegistration } from './registrationForm';
import { enrollPersonForm } from './personForm';
import { enrollContactsForm } from './contactsForm';
import { enrollEducationFrom } from './educationForm';
import transactions from './transactions';

const rootReducer = combineReducers<any>({
	enrollRegistration,
	enrollPersonForm,
	enrollEducationFrom,
	dictionaries: dictionaryReducer,
	enrollContactsForm,
	transactions,
});

export default rootReducer;
