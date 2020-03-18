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

export const transactionsSagas = [
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
];
