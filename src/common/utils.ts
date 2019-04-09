import { IRootState, TypeSpace } from './models';
import { Action } from 'redux-actions';

export const composeStyles = (...rest: any) => Object.assign({}, ...rest);

export const makeVerticalSpace = (space: TypeSpace = 'none'): Object => {
	switch (space) {
		case 'minor': {
			return { marginTop: 6, marginBottom: 3 };
		}
		case 'small': {
			return { marginTop: 12, marginBottom: 6 };
		}
		case 'normal': {
			return { marginTop: 16, marginBottom: 12 };
		}
		case 'large': {
			return { marginTop: 24, marginBottom: 20 };
		}
		default: {
			return {};
		}
	}
};

export const makeHorizontalSpace = (space: TypeSpace = 'none'): Record<string, number> => {
	switch (space) {
		case 'minor': {
			return { marginHorizontal: 10 };
		}
		case 'small': {
			return { marginHorizontal: 20 };
		}
		case 'normal': {
			return { marginHorizontal: 30 };
		}
		default: {
			return {};
		}
	}
};

export const checkPayload = <State, Payload>(action: Action<any>, callback: (data: Payload) => State) => {
	const data = action.payload;

	return callback(data);
};

export const inValidateDataForm = (data: Record<string, any>): boolean => {
	let invalidData = false;
	for (let key in data) {
		if (invalidData) {
			return invalidData;
		}
		const value = data[key];

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
	}
	return invalidData;
};
