import { ARRAY_ENG_ALPHABET, ARRAY_RUS_ALPHABET } from './constants';

export const cyrillToLatin = (text: string) => {
	ARRAY_RUS_ALPHABET.forEach((letter, index) => {
		const reg = new RegExp(ARRAY_RUS_ALPHABET[index], 'g');
		text = text.replace(reg, ARRAY_ENG_ALPHABET[index]);
	});

	return text.toLowerCase();
};

export const generatePassword = () => {
	return Math.random()
		.toString(36)
		.slice(-8);
};
