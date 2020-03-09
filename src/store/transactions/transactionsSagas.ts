import {
	educFormsSaga,
	payFormsSaga,
	priemAdmGroupsSaga,
	priemDirectionSaga,
	priemInstsSaga,
	priemProfilesSaga,
	priemFilialsSaga,
} from '$store';

export const transactionsSagas = [
	payFormsSaga,
	educFormsSaga,
	priemAdmGroupsSaga,
	priemProfilesSaga,
	priemDirectionSaga,
	priemInstsSaga,
	priemFilialsSaga,
];
