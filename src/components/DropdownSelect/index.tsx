import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import React from 'react';
import Select from 'react-select';
import styles from './styles.module.css';
import { get, ISelectItem, noop } from '$common';
import { InputLabel } from '@material-ui/core';
interface ISelectProps {
	name: string;
	error: any;
	placeholder?: string;
	onChange: (data: any) => void;
	options: any[];
	title: string;
	isSearchable?: boolean;
	isCleanable?: boolean;
	isMulti?: boolean;
	required?: boolean;
	helperText?: string;
	value: ISelectItem | ISelectItem[] | null;
	defaultValue?: ISelectItem | ISelectItem[];
	loading: boolean;
}

class DropdownSelect extends React.Component<ISelectProps> {
	public static defaultProps = {
		isSearchable: true,
		isClearable: false,
		options: [],
		onChange: noop,
		loading: false,
		error: null,
		value: null,
	};

	componentDidUpdate() {
		if (this.props.options.length !== 1) {
			return;
		}
		if ((!this.props.isMulti && this.props.value) || (Array.isArray(this.props.value) && this.props.value.length > 0)) {
			return;
		}
		if (this.props.isMulti) {
			this.props.onChange([this.props.options[0]]);
		} else {
			this.props.onChange(this.props.options[0]);
		}
	}

	getOptionLabel = (item: ISelectItem) => item.name;
	getOptionValue = (item: ISelectItem): any => item.id;

	render() {
		return (
			<FormControl margin="normal">
				<FormLabel className={styles.label} style={{ fontSize: '0.875rem' }}>
					{this.props.title}
					{this.props.required ? ' *' : ''}
				</FormLabel>
				<Select
					className="basic-single"
					value={this.props.value}
					defaultValue={this.props.defaultValue}
					isMulti={this.props.isMulti}
					classNamePrefix="select"
					placeholder={this.props.placeholder}
					onChange={this.props.onChange}
					isClearable={this.props.isCleanable}
					isSearchable={this.props.isSearchable}
					getOptionLabel={this.getOptionLabel}
					getOptionValue={this.getOptionValue}
					isLoading={this.props.loading}
					options={this.props.options}
				/>
				{this.props.error && (
					<InputLabel style={{ color: 'red', marginTop: 4, fontSize: '0.875rem' }}>{this.props.error}</InputLabel>
				)}
			</FormControl>
		);
	}
}

export default DropdownSelect;
