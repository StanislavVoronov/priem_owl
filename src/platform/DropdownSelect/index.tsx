import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import React from 'react';
import Select from 'react-select';
import styles from './styles.css';
import { IHasError, IHelperText } from '../models';

export interface ISelectItem {
	name: string;
	id: number;
}

interface ISelectProps extends IHasError, IHelperText {
	placeholder?: string;
	onChange: (data: any) => void;
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

class DropdownSelect extends React.PureComponent<ISelectProps, { value: string }> {
	public static defaultProps = {
		isSearchable: true,
		isClearable: true,
		value: 'id',
		label: 'name',
		options: [],
	};
	onChange = (item: any) => {
		this.setState({ value: item });
		this.props.onChange(item);
	};
	public render() {
		return (
			<FormControl margin="normal">
				<FormLabel className={styles.label} style={{ fontSize: '0.75rem' }}>
					{this.props.title}
					{this.props.required ? ' *' : ''}
				</FormLabel>
				<Select
					className="basic-single"
					value={this.props.value || this.state.value}
					isMulti={this.props.isMulti}
					defaultValue={this.props.defaultValue}
					classNamePrefix="select"
					placeholder={this.props.placeholder}
					onChange={this.onChange}
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
