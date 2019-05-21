import { IRootState } from '$store';

export const enrollRegistrationSelector = (state: IRootState) => {
	return state.enrollRegistration;
};

export const dictionaryStateSelector = (state: IRootState) => {
	return state.dictionaries;
};
