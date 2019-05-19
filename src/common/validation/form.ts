import {
	Gender,
	IContactsForm,
	IDocument,
	IEducationForm,
	inputValueAsNumber,
	inputValueAsString,
	IPerson,
	IPersonForm,
	IRegisterForm,
} from '$common';
import { ENG_ALPFABET, RUS_ALPFABET } from '../constants';
import React, { ChangeEvent } from 'react';

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

export const validateRequireTextField: React.ChangeEventHandler<HTMLInputElement> = (event): string | void => {
	if (event.target.required && inputValueAsString(event).length > 0) {
		return 'Поле не должно быть пустым';
	}
};

export const validateRusTextField = (text: string): void | string => {
	if (!RUS_ALPFABET.test(text)) {
		return 'Поле может содержать только русские буквы';
	}
};

export const validateField = (
	event: ChangeEvent<HTMLInputElement>,
	...args: Array<(event: any) => string | void>
): void | string => {
	return args.map(fn => fn(event)).find(Boolean);
};

export const validateMinMaxLengthField: React.ChangeEventHandler<HTMLInputElement> = (event): void | string => {
	const valueLength = inputValueAsString(event).length;
	const minLength = event.target.minLength;
	const maxLength = event.target.maxLength;

	if (valueLength < event.target.minLength) {
		return `Поле должно содержать минимум ${minLength} символов`;
	}
	if (maxLength > -1 && valueLength > maxLength) {
		return `Поле может содержать только ${maxLength} символов`;
	}
};

export const validateTextFieldLang: React.ChangeEventHandler<HTMLInputElement> = event => {
	const lang = event.target.lang.toLowerCase();
	const value = inputValueAsString(event);
	switch (lang) {
		case 'rus': {
			return !RUS_ALPFABET.test(value) && 'Поле может содержать только русские буквы';
		}
		case 'eng': {
			return !ENG_ALPFABET.test(value) && 'Поле может содержать только русские буквы';
		}
		default: {
			return '';
		}
	}
};
const patternErrorMessage = (pattern: string) => {
	return `Поле не соответствует шаблону ${pattern}`;
};
export const validateTextFieldPattern: React.ChangeEventHandler<HTMLInputElement> = event => {
	const pattern = event.target.pattern;
	const regExpPattern = new RegExp(event.target.pattern);
	const value = inputValueAsString(event);

	return !regExpPattern.test(value) && patternErrorMessage(pattern);
};
