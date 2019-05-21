import {
	Gender,
	IContactsForm,
	IDocument,
	IEducationForm,
	inputValueAsNumber,
	inputValueAsString,
	IPerson,
	IPersonForm,
	IEnrollRegisterForm,
} from '$common';
import { ENG_ALPHABET, RUS_ALPHABET } from '../constants';
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

export const validateRequireTextField = (value: string, required: boolean): string | void => {
	if (required && value.length === 0) {
		return 'Поле не должно быть пустым';
	}
};

export const validateTextInput = (event: ChangeEvent<HTMLInputElement>): void | string => {
	const value = inputValueAsString(event);
	const { required, minLength, maxLength, lang } = event.target;

	return validateRequireTextField(value, required) || validateTextFieldLang(value, lang);
};

export const validateMinMaxLengthField = (value: string, minLength: number, maxLength: number): void | string => {
	if (value.length < minLength) {
		return `Поле должно содержать минимум ${minLength} символов`;
	}
	if (maxLength > -1 && value.length > maxLength) {
		return `Поле может содержать только ${maxLength} символов`;
	}
};

export const validateTextFieldLang = (value: string, lang: string): string | void => {
	switch (lang) {
		case 'rus': {
			return !RUS_ALPHABET.test(value) ? 'Поле может содержать только русские буквы' : '';
		}
		case 'eng': {
			return !ENG_ALPHABET.test(value) ? 'Поле может содержать только латинские буквы' : '';
		}
		default: {
			return '';
		}
	}
};
const patternErrorMessage = (pattern: string) => {
	return `Поле не соответствует шаблону ${pattern}`;
};
export const validateTextFieldPattern = (value: string, pattern: string): string | void => {
	const regExpPattern = new RegExp(pattern);
	if (!regExpPattern.test(value)) {
		return patternErrorMessage(pattern);
	}
};
