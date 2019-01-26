import React from 'react';
import { Autocomplete, RadioGroupButton, TextInput, DocDataForm, DropdownSelect } from '../platform/';
import {
	IDictionaryNames,
	ITextFieldChanged,
	IAutocompleteChanged,
	ISelectChanged,
	ISpacable,
	makeSpace,
} from '../common';

interface IPersonDataFormProps {
	onChangeGender: (event: any, gender: string) => void;
	dictionaryGorverments: any[];
	dictionaryPersonDocTypes: any[];
	dictionaryFirstNames: IDictionaryNames[];
	dictionaryMiddleNames: IDictionaryNames[];
	gender: number | null;
}
const styles = {
	main: { display: 'flex', flexDirection: 'column' },
};

type IProps = ITextFieldChanged & IPersonDataFormProps & IAutocompleteChanged & ISelectChanged & ISpacable;
const GENDERS = [{ value: 1, label: 'Муж.', color: 'primary' }, { value: 2, label: 'Жен.' }];
const PersonDataForm = (props: IProps) => {
	const { space = 'small' } = props;

	return (
		// @ts-ignore
		<div style={styles.main}>
			<TextInput
				required
				placeholder={'Введите фамилию'}
				label="Фамилия"
				onBlur={props.onChangeTextField('lastName')}
			/>
			<Autocomplete
				field="name"
				label={'Имя'}
				required
				onChange={props.onChangeAutocompleteTextField('firstName')}
				placeholder={'Введите имя'}
				style={makeSpace(space)}
				suggestions={props.dictionaryFirstNames}
			/>
			<Autocomplete
				field="name"
				label={'Отчество'}
				onChange={props.onChangeAutocompleteTextField('middle')}
				placeholder={'Введите отчество'}
				style={makeSpace(space)}
				suggestions={props.dictionaryMiddleNames}
			/>
			<RadioGroupButton title="Пол" currentValue={props.gender} values={GENDERS} onChange={props.onChangeGender} />
			<TextInput required label="Дата рождения" type="date" onBlur={props.onChangeTextField('birthday')} />
			<DropdownSelect
				required={true}
				options={props.dictionaryGorverments}
				placeholder="Выберите гражданство"
				onChangeSelect={props.onChangeSelect('goverment')}
				title="Гражданство"
			/>

			<DropdownSelect
				required={true}
				options={props.dictionaryPersonDocTypes}
				placeholder="Выберите документ, удостоверающий личность"
				onChangeSelect={props.onChangeSelect('personDoc')}
				title="Тип документа удостоверяющего личность"
			/>
			<DocDataForm requireSeries={false} onChangeTextField={props.onChangeTextField} />
			<TextInput
				label="Код подразделения"
				type="number"
				placeholder={'Введите код подразделения'}
				onBlur={props.onChangeTextField('personDocCodeDepartment')}
			/>
		</div>
	);
};

export default PersonDataForm;
