import TextInput from '../../../platform/TextInput';
import React from 'react';
import { AppContext } from '../../../App';
import { Autocomplete, RadioGroupButton } from '../../../platform';
import { composeStyles, EDictionaryNameList, makeVerticalSpace, Styles } from '../../../common';
import { Dictionary, IDictionary } from '@mgutm-fcu/dictionary';

const prepareDictionarySuggestions = (dictionary: IDictionary) => {
	if (!dictionary || !Array.isArray(dictionary.values)) return [];
	return dictionary.values.map((item: any) => item.name);
};
interface IOwnProps {
	submit(data: any): void;
}
type IProps = IOwnProps;
interface IRegisterFormData {
	lastName: string;
	firstName: string;
	middleName?: string;
	birthday: Date | null;
	gender: string;
}

const GENDERS = [{ value: 1, label: 'Муж.', color: 'primary' }, { value: 2, label: 'Жен.' }];

class RegisterDataForm extends React.PureComponent<IProps, IRegisterFormData> {
	state = {
		gender: '',
		lastName: '',
		firstName: '',
		birthday: null,
	};
	onChangeTextField = (name: string) => (value: string) => {
		this.setState(state => ({
			...state,
			[name]: value,
		}));
	};
	onSelectFirstName = (dictionaryFirstNames: IDictionary) => (value: string, index: number) => {
		this.setState(state => ({
			...state,
			firstName: value,
			gender: dictionaryFirstNames.values[index]['sex'].toString(),
		}));
	};
	onChangeGender = (gender: string) => {
		this.setState(state => ({
			...state,
			gender,
		}));
	};
	render() {
		return (
			<AppContext.Consumer>
				{context => {
					const dictionaryFirstNames = context[EDictionaryNameList.FirstNames];
					const dictionaryMiddleNames = context[EDictionaryNameList.MiddleNames];

					return (
						<div style={composeStyles(Styles.flexColumn)}>
							<TextInput
								required
								placeholder={'Введите фамилию'}
								label="Фамилия"
								onBlur={this.onChangeTextField('lastName')}
							/>
							<Autocomplete
								label={'Имя'}
								required
								onSelect={this.onSelectFirstName(dictionaryFirstNames)}
								onChange={this.onChangeTextField('firstName')}
								placeholder={'Введите имя'}
								style={makeVerticalSpace('small')}
								suggestions={prepareDictionarySuggestions(dictionaryFirstNames)}
							/>

							<Autocomplete
								label={'Отчество'}
								placeholder={'Введите отчество'}
								onSelect={this.onChangeTextField('middleName')}
								onChange={this.onChangeTextField('middleName')}
								style={makeVerticalSpace('small')}
								suggestions={prepareDictionarySuggestions(dictionaryMiddleNames)}
							/>

							<RadioGroupButton
								title="Пол"
								required
								currentValue={this.state.gender}
								values={GENDERS}
								onChange={this.onChangeGender}
							/>
							<TextInput required label="Дата рождения" type="date" onBlur={this.onChangeTextField('birthday')} />
						</div>
					);
				}}
			</AppContext.Consumer>
		);
	}
}

export default RegisterDataForm;
