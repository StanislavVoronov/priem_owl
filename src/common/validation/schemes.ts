import { object, string, boolean } from 'yup';
import { RUS_ALPHABET } from '../constants';

const EMPTY_FIELD_MESSAGE = 'Поле не должно быть пустым';
const RUS_FIELD_MESSAGE = 'Поле может содержать только русские буквы';

export const DocumentFormSchema = object({
	docType: object().required(EMPTY_FIELD_MESSAGE),
	docSubType: object().required(EMPTY_FIELD_MESSAGE),
	docNumber: string().required(EMPTY_FIELD_MESSAGE),
	docSeries: string().required(EMPTY_FIELD_MESSAGE),
	docGovernment: string().required(EMPTY_FIELD_MESSAGE),
	docIssieBy: string().required(EMPTY_FIELD_MESSAGE),
	docDate: string().required(EMPTY_FIELD_MESSAGE),
	docFile: object().required(EMPTY_FIELD_MESSAGE),
	codeDepartment: string().required(EMPTY_FIELD_MESSAGE),
});
export const EnrollPersonFormSchema = object({
	birthPlace: string().notRequired(),
	birthday: string().required(EMPTY_FIELD_MESSAGE),
});

export const EnrollRegFormSchema = object({
	firstName: string()
		.required(EMPTY_FIELD_MESSAGE)
		.matches(RUS_ALPHABET, 'Поле может содержать только русские буквы'),
	lastName: string()
		.required(EMPTY_FIELD_MESSAGE)
		.matches(RUS_ALPHABET, 'Поле может содержать только русские буквы'),
	birthday: string().required(EMPTY_FIELD_MESSAGE),
	middleName: string().matches(RUS_ALPHABET, 'Поле может содержать только русские буквы'),
});

export const EnrollVerificationFormSchema = object({
	verificationCode: string().required(EMPTY_FIELD_MESSAGE),
});

export const EnrollContactsFormSchema = object({
	needDormitory: boolean().notRequired(),
	regIndex: string().required(EMPTY_FIELD_MESSAGE),
	regRegion: string()
		.required(EMPTY_FIELD_MESSAGE)
		.matches(RUS_ALPHABET, RUS_FIELD_MESSAGE),
	regLocality: string()
		.required(EMPTY_FIELD_MESSAGE)
		.matches(RUS_ALPHABET, RUS_FIELD_MESSAGE),
	regStreet: string()
		.required(EMPTY_FIELD_MESSAGE)
		.matches(RUS_ALPHABET, RUS_FIELD_MESSAGE),
	regHome: string()
		.required(EMPTY_FIELD_MESSAGE)
		.matches(RUS_ALPHABET, RUS_FIELD_MESSAGE),
	regBlock: string()
		.required(EMPTY_FIELD_MESSAGE)
		.matches(RUS_ALPHABET, RUS_FIELD_MESSAGE),
	regFlat: string().notRequired(),
	liveIndex: string().notRequired(),
	liveRegion: string().notRequired(),
	liveLocality: string().notRequired(),
	liveStreet: string().notRequired(),
	liveHome: string().notRequired(),
	liveBlock: string().notRequired(),
	liveFlat: string().notRequired(),
	homePhone: string().notRequired(),
	mobPhone: string().required(EMPTY_FIELD_MESSAGE),
	isRegAddressEqualLive: boolean().notRequired(),
	mobileGovernment: object().notRequired(),
	email: string()
		.required()
		.email('Введите корректный email'),
});
