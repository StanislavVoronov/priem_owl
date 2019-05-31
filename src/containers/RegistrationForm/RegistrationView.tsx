import React, { ChangeEvent, FormEventHandler } from 'react';
import { Autocomplete, RadioButtonGroup, TextInput, LoadingButton, Button, LoadingText, H2 } from '$components';
import {
	EDictionaryNameList,
	IEnrollRegForm,
	IForm,
	IInvalidData,
	IServerError,
	prepareDictionarySuggestions,
} from '$common';
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
	error: IServerError | null;
	loading: boolean;
}

class RegistrationView extends React.PureComponent<IProps> {
	static defaultProps = {
		disabled: false,
	};

	onChangeGender = (_: any, gender: string) => {
		this.props.onChangeGender(Number(gender));
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
		if (this.props.loading) {
			return <LoadingText>Проверка абитуриента</LoadingText>;
		}

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

				{this.props.error && <H2 color="red">{this.props.error.message}</H2>}
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
