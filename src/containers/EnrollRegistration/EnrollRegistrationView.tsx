import React, { ChangeEvent, FormEventHandler } from 'react';
import { Autocomplete, RadioButtonGroup, TextInput, LoadingButton } from '$components';
import {
	EDictionaryNameList,
	IEnrollRegisterStateForm,
	IEnrollRegistration,
	IInvalidData,
	prepareDictionarySuggestions,
} from '$common';
import { DictionaryState } from '@mgutm-fcu/dictionary';

export const GENDERS = [{ value: 1, label: 'Муж.', color: 'primary' }, { value: 2, label: 'Жен.' }];

interface IProps {
	data: IEnrollRegistration;
	validation: IInvalidData<IEnrollRegistration>;
	onChangeTextInput: (event: ChangeEvent<HTMLInputElement>) => void;
	dictionaries: DictionaryState;
	onChangeMiddleName: (value: string) => void;
	onChangeGender: (value: number) => void;
	onChangeFirstName: (value: string) => void;
	onBlurTextInput: (event: ChangeEvent<HTMLInputElement>) => void;
	onChangeLogin: (event: ChangeEvent<HTMLInputElement>) => void;
	isUniqueLogin: boolean;
	submit: () => void;
}

class EnrollRegistrationView extends React.PureComponent<IProps> {
	static defaultProps = {
		disabled: false,
	};

	onChangeGender = (_: any, gender: string) => {
		this.props.onChangeGender(Number(gender));
	};
	onBlurRepeatPassword: React.ChangeEventHandler<HTMLInputElement> = event => {
		this.props.onChangeTextInput(event);
	};
	onSubmit: FormEventHandler<HTMLFormElement> = event => {
		// estringvent.preventDefault();
		// const { invalidData, valupdateEnrollRegistrationTextInputidation, middleName, ...requiredFields } = this.state;
		// let validationFields: Record<keyof IEnrollRegisterStateForm, string> = {
		// 	lastName: '',
		// 	middleName: '',
		// 	firstName: '',
		// 	stringbirthday: '',
		// 	gender: '',
		// 	login: '',
		// 	password: '',
		// 	repeatPassword: '',
		// };
		// Object.entries(requiredFields).forEach((values: string[]) => {
		// 	validationFields = {
		// 		...validationFields,
		// 	string	[values[0]]: validateRequireTextField(values[1], true),
		// 	};
		// });
		//
		// if (Object.values(validationFields).some(Boolean)) {
		// 	this.setState({ validation: true, invalidData: validationFields });
		// } else {
		// 	this.props.updateForm({ middleName, ...requiredFields });
		// }
	};
	loginHelperText = () => {
		if (!this.props.isUniqueLogin) {
			return 'Логин уже существует';
		}

		return this.props.validation.login || 'Логин должен быть не менее 5 символов';
	};
	hasLoginError = () => {
		return !!this.props.validation.login || !this.props.isUniqueLogin;
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
			<form onSubmit={this.props.submit} className="flexColumn" noValidate={true}>
				<TextInput
					name="lastName"
					onChange={this.props.onChangeTextInput}
					required
					defaultValue={this.props.data.lastName}
					placeholder={'Введите фамилию'}
					label="Фамилия"
					helperText={this.props.validation.lastName}
					error={!!this.props.validation.lastName}
					onBlur={this.props.onBlurTextInput}
				/>
				<Autocomplete
					label={'Имя'}
					defaultValue={this.props.data.firstName}
					required
					helperText={this.props.validation.firstName}
					error={!!this.props.validation.firstName}
					onChange={this.props.onChangeFirstName}
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
					onChange={this.props.onChangeMiddleName}
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
					onBlur={this.props.onChangeTextInput}
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
						onChange={this.props.onChangeLogin}
						error={this.hasLoginError()}
						helperText={this.loginHelperText()}
					/>

					<TextInput
						required
						minLength={5}
						pattern={'[a-z0-9_-]'}
						name="password"
						label="Пароль"
						type="password"
						defaultValue={this.props.data.password}
						onBlur={this.props.onBlurTextInput}
						onChange={this.props.onChangeTextInput}
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
				<LoadingButton disabled={this.hasLoginError() || Object.values(this.props.validation).some(Boolean)}>
					Зарегистрироваться
				</LoadingButton>
			</form>
		);
	}
}

export default EnrollRegistrationView;
