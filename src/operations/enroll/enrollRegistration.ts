import {
	checkLoginTransaction,
	createLoginTransaction,
	fromTransaction,
	IRootState,
	enrollRegistrationSelector,
	findPersonTransaction,
	createVerificationCodeTransaction,
	enrollContactsFormSelector,
	enrollPersonFormSelector,
	enrollEducationFormSelector,
	enrollAccountVerificationFormSelector,
} from '$store';
import { ThunkAction } from 'redux-thunk';
import { Action } from 'redux';
import { createLoginActions, cyrillToLatin, generatePassword, IDocument, moment, ServerBoolean } from '$common';
import { PriemEnroll } from '$services';
import { createPersonTransaction } from '../../store/transactions/createPerson';

export const enrollCreateNewLogin = (): ThunkAction<Promise<void>, IRootState, void, Action> => (
	dispatch,
	getState,
) => {
	const state = getState();
	const { data } = enrollRegistrationSelector(state);
	const lastName = cyrillToLatin(data.lastName);
	const firstName = cyrillToLatin(data.firstName);
	const middleName = cyrillToLatin(data.middleName);

	let firstPart = '';
	const password = generatePassword();
	const firstNameList = Array.from(firstName);
	const secondNameList = Array.from(middleName);
	const generateLogin = async () => {
		for (const firstLetter of firstNameList) {
			firstPart += firstLetter;
			let login = `${lastName}.${firstPart}.`;
			for (const secondLetter of secondNameList) {
				login += secondLetter;
				await dispatch(checkLoginTransaction(login));
				if (fromTransaction.isUniqueLoginSelector(getState()).result) {
					return Promise.resolve(login);
				}
			}
		}

		return Promise.reject("Не сформировать уникальный логин'");
	};

	return generateLogin()
		.then(login => {
			if (login) {
				return dispatch(createLoginTransaction(login, password));
			}
			throw new Error('Не удалось сформировать уникальный логин');
		})
		.catch(error => {
			dispatch(createLoginActions.failure({ message: error }));
		});
};

export const findPerson = (): ThunkAction<Promise<void>, IRootState, void, Action> => (dispatch, getState) => {
	const { data } = enrollRegistrationSelector(getState());

	dispatch(findPersonTransaction(data));

	if (fromTransaction.findPersonSelector(getState()).result) {
		return Promise.reject();
	} else {
		return Promise.resolve();
	}
};

export const createVerificationCode = (): ThunkAction<Promise<void>, IRootState, void, Action> => (
	dispatch,
	getState,
) => {
	const { data } = enrollContactsFormSelector(getState());

	return dispatch(createVerificationCodeTransaction(data.email, data.mobPhone, 1));
};

export const createPerson = (): ThunkAction<Promise<void>, IRootState, void, Action> => (dispatch, getState) => {
	const state = getState();
	const registrationForm = enrollRegistrationSelector(state).data;
	const contactsForm = enrollContactsFormSelector(state).data;
	const personForm = enrollPersonFormSelector(state).data;
	const educationForm = enrollEducationFormSelector(state).data;
	const accountVerificationForm = enrollAccountVerificationFormSelector(state).data;

	const payload = {
		email_code: accountVerificationForm.verificationCode,
		phone_code: '000000',
		email: contactsForm.email,
		lname: registrationForm.lastName,
		fname: registrationForm.firstName,
		mname: registrationForm.middleName,
		birthdate: moment(registrationForm.birthday).format('DD-MM-YYYY'),
		birthplace: personForm.birthPlace,
		need_hostel: contactsForm.needDormitory ? ServerBoolean.True : ServerBoolean.False,
		sex: registrationForm.gender,
		hight_first: educationForm.firstHighEducation ? ServerBoolean.True : ServerBoolean.False,
		best_prev_edu: educationForm.prevEducation,
		cheat_type: 0,
	};

	return dispatch(createPersonTransaction(payload));
};
const uploadDocList = (): ThunkAction<Promise<void>, IRootState, void, Action> => dispatch => {
	const documents: IDocument[] = [];
	return Promise.all(
		documents.map(item => {
			const document: IUploadDocRequest = {
				mime: item.docFile ? item.docFile.type : null,
				type: item.docType ? item.docType.id : 0,
				stype: item.docSubType ? item.docSubType.id : null,
				seria: item.docSeries || '-',
				num: item.docNumber || '-',
				iss_org: item.docIssieBy ? `${item.docIssieBy}${item.codeDepartment ? ' ' + item.codeDepartment : ''}` : '-',
				iss_date: item.docDate ? moment(item.docDate).format('DD-MM-YYYY') : '01-01-1970',
				iss_gov: item.docGovernment ? item.docGovernment.id : 1,
			};

			return PriemApi.post(PriemRestApi.AddDocuments, omitBy(document, isNull), {
				page: { value: item.docFile, name: item.docFile ? item.docFile.name : '-' },
			})
				.then(response => {
					console.log('successDocuments', response);

					return Promise.resolve();
				})
				.catch(error => {
					console.log('errorDocuments', error);

					return Promise.reject();
				});
		}),
	)
		.then(() => {
			dispatch(uploadDocsSuccess());

			return Promise.resolve();
		})
		.catch((error: IServerError) => {
			dispatch(uploadDocsFailure(error));

			return Promise.reject();
		});
};
