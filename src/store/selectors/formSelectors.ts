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

export const documentsFormSelector = (state: IRootState) => {
	return state.documentsForm;
};

export const isForeignerSelector = (state: IRootState) => {
	return state.personForm.document.government.id !== 1;
};

export const enrollAccountVerificationFormSelector = (state: IRootState) => {
	return state.enrollAccountVerificationForm;
};

export const applicationsFormSelector = (state: IRootState) => {
	return state.applicationsForm;
};
