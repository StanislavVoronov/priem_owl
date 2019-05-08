import React, { ReactText } from 'react';
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

class RegisterForm extends React.PureComponent<IProps> {
	static defaultProps = {
		disabled: false,
	};

	onChangeBirthday: React.ChangeEventHandler<HTMLInputElement> = event => {
		this.props.updateForm({ birthday: inputValueAsString(event) });
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

	render() {
		const { dictionaries } = this.props;
		const dictionaryFirstNames = dictionaries[EDictionaryNameList.FirstNames];
		const dictionaryMiddleNames = dictionaries[EDictionaryNameList.MiddleNames];

		const invalidPassword = this.props.data.password.length > 0 && this.props.data.password.length < 8;
		const invalidLogin = this.props.data.login.length > 0 && this.props.data.login.length < 5;
		const invalidRepeatPassword =
			this.props.data.password.length > 0 && this.props.data.password !== this.props.data.repeatPassword;

		const filteredDictionaryMiddleName = dictionaryMiddleNames
			? this.props.data.gender
				? {
						values: dictionaryMiddleNames.values.filter((item: { sex: number }) => item.sex === this.props.data.gender),
				  }
				: dictionaryMiddleNames
			: { values: [] };

		return (
			<div className="flexColumn">
				<TextInput
					disabled={this.props.disabled}
					required
					defaultValue={this.props.data.lastName}
					placeholder={'Введите фамилию'}
					label="Фамилия"
					onBlur={this.onChangeLastName}
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
					required={true}
					label="Дата рождения"
					disabled={this.props.disabled}
					defaultValue={this.props.data.birthday}
					type="date"
					onBlur={this.onChangeBirthday}
				/>

				<React.Fragment>
					<TextInput
						required
						regExp={'[a-zA-z0-9]'}
						disabled={this.props.disabled}
						defaultValue={this.props.data.login}
						label="Логин"
						onChange={this.onChangeLogin}
						hasError={invalidLogin}
						helperText={'Логин должен быть не менее 5 символов'}
					/>

					<TextInput
						required
						label="Пароль"
						disabled={this.props.disabled}
						type="password"
						defaultValue={this.props.data.password}
						onBlur={this.onChangePassword}
						hasError={invalidPassword}
						helperText={'Пароль должен быть не менее 8 символов'}
					/>
					<TextInput
						required
						disabled={this.props.disabled}
						type="password"
						label="Подтвердить пароль"
						defaultValue={this.props.data.repeatPassword}
						onBlur={this.onChangeRepeatPassword}
						hasError={invalidRepeatPassword}
						helperText={invalidRepeatPassword ? 'Пароли не совпадают' : ''}
					/>
				</React.Fragment>
			</div>
		);
	}
}

export default RegisterForm;
