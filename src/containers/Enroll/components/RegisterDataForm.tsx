import React from 'react';
import { Autocomplete, Button, H2, TextInput, RadioGroup } from '../../../platform';
import { EDictionaryNameList, Gender, inValidateDataForm, makeVerticalSpace } from '../../../common';
import { IDictionary } from '@mgutm-fcu/dictionary';
import { IRegisterDataForm } from '../models';

import styles from '../styles/common.css';

import { defaultRegisterDataForm } from '../defaults';
import { IServerError } from '../serverModels';
import { GENDERS } from '../constants';
import { DictionaryContext } from '../EnrollContainer';
const prepareDictionarySuggestions = (dictionary: { values: any[] }) => {
	if (!dictionary || !Array.isArray(dictionary.values)) {
		return [];
	}
	return dictionary.values.map((item: any) => item.name);
};
interface IProps {
	submit(data: IRegisterDataForm): void;
	onCheckLogin(login: string): void;
	checkLoginError: IServerError | null;
	checkPersonError: IServerError | null;
	personExists: boolean;
}

interface IState extends IRegisterDataForm {}
class RegisterDataForm extends React.PureComponent<IProps, IState> {
	public state = { ...defaultRegisterDataForm };
	public onChangeTextField = (name: string) => (value: string) => {
		this.setState(state => ({
			...state,
			[name]: value,
		}));
	};
	onChangeLoginField = (value: string) => {
		this.setState(state => ({
			...state,
			login: value,
		}));

		this.props.onCheckLogin(value);
	};
	onChangePasswordField = (value: string) => {
		this.setState(state => ({
			...state,
			password: value,
		}));
	};
	onChangeRepeatPasswordField = (value: string) => {
		this.setState(state => ({
			...state,
			repeatPassword: value,
		}));
	};
	public onChangeFirstName = (dictionaryFirstNames: IDictionary) => (value: string, index?: number) => {
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

					const inValidPassword = this.state.password.length > 0 && this.state.password.length < 7;
					const inValidRepeatPassword =
						this.state.password.length && this.state.repeatPassword.length
							? this.state.repeatPassword != this.state.password
							: false;
					const filteredDictionaryMiddleName = dictionaryMiddleNames
						? this.state.gender
							? dictionaryMiddleNames.values.filter((item: { sex: Gender }) => item.sex == this.state.gender)
							: dictionaryMiddleNames.values
						: [];

					const { middleName, ...rest } = this.state;
					const isValidForm =
						inValidateDataForm(rest) || inValidRepeatPassword || inValidPassword || !!this.props.checkLoginError;

					return (
						<div className={styles.flexColumn}>
							<TextInput
								required={true}
								placeholder={'Введите фамилию'}
								label="Фамилия"
								onBlur={this.onChangeTextField('lastName')}
							/>
							<Autocomplete
								label={'Имя'}
								required={true}
								onChange={this.onChangeFirstName(dictionaryFirstNames)}
								placeholder={'Введите имя'}
								style={makeVerticalSpace('small')}
								suggestions={prepareDictionarySuggestions(dictionaryFirstNames)}
							/>

							<Autocomplete
								label={'Отчество'}
								placeholder={'Введите отчество'}
								onChange={this.onChangeTextField('middleName')}
								style={makeVerticalSpace('small')}
								suggestions={prepareDictionarySuggestions(filteredDictionaryMiddleName)}
							/>

							<RadioGroup
								title="Пол"
								required={true}
								currentValue={String(this.state.gender)}
								values={GENDERS}
								onChange={this.onChangeGender}
							/>
							<TextInput
								required={true}
								label="Дата рождения"
								type="date"
								onBlur={this.onChangeTextField('birthday')}
							/>

							<React.Fragment>
								<TextInput
									required={true}
									regExp={'[a-zA-z0-9]'}
									label="Логин"
									onChange={this.onChangeLoginField}
									hasError={!!this.props.checkLoginError}
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
									onBlur={this.onChangePasswordField}
									hasError={inValidPassword}
									helperText={'Пароль должен быть не менее 7 символов'}
								/>
								<TextInput
									required={true}
									type="password"
									label="Подтвердить пароль"
									onBlur={this.onChangeRepeatPasswordField}
									hasError={inValidRepeatPassword}
									helperText={inValidRepeatPassword ? 'Пароли не совпадают' : ''}
								/>
							</React.Fragment>
							<div className="nextButtonContainer">
								{this.props.personExists ? (
									<H2 color="red">Абитуриент уже зарегистрирован в системе</H2>
								) : (
									<Button variant="contained" color="primary" disabled={isValidForm} onClick={this.submit}>
										{'Далее'}
									</Button>
								)}
							</div>
						</div>
					);
				}}
			</DictionaryContext.Consumer>
		);
	}
}

export default RegisterDataForm;
