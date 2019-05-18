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
interface IState {
	invalidData: any;
	validation: boolean;
}

class RegisterForm extends React.PureComponent<IProps, IState> {
	static defaultProps = {
		disabled: false,
	};
	// @ts-ignore
	state = {
		...this.props.data,
		invalidData: {},
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
		}
	};
	onChange: React.ChangeEventHandler<HTMLInputElement> = event => {
		const name = event.target.name;
		this.setState({ ...this.state, [name]: inputValueAsString(event) });
	};

	onChangeLogin: React.ChangeEventHandler<HTMLInputElement> = event => {
		this.props.updateForm({ login: inputValueAsString(event) });
	};

	onChangePassword: React.ChangeEventHandler<HTMLInputElement> = event => {
		this.props.updateForm({ password: inputValueAsString(event) });
	};
	onChangeRepeatPassword: React.ChangeEventHandler<HTMLInputElement> = event => {
		this.props.updateForm({ repeatPassword: inputValueAsString(event) });
	};
	onChangeMiddleName = (middleName: string) => {
		this.props.updateForm({ middleName });
	};

	onChangeLastName: React.ChangeEventHandler<HTMLInputElement> = event => {
		this.props.updateForm({ lastName: inputValueAsString(event) });
	};
	onChangeFirstName = (dictionaryFirstNames: IDictionary) => (value: string, index?: number) => {
		const gender =
			index !== undefined ? (dictionaryFirstNames.values[index].sex === 1 ? Gender.Male : Gender.Female) : Gender.None;
		this.props.updateForm({ firstName: value.trim(), gender });
	};
	onChangeGender = (_: any, gender: string) => {
		this.props.updateForm({ gender: gender === '1' ? Gender.Male : Gender.Female });
	};
	onSubmit = () => {
		this.setState({ validation: true });
	};
	render() {
		const { dictionaries } = this.props;
		const dictionaryFirstNames = dictionaries[EDictionaryNameList.FirstNames];
		const dictionaryMiddleNames = dictionaries[EDictionaryNameList.MiddleNames];

		const invalidPassword = this.props.data.password.length > 0 && this.props.data.password.length < 8;
		const invalidLogin = this.props.data.login.length > 0 && this.props.data.login.length < 5;
		const invalidRepeatPassword =
			this.props.data.password.length > 0 &&
			this.props.data.repeatPassword.length > 0 &&
			this.props.data.password !== this.props.data.repeatPassword;

		const filteredDictionaryMiddleName = dictionaryMiddleNames
			? this.props.data.gender
				? {
						values: dictionaryMiddleNames.values.filter((item: { sex: number }) => item.sex === this.props.data.gender),
				  }
				: dictionaryMiddleNames
			: { values: [] };

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
					onBlur={this.onChange}
				/>
				<Autocomplete
					disabled={this.props.disabled}
					label={'Имя'}
					defaultValue={this.props.data.firstName}
					required={true}
					onChange={this.onChangeFirstName(dictionaryFirstNames)}
					placeholder={'Введите имя'}
					suggestions={prepareDictionarySuggestions(dictionaryFirstNames)}
				/>

				<Autocomplete
					disabled={this.props.disabled}
					label={'Отчество'}
					placeholder={'Введите отчество'}
					defaultValue={this.props.data.middleName}
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
						error={invalidLogin}
						helperText={'Логин должен быть не менее 5 символов'}
					/>

					<TextInput
						required
						name="password"
						label="Пароль"
						pattern="[A-Za-z0-9]"
						title="Логин может содержать только латинские буквы и цифры"
						disabled={this.props.disabled}
						type="password"
						defaultValue={this.props.data.password}
						onBlur={this.onChangePassword}
						error={invalidPassword}
						helperText={'Пароль должен быть не менее 8 символов'}
					/>
					<TextInput
						required
						disabled={this.props.disabled}
						type="password"
						label="Подтвердить пароль"
						defaultValue={this.props.data.repeatPassword}
						onBlur={this.onChangeRepeatPassword}
						error={invalidRepeatPassword}
						helperText={invalidRepeatPassword ? 'Пароли не совпадают' : ''}
					/>
				</React.Fragment>
				<LoadingButton>Зарегистрироваться</LoadingButton>
			</form>
		);
	}
}

export default RegisterForm;
