import { IDocument } from '$common';
import { RUS_ALPHABET } from '../constants';
import { isNil, not } from '../functions';

export const validateDocument = (document: IDocument): boolean => {
	if (!document.docFile || !document.docType) {
		return false;
	}
	if (document.docType && (document.docType.id === 1 || document.docType.id === 2) && !document.docSubType) {
		return false;
	}
	if (document.docType && document.docType.has_number) {
		return document.docNumber ? !!document.docNumber : false;
	}
	if (document.docType && document.docType.need_info) {
		return !!(document.docIssieBy && document.docDate && document.docSeries);
	}

	return true;
};
export const validateRequireTextField = (value: string = '') => {
	return value.length === 0 ? 'Поле не должно быть пустым' : void 0;
};

export const validateRusTextField = (value: string = '') => {
	return value.length > 0 && !RUS_ALPHABET.test(value) ? 'Поле может содержать только русские буквы' : void 0;
};

export const validateRequireRusText = (value: string) => {
	return [validateRequireTextField(value), validateRusTextField(value)].find(item => not(isNil(item)));
};
