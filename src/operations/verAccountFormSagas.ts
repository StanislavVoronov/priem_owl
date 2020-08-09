import { ITransaction, sagaEffects, TransactionStatus } from '@black_bird/utils';
import {
	contactsFormSelector,
	createAppsTransactionSelector,
	createAppTransactionActions,
	createPersonTransactionActions,
	createPersonTransactionSelector,
	createVerCodeTransactionActions,
	priemLogoutTransactionActions,
	submitApplicationFormAction,
	updateAddressTransactionActions,
	updateAddressTransactionSelector,
	updateLoginTrnActions,
	uploadDocumentsTransactionSelector,
	uploadDocumentTransactionActions,
	verAccountFormSelector,
	verAccountMethodChanged,
	verPersonContactsTrnSelector,
} from '$store';
import { AddressType, IContactsForm, VerificationMethod } from '$common';
import { uploadDocumentsSaga } from './uploadDocumentsSagas';
import { createNewPriemAppSaga } from './createApplication';

export const verAccountFormSagas = [
	sagaEffects.takeEvery(submitApplicationFormAction, function* () {
		const verPersonContacts = yield sagaEffects.select(verPersonContactsTrnSelector);

		if (verPersonContacts.status === TransactionStatus.COMPLETED) {
			yield sagaEffects.call(uploadDocumentsSaga);
			yield sagaEffects.call(createNewPriemAppSaga);
		} else {
			const { mobPhone } = yield sagaEffects.select(contactsFormSelector);

			yield sagaEffects.put(
				verAccountMethodChanged({ value: { code: VerificationMethod.Phone, value: mobPhone } }),
			);
		}
	}),
	sagaEffects.takeLatest(verAccountMethodChanged, function* ({ payload }) {
		const { mobPhone, email } = yield sagaEffects.select(contactsFormSelector);

		yield sagaEffects.put(
			createVerCodeTransactionActions.trigger({
				email: email.trim(),
				phone: mobPhone.trim(),
				method: payload.value.code,
			}),
		);
	}),
	sagaEffects.takeEvery(
		[
			createPersonTransactionActions.success,
			uploadDocumentTransactionActions.success,
			updateAddressTransactionActions.success,
			createAppTransactionActions.success,
		],
		function* () {
			const createPersonDataTransaction = yield sagaEffects.select(createPersonTransactionSelector);
			const updateLiveAddressTransaction = yield sagaEffects.select(
				updateAddressTransactionSelector,
				AddressType.Live,
			);
			const updateRegAddressTransaction = yield sagaEffects.select(
				updateAddressTransactionSelector,
				AddressType.Reg,
			);
			const appsTransactions = yield sagaEffects.select(createAppsTransactionSelector);
			const docsTransactions = yield sagaEffects.select(uploadDocumentsTransactionSelector);
			const folderCreated =
				createPersonDataTransaction.status === TransactionStatus.COMPLETED &&
				updateLiveAddressTransaction &&
				updateLiveAddressTransaction.status === TransactionStatus.COMPLETED &&
				updateRegAddressTransaction &&
				updateRegAddressTransaction.status === TransactionStatus.COMPLETED &&
				Object.values(appsTransactions).every(
					(item: ITransaction<any>) => item.status === TransactionStatus.COMPLETED,
				) &&
				Object.values(docsTransactions).every(
					(item: ITransaction<any>) => item.status === TransactionStatus.COMPLETED,
				);

			const { email }: IContactsForm = yield sagaEffects.select(contactsFormSelector);

			if (folderCreated) {
				yield sagaEffects.put(updateLoginTrnActions.trigger(email));

				yield sagaEffects.put(priemLogoutTransactionActions.trigger());
			}
		},
	),
];
