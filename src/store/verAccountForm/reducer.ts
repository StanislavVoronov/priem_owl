import { submitVerAccountForm } from './actions';
import { createReducer, forAction } from '@black_bird/utils';
import { IVerAccountForm, VerificationMethod } from '$common';

const verAccountFormReducer = createReducer<IVerAccountForm>(
	[forAction(submitVerAccountForm, (state, payload) => payload)],
	{ verAccountMethod: VerificationMethod.Email, verAccountCode: '' },
);

export default verAccountFormReducer;
