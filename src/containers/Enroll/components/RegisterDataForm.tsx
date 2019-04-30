import React, { ReactText } from 'react';
import { Autocomplete, Button, H2, RadioButtonGroup, TextInput } from '$components';
import {
	EDictionaryNameList,
	Gender,
	inputValueAsString,
	inValidateDataForm,
	prepareDictionarySuggestions,
} from '$common';
import { IDictionary } from '@mgutm-fcu/dictionary';
import { IRegisterDataForm } from '../models';

import styles from './styles.module.css';
import { IServerError } from '../serverModels';
import { GENDERS } from '../constants';
import { DictionaryContext } from '../EnrollContainer';

interface IProps {
	defaultData: IRegisterDataForm;
	checkLoginError: IServerError | null;
	checkPersonError: IServerError | null;
	submit(data: IRegisterDataForm): void;
	onCheckLogin(login: ReactText): void;
}
function test<T>(value: T): T {
	return value;
}

class RegisterDataForm extends React.PureComponent<IProps, IRegisterDataForm> {
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
		return (
			<DictionaryContext.Consumer>
				{dictionaries => {
					const dictionaryFirstNames = dictionaries[EDictionaryNameList.FirstNames];
					const dictionaryMiddleNames = dictionaries[EDictionaryNameList.MiddleNames];
					const inValidLogin = this.state.login.length > 0 && this.state.login.length < 5;
					const inValidPassword = this.state.password.length > 0 && this.state.password.length < 7;
					const inValidRepeatPassword =
						!inValidLogin && this.state.repeatPassword.length
							? this.state.repeatPassword !== this.state.password
							: false;
					console.log('inValidRepeatPassword', inValidRepeatPassword);
					const filteredDictionaryMiddleName = dictionaryMiddleNames
						? this.state.gender
							? {
									values: dictionaryMiddleNames.values.filter(
										(item: { sex: number }) => item.sex === this.state.gender,
									),
							  }
							: dictionaryMiddleNames
						: [];

					const { middleName, ...rest } = this.state;
					const isInvalidForm =
						inValidateDataForm(rest) ||
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
										this.props.checkLoginError
											? this.props.checkLoginError.message
											: 'Логин должен быть не менее 5 символов'
									}
								/>

								<TextInput
									required={true}
									label="Пароль"
									type="password"
									defaultValue={this.props.defaultData.password}
									onBlur={this.onChangePasswordField}
									hasError={inValidPassword}
									helperText={'Пароль должен быть не менее 7 символов'}
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
							<div className={styles.nextButtonContainer}>
								<Button variant="contained" color="primary" disabled={isInvalidForm} onClick={this.submit}>
									{'Зарегистрироваться'}
								</Button>
							</div>
						</div>
					);
				}}
			</DictionaryContext.Consumer>
		);
	}
}

export default RegisterDataForm;
