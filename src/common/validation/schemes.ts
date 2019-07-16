import { object, lazy, string, boolean, number, mixed, array } from 'yup';
import { RUS_ALPHABET } from '../constants';
import { ISelectItem, isNil, mergeSchemes } from '$common';

const EMPTY_FIELD_MESSAGE = 'Поле не должно быть пустым';
const RUS_FIELD_MESSAGE = 'Поле может содержать только русские буквы';

export const DocumentFormSchema = object({
	docType: object().required(EMPTY_FIELD_MESSAGE),
	docSubType: object().required(EMPTY_FIELD_MESSAGE),
	docNumber: string().required(EMPTY_FIELD_MESSAGE), // TODO check if type is 1 or 2 when required
	docSeries: string().required(EMPTY_FIELD_MESSAGE),
	docIssieBy: string().test({ message: EMPTY_FIELD_MESSAGE, test: (value = '') => value.length > 0 }),
	docDate: string().required(EMPTY_FIELD_MESSAGE),
	docFile: mixed().required('Необходимо добавить файл'),
});

export const AnyDocumentFormSchema = object().shape({
	documents: array().of(
		object().shape({
			docType: mixed().test('docType', EMPTY_FIELD_MESSAGE, value => {
				return !isNil(value);
			}),
			docSubType: mixed().test('docSubType', EMPTY_FIELD_MESSAGE, function(value: ISelectItem) {
				const { docType } = this.parent;

				return !docType ? false : !value && docType.id !== 1 && docType.id !== 2;
			}),
			docNumber: mixed().test('docNumber', EMPTY_FIELD_MESSAGE, function(value: string = '') {
				const { docType } = this.parent;

				return docType && docType.has_number && docType.need_info ? !!value : true;
			}),
			docSeries: mixed().test('docSeries', EMPTY_FIELD_MESSAGE, function(value: string = '') {
				const { docType } = this.parent;

				return docType && docType.need_info ? !!value : true;
			}),
			docIssieBy: mixed().test('docIssieBy', EMPTY_FIELD_MESSAGE, function(value: string = '') {
				const { docType } = this.parent;

				return docType && docType.need_info ? RUS_ALPHABET.test(value) : true;
			}),
			docDate: mixed().test('docDate', EMPTY_FIELD_MESSAGE, function(value: string = '') {
				const { docType } = this.parent;

				return docType && docType.need_info ? !!value : true;
			}),
			docFile: mixed().required('Необходимо добавить файл'),
		}),
	),
});

export const PersonFormSchema = object({
	birthPlace: string()
		.required(EMPTY_FIELD_MESSAGE)
		.test({ message: RUS_FIELD_MESSAGE, test: value => RUS_ALPHABET.test(value) }),
	isApplyPersonData: boolean().test({
		message: 'Необходимо выбрать поле',
		test: (value: boolean) => {
			return value;
		},
	}),
	codeDepartment: mixed().test('codeDepartment', EMPTY_FIELD_MESSAGE, function(value: string = '') {
		const { docType, docSubType } = this.parent;

		return !(docType.id === 1 && docSubType.id === 1 && value.length === 0);
	}),
});

export const EnrollPersonFormSchema = mergeSchemes(PersonFormSchema, DocumentFormSchema);

export const EnrollRegFormSchema = object({
	firstName: string()
		.required(EMPTY_FIELD_MESSAGE)
		.test({ message: 'Поле может содержать только русские буквы', test: value => RUS_ALPHABET.test(value) }),
	lastName: string()
		.required(EMPTY_FIELD_MESSAGE)
		.test({ message: 'Поле может содержать только русские буквы', test: value => RUS_ALPHABET.test(value) }),
	birthday: string().required(EMPTY_FIELD_MESSAGE),
	gender: number().moreThan(0, 'Необходимо выбрать одно из значений'),
	middleName: string()
		.notRequired()
		.test({
			message: 'Поле может содержать только русские буквы',
			test: (value = '') => (value.length ? RUS_ALPHABET.test(value) : true),
		}),
});

export const EnrollVerificationFormSchema = object({
	verificationCode: string().required(EMPTY_FIELD_MESSAGE),
});

export const EnrollContactsFormSchema = object({
	needDormitory: boolean().notRequired(),
	regIndex: string().required(EMPTY_FIELD_MESSAGE),
	regRegion: string()
		.notRequired()
		.test({ message: 'Поле может содержать только русские буквы', test: value => RUS_ALPHABET.test(value) }),
	regLocality: string()
		.required(EMPTY_FIELD_MESSAGE)
		.test({ message: 'Поле может содержать только русские буквы', test: value => RUS_ALPHABET.test(value) }),
	regStreet: string()
		.required(EMPTY_FIELD_MESSAGE)
		.test({ message: 'Поле может содержать только русские буквы', test: value => RUS_ALPHABET.test(value) }),
	regHome: string().required(EMPTY_FIELD_MESSAGE),
	regBlock: string().required(EMPTY_FIELD_MESSAGE),
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
		.email('Введите корректный Email'),
});
