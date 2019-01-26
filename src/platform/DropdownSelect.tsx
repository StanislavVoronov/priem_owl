import { FormControl, FormLabel } from '../platform/';
import React from 'react';
import Select from 'react-select';
interface ISelect {
	placeholder?: string;
	onChangeSelect: (data: any) => void;
	options: any[];
	title: string;
	value?: string;
	label?: string;
	isSearchable?: boolean;
	isClearable?: boolean;
	defaultValue?: any;
	required?: boolean;
}
const styles = {
	spaceSelector: {
		marginTop: 15,
		marginBottom: 10,
	},
	label: {
		fontSize: '0.75em',
		marginBottom: 5,
	},
};
const DropdownSelect = (props: ISelect) => {
	const {
		label = 'name',
		defaultValue,
		value = 'id',
		placeholder,
		title,
		isSearchable = true,
		isClearable = true,
	} = props;
	return (
		<FormControl style={styles.spaceSelector}>
			<FormLabel style={styles.label}>
				{title}
				{props.required ? ' *' : ''}
			</FormLabel>
			<Select
				className="basic-single"
				classNamePrefix="select"
				defaultValue={undefined}
				placeholder={placeholder}
				onChange={props.onChangeSelect}
				isClearable={isClearable}
				isSearchable={isSearchable}
				getOptionLabel={(item: any) => item[label]}
				getOptionValue={(item: any) => item[value]}
				options={props.options}
			/>
		</FormControl>
	);
};

export default DropdownSelect;
