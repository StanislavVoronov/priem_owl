import { submitRegFormAction } from './actions';
import { createReducer, forAction } from '@black_bird/utils';

const initial = {
	lastName: '',
	middleName: '',
	firstName: '',
	birthday: '',
	gender: '',
	verAccountCode: '',
};

const regFormReducer = createReducer(
	[
		forAction(submitRegFormAction, (state, payload) => ({
			...payload,
			lastName: payload.lastName.trim(),
			middleName: payload.middleName.trim(),
			firstName: payload.firstName.trim(),
		})),
	],
	initial,
);

export default regFormReducer;
