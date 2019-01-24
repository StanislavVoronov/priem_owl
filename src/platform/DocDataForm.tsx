import React from 'react';
import { TextField, FormControl } from './';
import { ITextFieldChange } from '../models';
interface IDocDataForm extends ITextFieldChange {
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
			<TextField
				required={props.requireSeries}
				style={styles.space}
				placeholder="Введите серию документа"
				label="Серия"
				InputLabelProps={{
					shrink: true,
				}}
				onChange={props.onChangeTextField('series')}
			/>
			<TextField
				style={styles.space}
				placeholder="Введите номер документа"
				label="Номер"
				InputLabelProps={{
					shrink: true,
				}}
				onChange={props.onChangeTextField('number')}
			/>
			<TextField
				style={styles.space}
				type="date"
				InputLabelProps={{
					shrink: true,
				}}
				label="Дата выдачи"
				onChange={props.onChangeTextField('date')}
			/>
			<TextField
				style={styles.space}
				placeholder="Введите кем выдан документ"
				label="Кем выдан"
				InputLabelProps={{
					shrink: true,
				}}
				multiline
				onChange={props.onChangeTextField('issued')}
			/>
		</FormControl>
	);
};

export default DocDataForm;
