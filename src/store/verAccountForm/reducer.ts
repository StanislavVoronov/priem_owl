import { submitVerAccountForm, verAccountMethodChanged } from './actions';
import { createReducer, forAction } from '@black_bird/utils';
import { IVerAccountForm, VerificationMethod } from '$common';

const verAccountFormReducer = createReducer<IVerAccountForm>(
	[
		forAction(submitVerAccountForm, (state, payload) => payload),
		forAction(verAccountMethodChanged, (state, verAccountMethod) => ({
			...state,
			verAccountMethod: verAccountMethod.value,
		})),
	],
	{
		verAccountMethod: { code: VerificationMethod.Phone, value: '' },
		verAccountCode: '',
	},
);

export default verAccountFormReducer;
