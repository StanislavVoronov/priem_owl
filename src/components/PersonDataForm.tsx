import React from 'react';
import { Autocomplete, RadioGroupButton, TextInput, DocDataForm, DropdownSelect } from '../platform/';
import {
	IDictionaryNames,
	ITextFieldChanged,
	IAutocompleteChanged,
	ISelectChanged,
	ISpacable,
	makeSpace,
	composeStyles,
	Styles,
	IDataChanged,
	IDocDataForm,
} from '../common';
import { IDictionary } from '@mgutm-fcu/dictionary';

interface IPersonDataFormProps extends IDocDataForm {
	onChangeGender: (event: any, gender: string) => void;
	dictionaryGovernments: IDictionary[];
	dictionaryPersonDocTypes: IDictionary[];
	dictionaryFirstNames: IDictionaryNames[];
	dictionaryMiddleNames: IDictionaryNames[];
	gender: number | null;
}

type IProps = IPersonDataFormProps & IAutocompleteChanged & IDataChanged & ISpacable;
const GENDERS = [{ value: 1, label: 'Муж.', color: 'primary' }, { value: 2, label: 'Жен.' }];
const PersonDataForm = (props: IProps) => {
	const { space = 'v-small' } = props;

	return (
		<div style={composeStyles(Styles.flexColumn)}>
			<TextInput required placeholder={'Введите фамилию'} label="Фамилия" onBlur={props.onChangeData('lastName')} />
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
				onChange={props.onChangeAutocompleteTextField('middleName')}
				style={makeSpace(space)}
				suggestions={props.dictionaryMiddleNames}
			/>
			<RadioGroupButton title="Пол" currentValue={props.gender} values={GENDERS} onChange={props.onChangeGender} />
			<TextInput required label="Дата рождения" type="date" onBlur={props.onChangeData('birthday')} />
			<DropdownSelect
				required={true}
				options={props.dictionaryGovernments}
				placeholder="Выберите гражданство"
				onChangeSelect={props.onChangeData('goverment')}
				title="Гражданство"
			/>

			<DocDataForm
				dictionarySubTypes={props.dictionaryPersonDocTypes}
				subTitle={'Тип документа удостоверяющего личность'}
				requireSeries={false}
				onChangeData={props.onChangeData}
				docFile={props.docFile}
				extraFields={
					<TextInput
						label="Код подразделения"
						type="number"
						placeholder={'Введите код подразделения'}
						onBlur={props.onChangeData('codeDepartment')}
					/>
				}
			/>
		</div>
	);
};

export default PersonDataForm;
