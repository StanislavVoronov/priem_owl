import { createSelector, isNotVoid } from '@black_bird/utils';
import { applicationsFormSelector } from '$store';
import { IAdmDictionaryItem } from '$common';

const idIs = (first: IAdmDictionaryItem | null, second: IAdmDictionaryItem | null) => {
	return isNotVoid(first) && isNotVoid(second) && first!.ID === second!.ID;
};
export const disabledAddButtonSelector = createSelector(applicationsFormSelector, applicationsForm => {
	const { filial, institute, profiles, educLevel, direction, educForms, payForms, applications } = applicationsForm;

	return applications.some(item => {
		return (
			idIs(item.filial, filial) &&
			idIs(item.educLevel, educLevel) &&
			idIs(item.inst, institute) &&
			idIs(item.dir, direction) &&
			profiles.some(profile => idIs(item.profile, profile)) &&
			educForms.some(educForm => idIs(item.educForm, educForm)) &&
			payForms.some(payForm => idIs(item.payForm, payForm))
		);
	});
});
