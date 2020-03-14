import { IDocument } from '$common';
import { RUS_ALPHABET } from '../constants';
import { isNil, not } from '../functions';

export const validateDocument = (document: IDocument): boolean => {
	if (!document.file || !document.type) {
		return false;
	}
	if (document.type && (document.type.id === 1 || document.type.id === 2) && !document.subType) {
		return false;
	}
	if (document.type && document.type.has_num) {
		return document.num ? !!document.num : false;
	}
	if (document.type && document.type.need_info) {
		return !!(document.issieBy && document.date && document.series);
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
