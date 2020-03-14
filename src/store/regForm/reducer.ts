import { submitRegFormAction } from './actions';
import { createReducer, forAction } from '@black_bird/utils';

const initial = {
	lastName: 'Воронов',
	middleName: 'Станислав',
	firstName: 'Игоревич',
	birthday: '1990-12-25',
	gender: '1',
};

const regFormReducer = createReducer([forAction(submitRegFormAction, (state, payload) => payload)], initial);

export default regFormReducer;
