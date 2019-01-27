import React from 'react';
import { TextInput, FormControl } from './';
import { ISelectItem, IDataChanged } from '../common';
import DropdownSelect from './DropdownSelect';
import { IDictionary } from '@mgutm-fcu/dictionary';
interface IDocDataForm extends IDataChanged {
	requireSeries?: boolean;
	dictionary: IDictionary[];
	title: string;
}
const styles = {
	space: {
		marginTop: 10,
		marginBottom: 5,
	},
};
const DocDataForm = (props: IDocDataForm) => {
	return (
		<FormControl>
			<DropdownSelect
				required={true}
				options={props.dictionary}
				placeholder={`Выберите ${props.title.toLowerCase()}`}
				onChangeSelect={props.onChangeData<ISelectItem>('docType')}
				title={props.title}
			/>
			<TextInput
				required={props.requireSeries}
				placeholder="Введите серию документа"
				label="Серия"
				onBlur={props.onChangeData<string>('docSeries')}
			/>
			<TextInput
				required
				placeholder="Введите номер документа"
				label="Номер"
				type="number"
				onBlur={props.onChangeData<string>('doNumber')}
			/>
			<TextInput required type="date" label="Дата выдачи документа" onBlur={props.onChangeTextField('docDate')} />
			<TextInput
				required
				placeholder="Введите кем выдан документ"
				label="Кем выдан документ"
				multiline
				onBlur={props.onChangeData<string>('docIssued')}
			/>
		</FormControl>
	);
};

export default DocDataForm;
