import { checkLoginTransactionActions } from './checkLogin';
import { createLoginTransactionActions } from './createLogin';
import { findPersonTransactionActions } from './findPerson';

import { createVerificationCodeTransaction } from './createVerificationCode';
import { uploadDocumentTransaction } from './uploadDocument';
import { createPersonTransaction } from './createPerson';
import * as fromTransaction from './transactionSelectors';
import transactions from './transactionReducer';

export * from './transactionModels';
export {
	checkLoginTransactionActions,
	findPersonTransactionActions,
	createLoginTransactionActions,
	createVerificationCodeTransaction,
	fromTransaction,
	uploadDocumentTransaction,
	createPersonTransaction,
};

export default transactions;
