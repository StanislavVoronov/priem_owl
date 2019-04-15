import TextInput from '../../../platform/Input/TextInput';
import React from 'react';
import { Autocomplete, Button, H2, RadioGroup } from '../../../platform';
import { EDictionaryNameList, Gender, inValidateDataForm, IRootState, makeVerticalSpace } from '../../../common';
import { IDictionary } from '@mgutm-fcu/dictionary';
import { IRegisterDataForm, PersonInfo } from '../models';

import { IServerError } from '../serverModels';
import styles from '../styles/common.css';

import { defaultRegisterDataForm } from '../defaults';

const prepareDictionarySuggestions = (dictionary: IDictionary) => {
	if (!dictionary || !Array.isArray(dictionary.values)) {
		return [];
	}
	return dictionary.values.map((item: any) => item.name);
};
interface IProps {
	dictionaries: Record<string, IDictionary>;
	submit(data: IRegisterDataForm): void;
	checkPersonExist(data: PersonInfo): Promise<boolean>;
	registerNewPerson(login: string, password: string): Promise<number>;
	checkPersonLogin(login: string): void;
}

const GENDERS = [{ value: 1, label: 'Муж.', color: 'primary' }, { value: 2, label: 'Жен.' }];

interface IState extends IRegisterDataForm {
	personExists: boolean;
}
class RegisterDataForm extends React.PureComponent<IProps, IState> {
	public state = { ...defaultRegisterDataForm, personExists: false };
	public onChangeTextField = (name: string) => (value: string) => {
		this.setState(
			state => ({
				...state,
				[name]: value,
			}),
			this.checkPersonExist,
		);
	};
	onChangeLoginField = (value: string) => {
		this.setState(state => ({
			...state,
			login: value,
		}));

		this.props.checkPersonLogin(value);
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
	public checkPersonExist = () => {
		const { firstName, lastName, gender, birthday, middleName } = this.state;

		if (firstName && lastName && birthday && gender) {
			this.props.checkPersonExist({ firstName, lastName, birthday, middleName });
		}
	};
	submit = () => {
		this.props.registerNewPerson(this.state.login, this.state.password).then(npId => {
			const { lastName, middleName, firstName, birthday } = this.state;
			this.props.checkPersonExist({ lastName, firstName, middleName, birthday }).then((exists: boolean) => {
				if (exists) {
					this.setState({ personExists: true });
				} else {
					this.props.submit(this.state);
				}
			});
		});
	};
	public render() {
		const dictionaryFirstNames = this.props.dictionaries[EDictionaryNameList.FirstNames];
		const dictionaryMiddleNames = this.props.dictionaries[EDictionaryNameList.MiddleNames];

		const inValidPassword = this.state.password.length > 0 && this.state.password.length < 7;
		const inValidRepeatPassword =
			this.state.password.length && this.state.repeatPassword.length
				? this.state.repeatPassword != this.state.password
				: false;
		const filteredDictionaryMiddleName = this.state.gender
			? { values: dictionaryMiddleNames.values.filter((item: any) => item.sex == this.state.gender) }
			: dictionaryMiddleNames;
		const { middleName, ...rest } = this.state;
		const isValidForm =
			inValidateDataForm(rest) || inValidRepeatPassword || inValidPassword || !!this.props.checkPersonLoginError;

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
				<TextInput required={true} label="Дата рождения" type="date" onBlur={this.onChangeTextField('birthday')} />

				<React.Fragment>
					<TextInput
						required={true}
						regExp={'[a-zA-z0-9]'}
						label="Логин"
						onChange={this.onChangeLoginField}
						hasError={!!this.props.checkPersonLoginError}
						helperText={
							this.props.checkPersonLoginError
								? this.props.checkPersonLoginError.message
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
					{!this.state.personExists ? (
						<H2>Абитуриент уже зарегистрирован в системе</H2>
					) : (
						<Button variant="contained" color="primary" disabled={isValidForm} onClick={this.submit}>
							{'Далее'}
						</Button>
					)}
				</div>
			</div>
		);
	}
}

export default RegisterDataForm;
