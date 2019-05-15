import React, { FormEventHandler, ReactText } from 'react';
import { Autocomplete, Button, H2, RadioButtonGroup, TextInput, LoadingButton } from '$components';
import {
	EDictionaryNameList,
	Gender,
	inputValueAsString,
	IRegisterForm,
	prepareDictionarySuggestions,
	validateField,
	validateEmptyTextField,
	validateRusTextField,
} from '$common';
import { IDictionary, IDictionaryState } from '@mgutm-fcu/dictionary';

export const GENDERS = [{ value: 1, label: 'Муж.', color: 'primary' }, { value: 2, label: 'Жен.' }];

interface IProps {
	updateForm: (data: Partial<IRegisterForm>) => void;
	dictionaries: IDictionaryState;
	data: IRegisterForm;
	disabled: boolean;
}

interface IState extends IRegisterForm {
	invalidData: Record<keyof IRegisterForm, string | undefined>;
	validation: boolean;
}

class RegisterForm extends React.PureComponent<IProps, IState> {
	static defaultProps = {
		disabled: false,
	};
	// @ts-ignore
	state = {
		invalidData: {
			lastName: void 0,
			middleName: void 0,
			firstName: void 0,
			login: void 0,
			password: void 0,
			repeatPassword: void 0,
			birthday: void 0,
			gender: void 0,
		},
		...this.props.data,
		validation: false,
	};

	validateLastName: React.ChangeEventHandler<HTMLInputElement> = event => {
		const { validation } = this.state;
		const message = validation
			? validateField(inputValueAsString(event), validateEmptyTextField, validateRusTextField)
			: undefined;

		if (validation) {
			this.setState({
				invalidData: {
					...this.state.invalidData,
					lastName: message,
				},
			});
		}
	};
	onChangeBirthday: React.ChangeEventHandler<HTMLInputElement> = event => {
		this.setState({ birthday: inputValueAsString(event) });
	};

	onChangeLogin: React.ChangeEventHandler<HTMLInputElement> = event => {
		this.setState({ login: inputValueAsString(event) });
	};

	onChangePassword: React.ChangeEventHandler<HTMLInputElement> = event => {
		this.setState({ password: inputValueAsString(event) });
	};
	onChangeRepeatPassword: React.ChangeEventHandler<HTMLInputElement> = event => {
		this.setState({ repeatPassword: inputValueAsString(event) });
	};
	onChangeMiddleName = (middleName: string) => {
		this.setState({ middleName });
	};

	onChangeLastName: React.ChangeEventHandler<HTMLInputElement> = event => {
		this.setState({
			lastName: inputValueAsString(event),
		});
	};
	onChangeFirstName = (dictionaryFirstNames: IDictionary) => (value: string, index?: number) => {
		const gender =
			index !== undefined ? (dictionaryFirstNames.values[index].sex === 1 ? Gender.Male : Gender.Female) : Gender.None;
		this.setState({ firstName: value.trim(), gender });
	};
	onChangeGender = (_: any, gender: string) => {
		this.setState({ gender: gender === '1' ? Gender.Male : Gender.Female });
	};
	formValidation = (event: React.FormEvent<EventTarget>) => {
		event.preventDefault();
		const { state } = this;

		const lastName = validateField(state.lastName, validateEmptyTextField, validateRusTextField);

		this.setState({
			validation: true,
			invalidData: {
				...this.state.invalidData,
				lastName,
			},
		});
	};

	render() {
		console.log('invalid', this.state.invalidData);
		const { dictionaries } = this.props;
		const { invalidData } = this.state;
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
			<form onSubmit={this.formValidation} noValidate={true} className="flexColumn">
				<TextInput
					name="lastName"
					onChange={this.validateLastName}
					disabled={this.props.disabled}
					required
					defaultValue={this.props.data.lastName}
					helperText={invalidData.lastName}
					placeholder={'Введите фамилию'}
					label="Фамилия"
					hasError={invalidData.lastName}
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

				<TextInput
					required
					pattern={'[a-z0-9_-]'}
					disabled={this.props.disabled}
					defaultValue={this.props.data.login}
					label="Логин"
					onBlur={this.onChangeLogin}
					hasError={invalidLogin}
					title="Логин может содержать только латинские строчные буквы, цифры, подчеркивание и тире"
					helperText={'Логин должен быть не менее 5 символов'}
				/>

				<TextInput
					required
					label="Пароль"
					pattern="[A-Za-z0-9]"
					title="Логин может содержать только латинские буквы и цифры"
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
				<LoadingButton>Зарегистрироваться</LoadingButton>
			</form>
		);
	}
}

export default RegisterForm;
