import { IRootState } from '$store';

export const regFormSelector = (state: IRootState) => {
	return state.regForm;
};

export const dictionaryStateSelector = (state: IRootState) => {
	return state.dictionaries;
};

export const enrollPersonFormSelector = (state: IRootState) => {
	return state.enrollPersonForm;
};

export const enrollSelector = (state: IRootState) => {
	return state.enroll;
};

export const contactsFormSelector = (state: IRootState) => {
	return state.contactsForm;
};

export const enrollEducationFormSelector = (state: IRootState) => {
	return state.enrollEducationForm;
};

export const enrollDocumentsFormSelector = (state: IRootState) => {
	return state.enrollDocumentsForm;
};

export const enrollIsForeignerSelector = (state: IRootState) => {
	return state.enrollPersonForm.docGovernment.id !== 1;
};

export const enrollAccountVerificationFormSelector = (state: IRootState) => {
	return state.enrollAccountVerificationForm;
};

export const enrollApplicationsFormSelector = (state: IRootState) => {
	return state.enrollApplicationsForm;
};
