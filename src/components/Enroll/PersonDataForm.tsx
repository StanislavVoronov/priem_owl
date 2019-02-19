import React, { useState } from 'react';
import { Autocomplete, RadioGroupButton, TextInput, DocDataForm, DropdownSelect, Button } from '../../platform';
import { connect, MapStateToProps } from 'react-redux';
import {
	IDictionaryName,
	IAutocompleteChanged,
	ISpacable,
	composeStyles,
	Styles,
	IDataChanged,
	IDocDataForm,
	IRootState,
	makeVerticalSpace,
	EDictionaryNameList,
	ISelectItem,
} from '../../common';
import { IDictionary } from '@mgutm-fcu/dictionary';
import { SuggestionSelectedEventData } from 'react-autosuggest';

interface IStateProps {
	dictionaryGovernments: IDictionary;
	dictionaryPersonDocTypes: IDictionary;
	dictionaryFirstNames: IDictionary;
	dictionaryMiddleNames: IDictionary;
}
interface IOwnProps {
	submit: (data: any) => void;
}
type IProps = IStateProps & IAutocompleteChanged & IDataChanged & ISpacable;
const GENDERS = [{ value: 1, label: 'Муж.', color: 'primary' }, { value: 2, label: 'Жен.' }];
class PersonDataForm extends React.PureComponent<IStateProps> {
	state = {
		gender: 0,
		doc: null,
	};
	onSelectFirstName = (value: string, index: number) => {
		console.log('first', value, this.props.dictionaryFirstNames.values[index]['sex']);
		console.log('first', value, this.props.dictionaryFirstNames.values[index]['sex']);
		this.setState(state => ({
			...state,
			firstName: value,
			gender: this.props.dictionaryFirstNames.values[index]['sex'],
		}));
	};
	onChangeTextField = (name: string) => (value: string) => {
		this.setState(state => ({ ...state, [name]: value }));
	};
	onChangeSelectField = (name: string) => (value: ISelectItem) => {
		this.setState(state => ({ ...state, [name]: value }));
	};
	onChangeGender = (gender: string) => {
		this.setState(state => ({ ...state, gender }));
	};
	prepareDictionarySuggestions = (dictionary: IDictionary) => {
		if (!dictionary || !Array.isArray(dictionary.values)) return [];
		return this.props.dictionaryFirstNames.values.map(item => item.name);
	};
	onDownloadFile = (doc: File | string) => {
		this.setState({ doc });
	};
	render() {
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
					onSelect={this.onSelectFirstName}
					onChange={this.onChangeTextField('firstName')}
					placeholder={'Введите имя'}
					style={makeVerticalSpace('small')}
					suggestions={this.prepareDictionarySuggestions(this.props.dictionaryFirstNames)}
				/>
				<Autocomplete
					label={'Отчество'}
					placeholder={'Введите отчество'}
					onSelect={this.onChangeTextField('middleName')}
					onChange={this.onChangeTextField('middleName')}
					style={makeVerticalSpace('small')}
					suggestions={this.prepareDictionarySuggestions(this.props.dictionaryMiddleNames)}
				/>
				<RadioGroupButton
					title="Пол"
					required
					currentValue={this.state.gender}
					values={GENDERS}
					onChange={this.onChangeGender}
				/>
				<TextInput required label="Дата рождения" type="date" onBlur={this.onChangeTextField('birthday')} />
				<DropdownSelect
					required={true}
					options={this.props.dictionaryGovernments && this.props.dictionaryGovernments.values}
					placeholder="Выберите гражданство"
					onChangeSelect={this.onChangeSelectField('goverment')}
					title="Гражданство"
				/>

				<DocDataForm
					isNeedData
					file={this.state.doc}
					onDownloadFile={this.onDownloadFile}
					onChangeSeries={this.onChangeTextField('docSeries')}
					onChangeNumber={this.onChangeTextField('docNumber')}
					onChangeIssieBy={this.onChangeTextField('docIssieBy')}
					dictionarySubTypes={this.props.dictionaryPersonDocTypes && this.props.dictionaryPersonDocTypes.values}
					subTitle={'Тип документа удостоверяющего личность'}
					extraFields={
						<TextInput
							label="Код подразделения"
							type="number"
							placeholder={'Введите код подразделения'}
							onBlur={this.onChangeTextField('codeDepartment')}
						/>
					}
				/>
				<Button />
			</div>
		);
	}
}
const mapStateToProps: MapStateToProps<IStateProps, {}, IRootState> = state => {
	return {
		dictionaryGovernments: state.dictionaries[EDictionaryNameList.Governments],
		dictionaryPersonDocTypes: state.dictionaries[EDictionaryNameList.PersonDocTypes],
		dictionaryFirstNames: state.dictionaries[EDictionaryNameList.FirstNames],
		dictionaryMiddleNames: state.dictionaries[EDictionaryNameList.MiddleNames],
	};
};
export default connect<IStateProps, {}, IOwnProps>(mapStateToProps)(PersonDataForm);
