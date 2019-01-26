import { Space } from './models';
export const makeSpace = (type?: Space) => {
	if (type === 'small') {
		return { marginTop: 12, marginBottom: 6 };
	}
	if (type === 'middle') {
		return { marginTop: 16, marginBottom: 12 };
	}
	if (type === 'big') {
		return { marginTop: 24, marginBottom: 16 };
	}
	return {};
};
