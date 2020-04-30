import { AUTO_REQUEST_RETRY, IAdmDictionaryItem, TRANSACTION_NAMES } from '$common';
import {
	createSelector,
	createTransactionActions,
	prop,
	createTransactionReducer,
	sagaEffects,
} from '@black_bird/utils';
import { priemDirectionRest } from '$rests';
import { disabledPayFormSelector } from '../selectors';
import { transactionSelector } from './selectors';
import { priemEducLevelsTrnActions } from './priemEducLevelsTransaction';
import { priemInstitutesTrnActions } from './priemInstitutesTransaction';

export const priemDirectionsTrnActions = createTransactionActions(
	TRANSACTION_NAMES.FetchPriemDirections,
	(filial: IAdmDictionaryItem, educLevel: IAdmDictionaryItem, inst: IAdmDictionaryItem) => ({
		filial,
		inst,
		educLevel,
	}),
);

export const priemDirectionsReducer = createTransactionReducer(priemDirectionsTrnActions, {
	cleanActions: [priemInstitutesTrnActions.trigger],
});

export const priemDirectionsTransactionSelector = createSelector(
	transactionSelector,
	prop('priemDirections'),
);

export const priemDirectionSaga = sagaEffects.rest(priemDirectionsTrnActions, function* ({
	payload,
}) {
	const payForms = yield sagaEffects.select(disabledPayFormSelector);

	return yield priemDirectionRest(
		payload.filial.ID,
		payload.educLevel.ID,
		payload.inst.ID,
		payForms,
	);
});
