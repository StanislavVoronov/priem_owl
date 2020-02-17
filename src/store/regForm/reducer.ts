import { submitRegFormAction } from './actions';
import { createReducer, forAction } from '@black_bird/utils';

const initial = {
	lastName: '',
	middleName: '',
	firstName: '',
	birthday: '',
	gender: '',
};

const regFormReducer = createReducer(
	[
		forAction(submitRegFormAction, (state, payload) => {
			console.log('payload', payload);

			return payload;
		}),
	],
	initial,
);

export default regFormReducer;
