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

export const validateDataForm = (invalidState: Record<string, any>): boolean => {
	let invalidData = true;
	for (let field in invalidState) {
		if (!invalidData) {
			return invalidData;
		}
		const value = invalidState[field];
		invalidData = typeof value === 'string' ? value.length > 0 : !!value;
	}
	return invalidData;
};
