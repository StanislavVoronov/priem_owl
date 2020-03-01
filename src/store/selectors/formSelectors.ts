import { IRootState } from '$store';

export const regFormSelector = (state: IRootState) => {
	return state.regForm;
};

export const personFormSelector = (state: IRootState) => {
	return state.personForm;
};

export const enrollSelector = (state: IRootState) => {
	return state.enroll;
};

export const contactsFormSelector = (state: IRootState) => {
	return state.contactsForm;
};

export const educationFormSelector = (state: IRootState) => {
	return state.educationForm;
};

export const enrollDocumentsFormSelector = (state: IRootState) => {
	return state.enrollDocumentsForm;
};

export const enrollIsForeignerSelector = (state: IRootState) => {
	return state.personForm.document.government.id !== 1;
};

export const enrollAccountVerificationFormSelector = (state: IRootState) => {
	return state.enrollAccountVerificationForm;
};

export const applicationFormSelector = (state: IRootState) => {
	return state.applicationsForm;
};
