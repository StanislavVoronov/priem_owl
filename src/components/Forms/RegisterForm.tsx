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
} from '$common';
import { IDictionary, IDictionaryState } from '@mgutm-fcu/dictionary';

import styles from './styles.module.css';

export const GENDERS = [{ value: 1, label: 'Муж.', color: 'primary' }, { value: 2, label: 'Жен.' }];

interface IProps {
	npId: number;
	checkPersonFetching: boolean;
	dictionaries: IDictionaryState;
	defaultData: IRegisterForm;
	checkLoginError: IServerError | null;
	checkPersonError: IServerError | null;
	submit(data: IRegisterForm): void;
	onCheckLogin(login: ReactText): void;
}

class RegisterForm extends React.PureComponent<IProps, IRegisterForm> {
	public state = { ...this.props.defaultData };
	onChangeBirthday: React.ChangeEventHandler<HTMLInputElement> = event => {
		const birthday = inputValueAsString(event).trim();
		this.setState(state => ({
			...state,
			birthday,
		}));
	};

	onChangeLoginField: React.ChangeEventHandler<HTMLInputElement> = event => {
		const login = inputValueAsString(event).trim();
		this.setState(state => ({
			...state,
			login,
		}));

		this.props.onCheckLogin(login);
	};

	onChangePasswordField: React.ChangeEventHandler<HTMLInputElement> = event => {
		const password = inputValueAsString(event).trim();
		this.setState(state => ({
			...state,
			password,
		}));
	};
	onChangeRepeatPasswordField: React.ChangeEventHandler<HTMLInputElement> = event => {
		const repeatPassword = inputValueAsString(event).trim();
		this.setState(state => ({
			...state,
			repeatPassword,
		}));
	};
	onChangeMiddleName = (middleName: string) => {
		this.setState(state => ({
			...state,
			middleName,
		}));
	};

	onChangeLastName: React.ChangeEventHandler<HTMLInputElement> = event => {
		const lastName = inputValueAsString(event).trim();
		this.setState(state => ({
			...state,
			lastName,
		}));
	};
	onChangeFirstName = (dictionaryFirstNames: IDictionary) => (value: string, index?: number) => {
		this.setState(state => ({
			...state,
			firstName: value,
			gender:
				index !== undefined
					? dictionaryFirstNames.values[index].sex === 1
						? Gender.Male
						: Gender.Female
					: Gender.None,
		}));
	};
	public onChangeGender = (_: any, gender: string) => {
		this.setState(state => ({
			...state,
			gender: gender === '1' ? Gender.Male : Gender.Female,
		}));
	};

	submit = () => {
		this.props.submit(this.state);
	};
	public render() {
		const { dictionaries } = this.props;
		const dictionaryFirstNames = dictionaries[EDictionaryNameList.FirstNames];
		const dictionaryMiddleNames = dictionaries[EDictionaryNameList.MiddleNames];
		const inValidLogin = this.state.login.length > 0 && this.state.login.length < 8;
		const inValidPassword = this.state.password.length > 0 && this.state.password.length < 10;
		const inValidRepeatPassword =
			!inValidLogin && this.state.repeatPassword.length ? this.state.repeatPassword !== this.state.password : false;
		console.log('inValidRepeatPassword', inValidRepeatPassword);
		const filteredDictionaryMiddleName = dictionaryMiddleNames
			? this.state.gender
				? {
						values: dictionaryMiddleNames.values.filter((item: { sex: number }) => item.sex === this.state.gender),
				  }
				: dictionaryMiddleNames
			: { values: [] };

		const { middleName, ...rest } = this.state;

		const invalidForm =
			!validateDataForm(rest) ||
			inValidRepeatPassword ||
			inValidPassword ||
			!!this.props.checkLoginError ||
			inValidLogin;

		return (
			<div className={styles.flexColumn}>
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
						hasError={!!this.props.checkLoginError || inValidLogin}
						helperText={
							this.props.checkLoginError ? this.props.checkLoginError.message : 'Логин должен быть не менее 8 символов'
						}
					/>

					<TextInput
						required={true}
						label="Пароль"
						type="password"
						defaultValue={this.props.defaultData.password}
						onBlur={this.onChangePasswordField}
						hasError={inValidPassword}
						helperText={'Пароль должен быть не менее 10 символов'}
					/>
					<TextInput
						required={true}
						type="password"
						label="Подтвердить пароль"
						defaultValue={this.props.defaultData.repeatPassword}
						onBlur={this.onChangeRepeatPasswordField}
						hasError={inValidRepeatPassword}
						helperText={inValidRepeatPassword ? 'Пароли не совпадают' : ''}
					/>
				</React.Fragment>
				{this.props.checkPersonError && <H2 color="red">{this.props.checkPersonError.message}</H2>}

				<LoadingButton disabled={invalidForm} loading={this.props.checkPersonFetching} onClick={this.submit}>
					Зарегистрироваться
				</LoadingButton>
			</div>
		);
	}
}

export default RegisterForm;
