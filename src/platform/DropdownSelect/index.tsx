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
	value: Record<string, any> | null;
	placeholder?: string;
	onChange: (data: any) => void;
	options: any[];
	title: string;
	optionValue: string;
	optionLabel: string;
	isSearchable?: boolean;
	isClearable?: boolean;
	defaultValue?: any;
	isMulti?: boolean;
	required?: boolean;
}

class DropdownSelect extends React.PureComponent<ISelectProps, { value: any; isControlled: boolean }> {
	public static defaultProps = {
		isSearchable: true,
		isClearable: true,
		optionValue: 'id',
		optionLabel: 'name',
		options: [],
		value: null,
	};
	state = {
		value: this.props.value,
		isControlled: !!this.props.value,
	};
	onChange = (value: any) => {
		if (!this.state.isControlled) {
			this.setState({ value });
		}
		this.props.onChange(value);
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
					value={
						this.state.isControlled
							? this.props.value![this.props.optionValue]
							: this.state.value![this.props.optionValue]
					}
					isMulti={this.props.isMulti}
					defaultValue={this.props.defaultValue}
					classNamePrefix="select"
					placeholder={this.props.placeholder}
					onChange={this.onChange}
					isClearable={this.props.isClearable}
					isSearchable={this.props.isSearchable}
					getOptionLabel={(item: any) => item[this.props.optionLabel]}
					getOptionValue={(item: any) => item[this.props.optionValue]}
					options={this.props.options}
				/>
				{this.props.hasError && <FormLabel classes={{ root: 'requiredLabel' }}>{this.props.helperText}</FormLabel>}
			</FormControl>
		);
	}
}

export default DropdownSelect;
