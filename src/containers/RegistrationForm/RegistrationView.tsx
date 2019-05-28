import React, { ChangeEvent, FormEventHandler } from 'react';
import { Autocomplete, RadioButtonGroup, TextInput, LoadingButton, Button } from '$components';
import { EDictionaryNameList, IEnrollRegForm, IForm, IInvalidData, prepareDictionarySuggestions } from '$common';
import { DictionaryState } from '@mgutm-fcu/dictionary';

export const GENDERS = [{ value: 1, label: 'Муж.', color: 'primary' }, { value: 2, label: 'Жен.' }];

interface IProps extends IEnrollRegForm, IInvalidData<IEnrollRegForm> {
	onChangeTextInput: (event: ChangeEvent<HTMLInputElement>) => void;
	dictionaries: DictionaryState;
	onChangeMiddleName: (value: string) => void;
	onChangeGender: (value: number) => void;
	onChangeFirstName: (value: string) => void;
	onBlurTextInput: (event: ChangeEvent<HTMLInputElement>) => void;
	submit: () => void;
}

class RegistrationView extends React.PureComponent<IProps> {
	static defaultProps = {
		disabled: false,
	};

	onChangeGender = (_: any, gender: string) => {
		this.props.onChangeGender(Number(gender));
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
		// if (ObjectconfirmationCode.values(validationFields).some(Boolean)) {
		// 	this.setState({ validation: true, invalidData: validationFields });
		// } else {
		// 	this.props.updateForm({ middleName, ...requiredFields });
		// }
	};

	render() {
		const { dictionaries } = this.props;
		const dictionaryFirstNames = dictionaries[EDictionaryNameList.FirstNames];
		const dictionaryMiddleNames = dictionaries[EDictionaryNameList.MiddleNames];

		const filteredDictionaryMiddleName = dictionaryMiddleNames
			? this.props.gender
				? {
						values: dictionaryMiddleNames.values.filter((item: { sex: number }) => item.sex === this.props.gender),
				  }
				: dictionaryMiddleNames
			: { values: [] };

		return (
			<form className="flexColumn" noValidate={true}>
				<TextInput
					name="lastName"
					onChange={this.props.onChangeTextInput}
					required
					defaultValue={this.props.lastName}
					placeholder={'Введите фамилию'}
					label="Фамилия"
					helperText={this.props.validation.lastName}
					error={!!this.props.validation.lastName}
					onBlur={this.props.onBlurTextInput}
				/>
				<Autocomplete
					label={'Имя'}
					defaultValue={this.props.firstName}
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
					defaultValue={this.props.middleName}
					helperText={this.props.validation.middleName}
					error={!!this.props.validation.middleName}
					onChange={this.props.onChangeMiddleName}
					suggestions={prepareDictionarySuggestions(filteredDictionaryMiddleName)}
				/>

				<TextInput
					required
					name="birthday"
					label="Дата рождения"
					defaultValue={this.props.birthday}
					type="date"
					error={!!this.props.validation.birthday}
					helperText={this.props.validation.birthday}
					onBlur={this.props.onBlurTextInput}
				/>

				<RadioButtonGroup
					title="Пол"
					required={true}
					value={String(this.props.gender)}
					values={GENDERS}
					onChange={this.onChangeGender}
				/>
				<div style={{ marginTop: 24 }}>
					<Button onClick={this.props.submit} disabled={Object.values(this.props.validation).some(Boolean)}>
						Проверить
					</Button>
				</div>
			</form>
		);
	}
}

export default RegistrationView;
