import React, { ChangeEvent, FormEvent, FormEventHandler, ReactText } from 'react';
import { Autocomplete, Button, H2, RadioButtonGroup, TextInput, LoadingButton } from '$components';
import {
	EDictionaryNameList,
	Gender,
	inputValueAsString,
	validateDataForm,
	IRegisterForm,
	IServerError,
	prepareDictionarySuggestions,
	EnrollForms,
	IStylable,
	validateTextInput,
	validateRequireTextField,
	validateMinMaxLengthField,
	isUndefined,
	validateTextFieldLang,
	validateTextFieldPattern,
} from '$common';
import { IDictionary, IDictionaryState } from '@mgutm-fcu/dictionary';

import styles from './styles.module.css';
import { RUS_ALPHABET } from '../../common/constants';

export const GENDERS = [{ value: 1, label: 'Муж.', color: 'primary' }, { value: 2, label: 'Жен.' }];

interface IProps {
	updateForm: (data: Partial<IRegisterForm>) => void;
	dictionaries: IDictionaryState;
	data: IRegisterForm;
	disabled: boolean;
}

interface IState extends IRegisterForm {
	invalidData: Record<keyof IRegisterForm, string | void>;
	validation: boolean;
}

class RegisterForm extends React.PureComponent<IProps, IState> {
	static defaultProps = {
		disabled: false,
	};

