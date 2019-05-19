import React, { ChangeEvent, ReactText } from 'react';
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
	validateField,
	validateRequireTextField,
	validateMinMaxLengthField,
	isUndefined,
	validateTextFieldLang,
	validateTextFieldPattern,
} from '$common';
import { IDictionary, IDictionaryState } from '@mgutm-fcu/dictionary';

import styles from './styles.module.css';

export const GENDERS = [{ value: 1, label: 'Муж.', color: 'primary' }, { value: 2, label: 'Жен.' }];

interface IProps {
	updateForm: (data: Partial<IRegisterForm>) => void;
	dictionaries: IDictionaryState;
	data: IRegisterForm;
	disabled: boolean;
}
interface IState extends IRegisterForm {
	invalidData: Record<keyof IRegisterForm, string>;
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
	validateField: React.ChangeEventHandler<HTMLInputElement> = event => {
		const { validation } = this.state;
		const name = event.target.name;
		const value = inputValueAsString(event);
		const required = event.target.required;
		const maxLength = event.target.maxLength;
		const minLength = event.target.minLength;
		const lang = event.target.lang;
		if (validation) {
			const errorMessage = validateField(event, validateRequireTextField, validateMinMaxLengthField);

			this.setState({
				invalidData: {
					...this.state.invalidData,
					[name]: isUndefined(errorMessage) ? void 0 : errorMessage,
				},
			});
		}
	};
	onChange: React.ChangeEventHandler<HTMLInputElement> = event => {
		const name = event.target.name;
		const errorMessage = validateField(
			event,
			validateRequireTextField,
			validateMinMaxLengthField,
			validateTextFieldLang,
			validateTextFieldPattern,
		);

		this.setState({
			...this.state,
			[name]: inputValueAsString(event),
			invalidData: {
				...this.state.invalidData,
				[name]: errorMessage,
			},
		});
	};

	onChangeFirstName: React.ChangeEventHandler<HTMLInputElement> = event => {
		const firstNamesDictionary = this.props.dictionaries[EDictionaryNameList.FirstNames];
		// const gender =
		// index !== undefined ? (firstNamesDictionary.values[index].sex === 1 ? Gender.Male : Gender.Female) : Gender.None;
		this.props.updateForm({ firstName: inputValueAsString(event) });
	};
	onChangeGender = (_: any, gender: string) => {
		this.props.updateForm({ gender: gender === '1' ? Gender.Male : Gender.Female });
	};
	onBlurRepeatPassword: React.ChangeEventHandler<HTMLInputElement> = event => {
		let repeatPassword = '';
		if (this.state.validation) {
			repeatPassword = inputValueAsString(event) !== this.state.password ? 'Пароли не совпадают' : '';
		}
		this.setState({
			repeatPassword: inputValueAsString(event),
			invalidData: {
				...this.state.invalidData,
				repeatPassword,
			},
		});
	};
	onSubmit = () => {
		const { invalidData, validation, ...formData } = this.state;
		const checkValidation = Object.values(invalidData).some(Boolean);

		if (checkValidation) {
			this.props.updateForm(formData);
		} else {
			this.setState({ validation: true });
		}
	};
	render() {
		const { dictionaries } = this.props;
		const dictionaryFirstNames = dictionaries[EDictionaryNameList.FirstNames];
		const dictionaryMiddleNames = dictionaries[EDictionaryNameList.MiddleNames];

		const filteredDictionaryMiddleName = dictionaryMiddleNames
			? this.props.data.gender
				? {
						values: dictionaryMiddleNames.values.filter((item: { sex: number }) => item.sex === this.props.data.gender),
				  }
				: dictionaryMiddleNames
			: { values: [] };
		console.log('state', this.state);

		return (
			<form onSubmit={this.onSubmit} className="flexColumn">
				<TextInput
					disabled={this.props.disabled}
					name="lastName"
					onChange={this.validateField}
					required
					defaultValue={this.props.data.lastName}
					placeholder={'Введите фамилию'}
					label="Фамилия"
					helperText={this.state.invalidData.lastName}
					error={!!this.state.invalidData.lastName}
					onBlur={this.onChange}
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
					onChange={this.onChange}
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
						pattern={'[a-z0-9_-]'}
						disabled={this.props.disabled}
						defaultValue={this.props.data.login}
						label="Логин"
						onBlur={this.onChange}
						error={!!this.state.invalidData.login}
						helperText={this.state.invalidData.login || 'Логин должен быть не менее 5 символов'}
					/>

					<TextInput
						required
						minLength={5}
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
						disabled={this.props.disabled}
						type="password"
						label="Подтвердить пароль"
						defaultValue={this.props.data.repeatPassword}
						onBlur={this.onBlurRepeatPassword}
						error={!!this.state.invalidData.repeatPassword}
						helperText={this.state.invalidData.repeatPassword}
					/>
				</React.Fragment>
				<LoadingButton>Зарегистрироваться</LoadingButton>
			</form>
		);
	}
}

export default RegisterForm;
