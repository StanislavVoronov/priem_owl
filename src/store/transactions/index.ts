import { checkLoginTransaction } from './checkLogin';
import { createLoginTransaction } from './createLogin';
import { findPersonTransaction } from './findPerson';
import { createVerificationCodeTransaction } from './createVerificationCode';
import { uploadDocumentTransaction } from './uploadDocument';
import { createPersonTransaction } from './createPerson';

import transactions, * as fromTransaction from './rootReducer';

export * from './models';
export {
	checkLoginTransaction,
	createLoginTransaction,
	findPersonTransaction,
	createVerificationCodeTransaction,
	fromTransaction,
	uploadDocumentTransaction,
	createPersonTransaction,
};

export default transactions;
