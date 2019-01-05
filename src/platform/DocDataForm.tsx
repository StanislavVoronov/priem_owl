import React from 'react';
import { TextField, FormControl } from './';
interface IDocDataForm {
	requireSeries?: boolean;
	series: string;
	number: string;
	date: string;
	issued: string;
	onChangeSeries: (event: any) => void;
	onChangeNumber: (event: any) => void;
	onChangeDate: (event: any) => void;
	onChangeIssued: (event: any) => void;
}
const DocDataForm = (props: IDocDataForm) => {
	return (
		<FormControl>
			<TextField
				required={props.requireSeries}
				value={props.series}
				margin={'normal'}
				placeholder="Введите серию документа"
				label="Серия"
				onChange={props.onChangeSeries}
			/>
			<TextField
				value={props.number}
				margin={'normal'}
				placeholder="Введите номер документа"
				label="Номер"
				onChange={props.onChangeNumber}
			/>
			<TextField
				value={props.date}
				margin={'normal'}
				placeholder="Введите дату выдачи документа"
				label="Дата выдачи"
				onChange={props.onChangeDate}
			/>
			<TextField
				value={props.issued}
				margin={'normal'}
				placeholder="Введите кем выдан документ"
				label="Кем выдан"
				multiline
				onChange={props.onChangeIssued}
			/>
		</FormControl>
	);
};

export default DocDataForm;
