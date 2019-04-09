import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import React from 'react';
import Select from 'react-select';
import { IHasError, IHelperText, IStylable } from '../../common';

export interface ISelectItem {
	name: string;
	id: number;
}

interface ISelectProps extends IStylable, IHasError, IHelperText {
	placeholder?: string;
	onChangeSelect: (data: any) => void;
	options: any[];
	title: string;
	value?: string;
	label?: string;
	isSearchable?: boolean;
	isClearable?: boolean;
	defaultValue?: any;
	isMulti?: boolean;
	required?: boolean;
}

class DropdownSelect extends React.PureComponent<ISelectProps> {
	public static defaultProps = {
		isSearchable: true,
		isClearable: true,
		value: 'id',
		label: 'name',
		options: [],
	};
	public render() {
		return (
			<FormControl margin="normal">
				<FormLabel classes={{ root: 'label' }}>
					{this.props.title}
					{this.props.required ? ' *' : ''}
				</FormLabel>
				<Select
					className="basic-single"
					isMulti={this.props.isMulti}
					defaultValue={this.props.defaultValue}
					classNamePrefix="select"
					placeholder={this.props.placeholder}
					onChange={this.props.onChangeSelect}
					isClearable={this.props.isClearable}
					isSearchable={this.props.isSearchable}
					getOptionLabel={(item: any) => item[this.props.label!]}
					getOptionValue={(item: any) => item[this.props.value!]}
					options={this.props.options}
				/>
				{this.props.hasError && <FormLabel classes={{ root: 'requiredLabel' }}>{this.props.helperText}</FormLabel>}
			</FormControl>
		);
	}
}

export default DropdownSelect;
