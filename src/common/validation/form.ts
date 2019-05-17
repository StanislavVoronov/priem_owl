import { Gender, IContactsForm, IDocument, IEducationForm, IPerson, IPersonForm, IRegisterForm } from '$common';
import EducationForm from '../../components/Forms/EducationForm';
import { RUS_ALPFABET } from '../constants';

export const validateDataForm = (data: Record<string, any>): boolean => {
	return !Object.values(data).some(
		(value): boolean => {
			let invalidData = false;
			switch (typeof value) {
				case 'string': {
					invalidData = value.trim().length === 0;
					break;
				}
				case 'object': {
					invalidData = value !== null ? Object.keys(value).length === 0 : true;
					break;
				}
				default: {
					invalidData = value === undefined;
				}
			}

			return invalidData;
		},
	);
};

export const validateDocument = (document: IDocument): boolean => {
	if (!document.docFile || !document.docType) {
		return false;
	}
	if (document.docType && (document.docType.id === 1 || document.docType.id === 2) && !document.docSubType) {
		return false;
	}
	if (document.docType && document.docType.has_number) {
		return document.docNumber !== '';
	}
	if (document.docType && document.docType.need_info) {
		return document.docIssieBy !== '' && document.docDate !== '' && document.docSeries !== '';
	}

	return true;
};
export const validatePersonForm = (fields: IPersonForm): boolean => {
	return (
		validateDataForm(fields) &&
		validateDocument(fields.document) &&
		validateDocument(fields.photo) &&
		fields.isApplyPersonData
	);
};
export const validateContactsForm = (fields: IContactsForm): boolean => {
	return validateDataForm(fields) && validateDocument(fields.document);
};
export const validateEducationForm = (fields: IEducationForm): boolean => {
	return validateDataForm(fields) && validateDocument(fields.document);
};
export const validateDocumentsForm = (documents: IDocument[]): boolean => {
	return documents.some((item: IDocument) => !validateDocument(item));
};
export const validateRegistrationForm = (fields: IRegisterForm): boolean => {
	if (fields.gender === Gender.None) {
		return false;
	}

	if (fields.login.length > 0 && fields.login.length < 8) {
		return false;
	}

	if (fields.password.length > 0 && fields.password.length < 7) {
		return false;
	}
	if (fields.password !== fields.repeatPassword) {
		return false;
	}

	return validateDataForm(fields);
};

export const validateEmptyTextField = (text: string): void | string => {
	if (text.length === 0) {
		return 'Поле не должно быть пустым';
	}
};

export const validateRusTextField = (text: string): void | string => {
	if (!RUS_ALPFABET.test(text)) {
		return 'Поле может содержать только русские буквы';
	}
};

export const validateField = (text: string, ...checkList: any[]): undefined | string => {
	return checkList.map(fn => fn(text)).find(Boolean);
};
