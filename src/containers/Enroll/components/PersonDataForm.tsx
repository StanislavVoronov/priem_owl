import React, { useState } from 'react';
import { Autocomplete, RadioGroupButton, TextInput, DocDataForm, DropdownSelect, Button } from '../../../platform';
import { AppContext } from '../../../App';
import {
	composeStyles,
	Styles,
	IRootState,
	makeVerticalSpace,
	EDictionaryNameList,
	ISelectItem,
} from '../../../common';

import { IDictionary } from '@mgutm-fcu/dictionary';
import { IPersonData } from '../models';

interface IOwnProps {
	submit: (data: IPersonData) => void;
}

interface IState {
	personData: IPersonData;
}
type IProps = IOwnProps;
class PersonDataForm extends React.PureComponent<IProps, IState> {
	state = {
		personData: {
			lastName: '',
			firstName: '',
			middleName: '',
			gender: '',
			docSeries: '',
			docNumber: '',
			docIssieBy: '',
			codeDepartment: '',
			docDate: '',
			docFile: null,
			birthday: null,
			government: null,
		},
	};
	onSelectFirstName = (value: string, index: number) => {
		this.setState(state => ({
			...state,
			personData: {
				...state.personData,
				firstName: value,
				// gender: this.props.dictionaryFirstNames.values[index]['sex'],
			},
		}));
	};
	onChangeTextField = (name: string) => (value: string) => {
		this.setState(state => ({
			...state,
			personData: {
				...state.personData,
				[name]: value,
			},
		}));
	};
	onChangeSelectField = (name: string) => (value: ISelectItem) => {
		this.setState(state => ({
			...state,
			personData: {
				...state.personData,
				[name]: value,
			},
		}));
	};

	prepareDictionarySuggestions = (dictionary: IDictionary) => {
		if (!dictionary || !Array.isArray(dictionary.values)) return [];
		return [];
		// return this.props.dictionaryFirstNames.values.map(item => item.name);
	};
	onDownloadFile = (doc: File) => {
		this.setState(state => ({
			...state,
			personData: {
				...state.personData,
				docFile: doc,
			},
		}));
	};
	submit = () => {
		this.props.submit(this.state.personData);
	};
	render() {
		return (
			<AppContext.Consumer>
				{context => {
					console.log('context', context);
					return (
						<div style={composeStyles(Styles.flexColumn)}>
							{/*<DropdownSelect*/}
							{/*required={true}*/}
							{/*options={this.props.dictionaryGovernments && this.props.dictionaryGovernments.values}*/}
							{/*placeholder="Выберите гражданство"*/}
							{/*onChangeSelect={this.onChangeSelectField('government')}*/}
							{/*title="Гражданство"*/}
							{/*/>*/}

							{/*<DocDataForm*/}
							{/*isNeedData*/}
							{/*file={this.state.personData.docFile}*/}
							{/*onDownloadFile={this.onDownloadFile}*/}
							{/*onChangeSeries={this.onChangeTextField('docSeries')}*/}
							{/*onChangeNumber={this.onChangeTextField('docNumber')}*/}
							{/*onChangeIssieBy={this.onChangeTextField('docIssieBy')}*/}
							{/*onChangeDate={this.onChangeTextField('docDate')}*/}
							{/*dictionarySubTypes={this.props.dictionaryPersonDocTypes && this.props.dictionaryPersonDocTypes.values}*/}
							{/*subTitle={'Тип документа удостоверяющего личность'}*/}
							{/*extraFields={*/}
							{/*<TextInput*/}
							{/*label="Код подразделения"*/}
							{/*type="number"*/}
							{/*placeholder={'Введите код подразделения'}*/}
							{/*onBlur={this.onChangeTextField('codeDepartment')}*/}
							{/*/>*/}
							{/*}*/}
							{/*/>*/}
							<Button variant="contained" color="primary" onClick={this.submit}>
								{'Регистрация'}
							</Button>
						</div>
					);
				}}
			</AppContext.Consumer>
		);
	}
}

export default PersonDataForm;
