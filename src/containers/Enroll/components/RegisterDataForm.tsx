import React, { ReactText } from 'react';
import { Autocomplete, Button, H2, TextInput, RadioButtonGroup } from '$components';
import {
	EDictionaryNameList,
	Gender,
	inValidateDataForm,
	prepareDictionarySuggestions,
	inputValueAsString,
} from '$common';
import { IDictionary } from '@mgutm-fcu/dictionary';
import { IRegisterDataForm } from '../models';

import styles from './styles.module.css';
import { IServerError } from '../serverModels';
import { GENDERS } from '../constants';
import { DictionaryContext } from '../EnrollContainer';
import { string } from 'prop-types';

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
		this.setState(state => ({
			...state,
			birthday: inputValueAsString(event),
		}));
	};

	onChangeLoginField: React.ChangeEventHandler<HTMLInputElement> = event => {
		const value = inputValueAsString(event);
		this.setState(state => ({
			...state,
			login: value,
		}));

		this.props.onCheckLogin(value);
	};

	onChangePasswordField: React.ChangeEventHandler<HTMLInputElement> = event => {
		this.setState(state => ({
			...state,
			password: inputValueAsString(event),
		}));
	};
	onChangeRepeatPasswordField: React.ChangeEventHandler<HTMLInputElement> = event => {
		this.setState(state => ({
			...state,
			repeatPassword: inputValueAsString(event),
		}));
	};
	onChangeMiddleName = (middleName: string) => {
		this.setState(state => ({
			...state,
			middleName,
		}));
	};

	onChangeLastName: React.ChangeEventHandler<HTMLInputElement> = event => {
		this.setState(state => ({
			...state,
			lastName: inputValueAsString(event),
		}));
	};
	onChangeFirstName = (dictionaryFirstNames: IDictionary) => (value: string, index?: number) => {
		this.setState(state => ({
			...state,
			firstName: value,
			gender: index !== undefined ? dictionaryFirstNames.values[index].sex.toString() : '',
		}));
	};
	public onChangeGender = (event: any, gender: string) => {
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
										(item: { sex: Gender }) => item.sex === this.state.gender,
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
								defaultValue={this.props.defaultData.lastName}
								placeholder={'Введите фамилию'}
								label="Фамилия"
								onBlur={this.onChangeLastName}
							/>
							<Autocomplete
								label={'Имя'}
								defaultValue={this.props.defaultData.firstName}
								required={true}
								onChange={this.onChangeFirstName(dictionaryFirstNames)}
								placeholder={'Введите имя'}
								suggestions={prepareDictionarySuggestions(dictionaryFirstNames)}
							/>

							<Autocomplete
								label={'Отчество'}
								placeholder={'Введите отчество'}
								defaultValue={this.props.defaultData.middleName}
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
								defaultValue={this.props.defaultData.birthday}
								type="date"
								onBlur={this.onChangeBirthday}
							/>

							<React.Fragment>
								<TextInput
									required={true}
									regExp={'[a-zA-z0-9]'}
									defaultValue={this.props.defaultData.login}
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
