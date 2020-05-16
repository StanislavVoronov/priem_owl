import { isEmpty, moment } from '@black_bird/utils';
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
		return document.num ? document.num.length > 0 : false;
	}
	if (document.type && document.type.need_info) {
		return ![document.issieBy, document.date, document.series].includes('');
	}

	return true;
};
export const validateRequireTextField = (value: string = '') => {
	return isEmpty(value) ? 'Поле не должно быть пустым' : '';
};

export const isValidDate = (value: string) => {
	return moment(value).isValid() ? '' : 'Некорректный формат даты';
};

export const validateRusTextField = (value: string = '') => {
	return validateRequireTextField(value) || (value.length > 0 && !RUS_ALPHABET.test(value))
		? 'Поле может содержать только русские буквы'
		: void 0;
};

export const validateRequireRusText = (value: string) => {
	return [validateRequireTextField(value), validateRusTextField(value)].find((item) =>
		not(isNil(item)),
	);
};
