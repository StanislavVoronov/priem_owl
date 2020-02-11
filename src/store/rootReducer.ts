import { combineReducers } from 'redux';
import { dictionaryReducer } from '@mgutm-fcu/dictionary';

import { enrollRegistration } from './registrationForm';
import { enrollPersonForm } from './personForm';
import { enrollContactsForm } from './contactsForm';
import { enrollEducationForm } from './educationForm';
import { enrollDocumentsForm } from './documentsForm';
import { enrollApplicationsForm } from './applicationsForm';
import transactions from './transactions';
import { enrollAccountVerificationForm } from './accountVerification';

const rootReducer = combineReducers<any>({
	enrollRegistration,
	enrollPersonForm,
	enrollEducationForm,
	enrollApplicationsForm,
	dictionaries: dictionaryReducer,
	enrollAccountVerificationForm,
	enrollContactsForm,
	enrollDocumentsForm,
	transactions,
});

export default rootReducer;
