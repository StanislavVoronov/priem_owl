import React, { ChangeEvent, FormEventHandler } from 'react';
import { Autocomplete, RadioButtonGroup, TextInput, LoadingButton } from '$components';
import {
	EDictionaryNameList,
	Gender,
	IEnrollRegisterForm,
	prepareDictionarySuggestions,
	validateRequireTextField,
	validateTextFieldLang,
} from '$common';
import { DictionaryState } from '@mgutm-fcu/dictionary';

export const GENDERS = [{ value: 1, label: 'Муж.', color: 'primary' }, { value: 2, label: 'Жен.' }];

interface IProps extends IEnrollRegisterForm {
	updateTextInput: (event: ChangeEvent<HTMLInputElement>) => void;
	dictionaries: DictionaryState;
}

class EnrollRegistrationView extends React.PureComponent<IProps> {
	static defaultProps = {
		disabled: false,
	};

	onBlurTextInput: React.ChangeEventHandler<HTMLInputElement> = event => {
		this.props.updateTextInput(event);
	};
	onChangeTextInput: React.ChangeEventHandler<HTMLInputElement> = event => {
		if (this.props.statusValidation) {
			this.onBlurTextInput(event);
		}
	};
	onChangeMiddleName = (value: string) => {
		return void 0;
	};
	onChangeFirstName = (firstName: string) => {
		const firstNameError = validateRequireTextField(firstName, true) || validateTextFieldLang(firstName, 'rus');

		const firstNamesDictionary = this.props.dictionaries[EDictionaryNameList.FirstNames];
		const person = firstNamesDictionary.values.find(item => item.name === firstName);
		const gender = person ? (person.sex === '1' ? Gender.Male : Gender.Female) : Gender.None;
	};
	onChangeGender = (_: any, gender: string) => {
		return void 0;
	};
	onBlurRepeatPassword: React.ChangeEventHandler<HTMLInputElement> = event => {
		this.props.updateTextInput(event);
	};
	onSubmit: FormEventHandler<HTMLFormElement> = event => {
		// event.preventDefault();
		// const { invalidData, validation, middleName, ...requiredFields } = this.state;
		// let validationFields: Record<keyof IEnrollRegisterForm, string> = {
		// 	lastName: '',
		// 	middleName: '',
		// 	firstName: '',
		// 	birthday: '',
		// 	gender: '',
		// 	login: '',
		// 	password: '',
		// 	repeatPassword: '',
		// };
		// Object.entries(requiredFields).forEach((values: string[]) => {
		// 	validationFields = {
		// 		...validationFields,
		// 		[values[0]]: validateRequireTextField(values[1], true),
		// 	};
		// });
		//
		// if (Object.values(validationFields).some(Boolean)) {
		// 	this.setState({ validation: true, invalidData: validationFields });
		// } else {
		// 	this.props.updateForm({ middleName, ...requiredFields });
		// }
	};
	onChangeTextInputLogin: React.ChangeEventHandler<HTMLInputElement> = event => {
		// eventconst login =
		// 	validateTextInput(event) ||
		// 	validateMinMaxLengthField(inputValueAsString(event), event.target.minLength, event.target.maxLength);
		// this.setState({
		// 	login: inputValueAsString(event),
		// 	invalidData: {
		// 		...this.props.validation,
		// 		login,
		// 	},
		// });
	};
	render() {
		const { dictionaries } = this.props;
		const dictionaryFirstNames = dictionaries[EDictionaryNameList.FirstNames];
		const dictionaryMiddleNames = dictionaries[EDictionaryNameList.MiddleNames];

		const filteredDictionaryMiddleName = dictionaryMiddleNames
			? this.props.data.gender
				? {
						values: dictionaryMiddleNames.values.filter((item: { sex: number }) => item.sex === this.props.data.gender),
				  }
				: dictionaryMiddleNames
			: { values: [] };

		return (
			<form onSubmit={this.onSubmit} className="flexColumn" noValidate={true}>
				<TextInput
					name="lastName"
					onChange={this.onChangeTextInput}
					required
					defaultValue={this.props.data.lastName}
					placeholder={'Введите фамилию'}
					label="Фамилия"
					helperText={this.props.validation.lastName}
					error={!!this.props.validation.lastName}
					onBlur={this.onBlurTextInput}
				/>
				<Autocomplete
					label={'Имя'}
					defaultValue={this.props.data.firstName}
					required
					helperText={this.props.validation.firstName}
					error={!!this.props.validation.firstName}
					onChange={this.onChangeFirstName}
					placeholder={'Введите имя'}
					suggestions={prepareDictionarySuggestions(dictionaryFirstNames)}
				/>

				<Autocomplete
					label={'Отчество'}
					name="middleName"
					placeholder={'Введите отчество'}
					defaultValue={this.props.data.middleName}
					helperText={this.props.validation.middleName}
					error={!!this.props.validation.middleName}
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
					defaultValue={this.props.data.birthday}
					type="date"
					error={!!this.props.validation.birthday}
					helperText={this.props.validation.birthday}
					onBlur={this.onChangeTextInput}
				/>

				<React.Fragment>
					<TextInput
						required
						name="login"
						minLength={5}
						maxLength={20}
						pattern={'[a-z0-9_-]'}
						defaultValue={this.props.data.login}
						label="Логин"
						onChange={this.onChangeTextInputLogin}
						error={!!this.props.validation.login}
						helperText={this.props.validation.login || 'Логин должен быть не менее 5 символов'}
					/>

					<TextInput
						required
						minLength={5}
						pattern={'[a-z0-9_-]'}
						name="password"
						label="Пароль"
						type="password"
						defaultValue={this.props.data.password}
						onChange={this.onChangeTextInput}
						error={!!this.props.validation.password}
						helperText={this.props.validation.password || 'Пароль должен быть не менее 5 символов'}
					/>
					<TextInput
						required
						lang="eng"
						type="password"
						label="Подтвердить пароль"
						defaultValue={this.props.data.repeatPassword}
						onBlur={this.onBlurRepeatPassword}
						error={!!this.props.validation.repeatPassword}
						helperText={this.props.validation.repeatPassword}
					/>
				</React.Fragment>
				<LoadingButton>Зарегистрироваться</LoadingButton>
			</form>
		);
	}
}

export default EnrollRegistrationView;
