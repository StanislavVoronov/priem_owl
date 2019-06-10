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

export const enrollEducationFormSelector = (state: IRootState) => {
	return state.enrollEducationForm;
};

export const enrollDocumentsFormSelector = (state: IRootState) => {
	return state.enrollDocumentsForm.documents;
};

export const enrollIsForeignerSelector = (state: IRootState) => {
	return state.enrollPersonForm.docGovernment.id === 1;
};

export const enrollAccountVerificationFormSelector = (state: IRootState) => {
	return state.enrollAccountVerificationForm;
};
