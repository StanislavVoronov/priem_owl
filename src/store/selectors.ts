import { IRootState } from '$store';

export const enrollRegistrationSelector = (state: IRootState) => {
	return state.enrollRegistration;
};

export const dictionaryStateSelector = (state: IRootState) => {
	return state.dictionaries;
};

export const enrollPersonFormSelector = (state: IRootState) => {
	return state.enrollPersonForm;
};

export const enrollContactsFormSelector = (state: IRootState) => {
	return state.enrollContactsForm;
};
