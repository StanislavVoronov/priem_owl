import React from 'react';
import { TextInput, FormControl } from './';
import { ITextFieldChanged } from '../common';
interface IDocDataForm extends ITextFieldChanged {
	requireSeries?: boolean;
	seriesValidateErrorMessage?: string;
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
			<TextInput
				required={props.requireSeries}
				placeholder="Введите серию документа"
				label="Серия"
				onBlur={props.onChangeTextField('series')}
			/>
			<TextInput
				required
				placeholder="Введите номер документа"
				label="Номер"
				type="number"
				onBlur={props.onChangeTextField('number')}
			/>
			<TextInput required type="date" label="Дата выдачи документа" onBlur={props.onChangeTextField('date')} />
			<TextInput
				required
				placeholder="Введите кем выдан документ"
				label="Кем выдан документ"
				multiline
				onBlur={props.onChangeTextField('issued')}
			/>
		</FormControl>
	);
};

export default DocDataForm;
