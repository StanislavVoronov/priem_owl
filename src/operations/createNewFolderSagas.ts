import { sagaEffects } from '@black_bird/utils';
import {
	contactsFormSelector,
	createPersonTransactionActions,
	educationFormSelector,
	getLigotaDocument,
	personFormSelector,
	regFormSelector,
	submitVerAccountForm,
	updatePhoneTransactionActions,
	verAccountFormSelector,
} from '$store';
import { IDocument, VerificationMethod } from '$common';

export const createNewFolderSagas = [
	sagaEffects.takeEvery(submitVerAccountForm, function* () {
		const { verAccountMethod, verAccountCode } = yield sagaEffects.select(verAccountFormSelector);
		const document: IDocument | undefined = yield sagaEffects.select(getLigotaDocument);

		const { lastName, firstName, middleName, gender, birthday } = yield sagaEffects.select(
			regFormSelector,
		);
		const { birthplace } = yield sagaEffects.select(personFormSelector);
		const { needHostel } = yield sagaEffects.select(contactsFormSelector);
		const { firstHighEducation, prevEducation } = yield sagaEffects.select(educationFormSelector);

		const emailCode = verAccountMethod === VerificationMethod.Email ? verAccountCode : '000000';

		const phoneCode = verAccountMethod === VerificationMethod.Phone ? verAccountCode : '000000';

		const payload = {
			verEmailCode: emailCode,
			verPhoneCode: phoneCode,
			lastName,
			firstName,
			middleName,
			gender,
			birthday,
			birthplace,
			needHostel,
			highFirst: firstHighEducation,
			bestPrevEdu: prevEducation,
			cheatType: document?.cheatType?.id,
		};

		yield sagaEffects.put(createPersonTransactionActions.trigger(payload));
	}),
];