	state = {
		...this.props.data,
		invalidData: {
			lastName: '',
			middleName: '',
			firstName: '',
			birthday: '',
			gender: '',
			login: '',
			password: '',
			repeatPassword: '',
		},
		validation: false,
	};
	onBlur: React.ChangeEventHandler<HTMLInputElement> = event => {
		const name = event.target.name;
		const errorMessage = validateTextInput(event);

		this.setState({
			...this.state,
			[name]: inputValueAsString(event),
			invalidData: {
				...this.state.invalidData,
				[name]: errorMessage,
			},
		});
	};
	onChange: React.ChangeEventHandler<HTMLInputElement> = event => {
		const name = event.target.name;
		const errorMessage = validateTextInput(event);
		if (this.state.validation) {
			this.setState({
				...this.state,
				[name]: inputValueAsString(event),
				invalidData: {
					...this.state.invalidData,
					[name]: errorMessage,
				},
			});
		}
	};
	onChangeMiddleName = (value: string) => {
		const errorMessage = !RUS_ALPHABET.test(value) ? 'Поле может содержать только русские буквы' : '';

		this.setState({ middleName: value, invalidData: { ...this.state.invalidData, middleName: errorMessage } });
	};
	onChangeFirstName = (firstName: string) => {
		let firstNameError = validateRequireTextField(firstName, true) || validateTextFieldLang(firstName, 'rus');

		const firstNamesDictionary = this.props.dictionaries[EDictionaryNameList.FirstNames];
		const person = firstNamesDictionary.values.find(item => item.name === firstName);
		const gender = person ? (person.sex === '1' ? Gender.Male : Gender.Female) : Gender.None;
		console.log('firstNamesDictionary', firstNamesDictionary);
		this.setState({
			firstName,
			gender,
			invalidData: {
				...this.state.invalidData,
				firstNameError,
			},
		});
	};
	onChangeGender = (_: any, gender: string) => {
		this.props.updateForm({ gender: gender === '1' ? Gender.Male : Gender.Female });
	};
	onBlurRepeatPassword: React.ChangeEventHandler<HTMLInputElement> = event => {
		let repeatPassword =
			validateTextInput(event) || inputValueAsString(event) !== this.state.password ? 'Пароли не совпадают' : '';

		this.setState({
			repeatPassword: inputValueAsString(event),
			invalidData: {
				...this.state.invalidData,
				repeatPassword,
			},
		});
	};
	onSubmit: FormEventHandler<HTMLFormElement> = event => {
		event.preventDefault();
		const { invalidData, validation, middleName, ...requiredFields } = this.state;
		let validationFields: Record<keyof IRegisterForm, string> = {
			lastName: '',
			middleName: '',
			firstName: '',
			birthday: '',
			gender: '',
			login: '',
			password: '',
			repeatPassword: '',
		};
		Object.entries(requiredFields).forEach((values: string[]) => {
			validationFields = {
				...validationFields,
				[values[0]]: validateRequireTextField(values[1], true),
			};
		});

		if (Object.values(validationFields).some(Boolean)) {
			this.setState({ validation: true, invalidData: validationFields });
		} else {
			this.props.updateForm({ middleName, ...requiredFields });
		}
	};
	onChangeLogin: React.ChangeEventHandler<HTMLInputElement> = event => {
		const login = validateTextInput(event);
		this.setState({
			login: inputValueAsString(event),
			invalidData: {
				...this.state.invalidData,
				login,
			},
		});
	};
	render() {
		const { dictionaries } = this.props;
		const dictionaryFirstNames = dictionaries[EDictionaryNameList.FirstNames];
		const dictionaryMiddleNames = dictionaries[EDictionaryNameList.MiddleNames];
		const { middleName, ...requiredFields } = this.state.invalidData;

		const filteredDictionaryMiddleName = dictionaryMiddleNames
			? this.props.data.gender
				? {
						values: dictionaryMiddleNames.values.filter((item: { sex: number }) => item.sex === this.props.data.gender),
				  }
				: dictionaryMiddleNames
			: { values: [] };

		return (
			<form onSubmit={this.onSubmit} className="flexColumn" noValidate={true}>
				<TextInput
					disabled={this.props.disabled}
					name="lastName"
					onChange={this.onChange}
					required
					defaultValue={this.props.data.lastName}
					placeholder={'Введите фамилию'}
					label="Фамилия"
					helperText={this.state.invalidData.lastName}
					error={!!this.state.invalidData.lastName}
					onBlur={this.onBlur}
				/>
				<Autocomplete
					disabled={this.props.disabled}
					label={'Имя'}
					defaultValue={this.props.data.firstName}
					required
					helperText={this.state.invalidData.firstName}
					error={!!this.state.invalidData.firstName}
					onChange={this.onChangeFirstName}
					placeholder={'Введите имя'}
					suggestions={prepareDictionarySuggestions(dictionaryFirstNames)}
				/>

				<Autocomplete
					label={'Отчество'}
					name="middleName"
					placeholder={'Введите отчество'}
					defaultValue={this.props.data.middleName}
					helperText={this.state.invalidData.middleName}
					error={!!this.state.invalidData.middleName}
					onChange={this.onChangeMiddleName}
					suggestions={prepareDictionarySuggestions(filteredDictionaryMiddleName)}
				/>
				<RadioButtonGroup
					title="Пол"
					required={true}
					value={String(this.props.data.gender)}
					values={GENDERS}
					onChange={this.onChangeGender}
				/>
				<TextInput
					required
					name="birthday"
					label="Дата рождения"
					disabled={this.props.disabled}
					defaultValue={this.props.data.birthday}
					type="date"
					error={!!this.state.invalidData.birthday}
					helperText={this.state.invalidData.birthday}
					onBlur={this.onChange}
				/>

				<React.Fragment>
					<TextInput
						required
						name="login"
						minLength={5}
						maxLength={18}
						lang="eng"
						pattern={'[a-z0-9_-]'}
						disabled={this.props.disabled}
						defaultValue={this.props.data.login}
						label="Логин"
						onChange={this.onChangeLogin}
						onBlur={this.onChange}
						error={!!this.state.invalidData.login}
						helperText={this.state.invalidData.login || 'Логин должен быть не менее 5 символов'}
					/>

					<TextInput
						required
						minLength={5}
						lang="eng"
						name="password"
						label="Пароль"
						disabled={this.props.disabled}
						type="password"
						defaultValue={this.props.data.password}
						onBlur={this.onChange}
						error={!!this.state.invalidData.password}
						helperText={this.state.invalidData.password || 'Пароль должен быть не менее 5 символов'}
					/>
					<TextInput
						required
						lang="eng"
						disabled={this.props.disabled}
						type="password"
						label="Подтвердить пароль"
						defaultValue={this.props.data.repeatPassword}
						onBlur={this.onBlurRepeatPassword}
						error={!!this.state.invalidData.repeatPassword}
						helperText={this.state.invalidData.repeatPassword}
					/>
				</React.Fragment>
				<LoadingButton disabled={Object.values(requiredFields).some(Boolean)}>Зарегистрироваться</LoadingButton>
			</form>
		);
	}
}

export default RegisterForm;
