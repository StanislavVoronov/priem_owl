import { IRootState } from '$store';
import { createSelector } from '@black_bird/utils';

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

export const verAccountFormSelector = (state: IRootState) => {
	return state.verAccountForm;
};

export const applicationsFormSelector = (state: IRootState) => {
	return state.applicationsForm;
};

export const disabledPayFormSelector = createSelector(applicationsFormSelector, (state) => {
	return state.disabledPayForms;
});

export const applicationAmdTypeSelector = createSelector(applicationsFormSelector, (state) => {
	return state.admType;
});

export const getLigotaDocument = createSelector(documentsFormSelector, (data) => {
	return data.documents.find((item) => item.cheatType && item.cheatType.id);
});
