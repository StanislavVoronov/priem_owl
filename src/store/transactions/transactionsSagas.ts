import { payFormsSaga } from './priemPayFormsTransaction';
import { educFormsSaga } from './priemEducFormsTransaction';
import { priemAdmGroupsSaga } from './priemAdmGroups';
import { priemProfilesSaga } from './priemProfilesTransaction';
import { priemDirectionSaga } from './priemDirectionsTransaction';
import { priemInstsSaga } from './priemInstitutesTransaction';
import { priemFilialsSaga } from './priemFilialsTransaction';

export const transactionsSagas = [
	payFormsSaga,
	educFormsSaga,
	priemAdmGroupsSaga,
	priemProfilesSaga,
	priemDirectionSaga,
	priemInstsSaga,
	priemFilialsSaga,
];
