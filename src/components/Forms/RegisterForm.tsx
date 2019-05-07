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
} from '$common';
import { IDictionary, IDictionaryState } from '@mgutm-fcu/dictionary';

import styles from './styles.module.css';

export const GENDERS = [{ value: 1, label: 'Муж.', color: 'primary' }, { value: 2, label: 'Жен.' }];

interface IProps {
	updateForm: <T>(field: keyof IRegisterForm, value: T) => void;
	dictionaries: IDictionaryState;
	defaultData: IRegisterForm;
	invalidData: Partial<IRegisterForm>;
}

class RegisterForm extends React.PureComponent<IProps, IRegisterForm> {
	public state = { ...this.props.defaultData };

	onChangeBirthday: React.ChangeEventHandler<HTMLInputElement> = event => {
		const birthday = inputValueAsString(event).trim();

		this.props.updateForm('birthday', birthday);
	};

	onChangeLoginField: React.ChangeEventHandler<HTMLInputElement> = event => {
		const login = inputValueAsString(event).trim();

		this.props.updateForm('login', login);
	};

	onChangePasswordField: React.ChangeEventHandler<HTMLInputElement> = event => {
		const password = inputValueAsString(event).trim();

		this.props.updateForm('password', password);
	};
	onChangeRepeatPasswordField: React.ChangeEventHandler<HTMLInputElement> = event => {
		const repeatPassword = inputValueAsString(event).trim();

		this.props.updateForm('repeatPassword', repeatPassword);
	};
	onChangeMiddleName = (middleName: string) => {
		this.props.updateForm('middleName', middleName);
	};

	onChangeLastName: React.ChangeEventHandler<HTMLInputElement> = event => {
		const lastName = inputValueAsString(event).trim();
		this.props.updateForm('lastName', lastName);
	};
	onChangeFirstName = (dictionaryFirstNames: IDictionary) => (value: string, index?: number) => {
		const gender =
			index !== undefined ? (dictionaryFirstNames.values[index].sex === 1 ? Gender.Male : Gender.Female) : Gender.None;
		this.props.updateForm('firstName', value);
		this.props.updateForm('gender', gender);
	};
	onChangeGender = (_: any, gender: string) => {
		this.props.updateForm('gender', gender === '1' ? Gender.Male : Gender.Female);
	};

	render() {
		const { dictionaries } = this.props;
		const dictionaryFirstNames = dictionaries[EDictionaryNameList.FirstNames];
		const dictionaryMiddleNames = dictionaries[EDictionaryNameList.MiddleNames];

		const filteredDictionaryMiddleName = dictionaryMiddleNames
			? this.state.gender
				? {
						values: dictionaryMiddleNames.values.filter((item: { sex: number }) => item.sex === this.state.gender),
				  }
				: dictionaryMiddleNames
			: { values: [] };

		const { middleName, ...rest } = this.state;

		return (
			<div className="flexColumn">
				<TextInput
					required
					defaultValue={this.state.lastName}
					placeholder={'Введите фамилию'}
					label="Фамилия"
					onBlur={this.onChangeLastName}
				/>
				<Autocomplete
					label={'Имя'}
					defaultValue={this.state.firstName}
					required={true}
					onChange={this.onChangeFirstName(dictionaryFirstNames)}
					placeholder={'Введите имя'}
					suggestions={prepareDictionarySuggestions(dictionaryFirstNames)}
				/>

				<Autocomplete
					label={'Отчество'}
					placeholder={'Введите отчество'}
					defaultValue={this.state.middleName}
					onChange={this.onChangeMiddleName}
					suggestions={prepareDictionarySuggestions(filteredDictionaryMiddleName)}
				/>

				<RadioButtonGroup
					title="Пол"
					required={true}
					currentValue={String(this.state.gender)}
					values={GENDERS}
					onChange={this.onChangeGender}
				/>
				<TextInput
					required={true}
					label="Дата рождения"
					defaultValue={this.state.birthday}
					type="date"
					onBlur={this.onChangeBirthday}
				/>

				<React.Fragment>
					<TextInput
						required={true}
						regExp={'[a-zA-z0-9]'}
						defaultValue={this.state.login}
						label="Логин"
						onChange={this.onChangeLoginField}
						hasError={!!this.props.invalidData.login}
						helperText={this.props.invalidData.login || 'Логин должен быть не менее 7 символов'}
					/>

					<TextInput
						required={true}
						label="Пароль"
						type="password"
						defaultValue={this.props.defaultData.password}
						onBlur={this.onChangePasswordField}
						hasError={!!this.props.invalidData.password}
						helperText={this.props.invalidData.password || 'Пароль должен быть не менее 10 символов'}
					/>
					<TextInput
						required={true}
						type="password"
						label="Подтвердить пароль"
						defaultValue={this.props.defaultData.repeatPassword}
						onBlur={this.onChangeRepeatPasswordField}
						hasError={!!this.props.invalidData.repeatPassword}
						helperText={this.props.invalidData.repeatPassword}
					/>
				</React.Fragment>
			</div>
		);
	}
}

export default RegisterForm;
