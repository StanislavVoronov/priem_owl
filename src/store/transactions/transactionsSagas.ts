import { payFormsSaga } from './priemPayFormsTransaction';
import { educFormsSaga } from './priemEducFormsTransaction';
import { priemAdmGroupsSaga } from './priemAdmGroupsTransaction';
import { priemProfilesSaga } from './priemProfilesTransaction';
import { priemDirectionSaga } from './priemDirectionsTransaction';
import { priemInstsSaga } from './priemInstitutesTransaction';
import { priemFilialsSaga } from './priemFilialsTransaction';
import { priemEducLevelSaga } from './priemEducLevelsTransaction';
import { updatePhoneSaga } from './updatePhoneTransaction';
import { createVerCodeSaga } from './createVerCodeTransaction';
import { createPersonSaga } from './createPersonTransaction';
import { updateAddressSaga } from './updateAdressTransaction';
import { uploadDocumentsSaga } from './uploadDocumentsTransaction';
import { createApplicationSaga } from './createAppTransaction';
import { createLoginSaga } from './createLoginTransaction';
import { findPersonSaga } from './findPersonTransaction';
import { checkLoginSaga } from './checkLoginTransaction';
import { priemLogoutSaga } from './priemLogoutTransaction';
import { verPersonTrnSaga } from './verificaitonExistPerson';
import { verPersonContactsTrnSaga } from './verificationPersonContacts';
import { setExistPersonVerCodeTrnSaga } from './setExistsPersonVerCode';
import { updateLoginSaga } from './updateLoginTrn';
import { priemAdmTypeSaga } from './priemAdmTypesTransaction';

export const transactionsSagas = [
	priemLogoutSaga,
	checkLoginSaga,
	createLoginSaga,
	findPersonSaga,
	createApplicationSaga,
	payFormsSaga,
	educFormsSaga,
	priemAdmGroupsSaga,
	priemProfilesSaga,
	priemDirectionSaga,
	priemInstsSaga,
	priemFilialsSaga,
	priemEducLevelSaga,
	updatePhoneSaga,
	createPersonSaga,
	createVerCodeSaga,
	updateAddressSaga,
	uploadDocumentsSaga,
	verPersonTrnSaga,
	verPersonContactsTrnSaga,
	setExistPersonVerCodeTrnSaga,
	updateLoginSaga,
	priemAdmTypeSaga,
];
