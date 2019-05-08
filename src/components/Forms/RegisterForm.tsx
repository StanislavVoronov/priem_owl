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
	updateForm: (data: IRegisterForm) => void;
	dictionaries: IDictionaryState;
	defaultData: IRegisterForm;
	invalidData: Record<keyof IRegisterForm, string>;
	disabled: boolean;
}

class RegisterForm extends React.PureComponent<IProps, IRegisterForm> {
	static defaultProps = {
		disabled: false,
	};
	state = this.props.defaultData;
	updateForm = () => {
		this.props.updateForm(this.state);
	};
	onChangeBirthday: React.ChangeEventHandler<HTMLInputElement> = event => {
		this.setState({ birthday: inputValueAsString(event) }, this.updateForm);
	};

	onChangeLoginField: React.ChangeEventHandler<HTMLInputElement> = event => {
		this.setState({ login: inputValueAsString(event) }, this.updateForm);
	};

	onChangePasswordField: React.ChangeEventHandler<HTMLInputElement> = event => {
		this.setState({ password: inputValueAsString(event) }, this.updateForm);
	};
	onChangeRepeatPasswordField: React.ChangeEventHandler<HTMLInputElement> = event => {
		this.setState({ repeatPassword: inputValueAsString(event) }, this.updateForm);
	};
	onChangeMiddleName = (middleName: string) => {
		this.setState({ middleName }, this.updateForm);
	};

	onChangeLastName: React.ChangeEventHandler<HTMLInputElement> = event => {
		this.setState({ lastName: inputValueAsString(event) }, this.updateForm);
	};
	onChangeFirstName = (dictionaryFirstNames: IDictionary) => (value: string, index?: number) => {
		const gender =
			index !== undefined ? (dictionaryFirstNames.values[index].sex === 1 ? Gender.Male : Gender.Female) : Gender.None;
		this.setState({ firstName: value.trim(), gender }, this.updateForm);
	};
	onChangeGender = (_: any, gender: string) => {
		this.setState({ gender: gender === '1' ? Gender.Male : Gender.Female }, this.updateForm);
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
					disabled={this.props.disabled}
					required
					defaultValue={this.state.lastName}
					placeholder={'Введите фамилию'}
					label="Фамилия"
					onBlur={this.onChangeLastName}
				/>
				<Autocomplete
					disabled={this.props.disabled}
					label={'Имя'}
					defaultValue={this.state.firstName}
					required={true}
					onChange={this.onChangeFirstName(dictionaryFirstNames)}
					placeholder={'Введите имя'}
					suggestions={prepareDictionarySuggestions(dictionaryFirstNames)}
				/>

				<Autocomplete
					disabled={this.props.disabled}
					label={'Отчество'}
					placeholder={'Введите отчество'}
					defaultValue={this.state.middleName}
					onChange={this.onChangeMiddleName}
					suggestions={prepareDictionarySuggestions(filteredDictionaryMiddleName)}
				/>

				<RadioButtonGroup
					title="Пол"
					required={true}
					value={String(this.state.gender)}
					values={GENDERS}
					onChange={this.onChangeGender}
				/>
				<TextInput
					required={true}
					label="Дата рождения"
					disabled={this.props.disabled}
					defaultValue={this.state.birthday}
					type="date"
					onBlur={this.onChangeBirthday}
				/>

				<React.Fragment>
					<TextInput
						required
						regExp={'[a-zA-z0-9]'}
						disabled={this.props.disabled}
						defaultValue={this.state.login}
						label="Логин"
						onChange={this.onChangeLoginField}
						hasError={!!this.props.invalidData.login}
						helperText={this.props.invalidData.password || 'Логин должен быть не менее 7 символов'}
					/>

					<TextInput
						required
						label="Пароль"
						disabled={this.props.disabled}
						type="password"
						defaultValue={this.props.defaultData.password}
						onBlur={this.onChangePasswordField}
						hasError={!!this.props.invalidData.password}
						helperText={'Пароль должен быть не менее 7 символов'}
					/>
					<TextInput
						required
						disabled={this.props.disabled}
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
