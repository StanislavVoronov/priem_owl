import { ITransaction, sagaEffects, TransactionStatus } from '@black_bird/utils';
import {
	applicationsFormSelector,
	createAppsTransactionSelector,
	createAppTransactionActions,
	documentsFormSelector,
	priemLogoutTransactionActions,
	updateAddressesTransactionSelector,
	updateAddressTransactionActions,
	uploadDocumentsTransactionSelector,
	uploadDocumentTransactionActions,
} from '$store';

const isReadyForLogout = (
	addressTransactions: Record<string, ITransaction<unknown>>,
	docsTransactions: Record<string, ITransaction<unknown>>,
	appTransaction: Record<string, ITransaction<unknown>>,
) => {
	return (
		Object.values(addressTransactions).every(item => item.status === TransactionStatus.COMPLETED) &&
		Object.values(docsTransactions).every(item => item.status === TransactionStatus.COMPLETED) &&
		Object.values(appTransaction).every(item => item.status === TransactionStatus.COMPLETED)
	);
};
function* checkFullFilledRequest() {
	const docs = yield sagaEffects.select(uploadDocumentsTransactionSelector);
	const apps = yield sagaEffects.select(createAppsTransactionSelector);
	const addresses = yield sagaEffects.select(updateAddressesTransactionSelector);

	const { documents } = yield sagaEffects.select(documentsFormSelector);

	const { applications } = yield sagaEffects.select(applicationsFormSelector);
	console.log('applications', applications, apps);
	console.log('documents', documents, docs);
	console.log('addresses', addresses);

	const isAppsReady = applications.length === Object.keys(apps).length + 4; // passport and diploma, reg and live address
	const isDocsReady = documents.length === Object.keys(docs).length;
	const isAddressReady = 2 === Object.keys(addresses).length; // reg and live address

	if (isReadyForLogout(docs, apps, addresses) && isAppsReady && isDocsReady && isAddressReady) {
		yield sagaEffects.put(priemLogoutTransactionActions.trigger());
	}
}
export const priemLogoutSagas = [
	sagaEffects.takeEvery(createAppTransactionActions.success, checkFullFilledRequest),
	sagaEffects.takeLatest(uploadDocumentTransactionActions.success, checkFullFilledRequest),
	sagaEffects.takeLatest(updateAddressTransactionActions.success, checkFullFilledRequest),
];
