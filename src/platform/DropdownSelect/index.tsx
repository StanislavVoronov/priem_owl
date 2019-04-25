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
	value?: Record<string, any> | null;
	placeholder?: string;
	onChange: (data: any) => void;
	options: any[];
	title: string;
	isSearchable?: boolean;
	isClearable?: boolean;
	defaultValue?: any;
	isMulti?: boolean;
	required?: boolean;
}
interface IState {
	value?: Record<string, any> | null;
	isControlled: boolean;
}
class DropdownSelect extends React.PureComponent<ISelectProps, IState> {
	public static defaultProps = {
		isSearchable: true,
		isClearable: false,
		options: [],
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
					value={this.state.isControlled ? this.props.value : this.state.value}
					isMulti={this.props.isMulti}
					defaultValue={this.props.defaultValue}
					classNamePrefix="select"
					placeholder={this.props.placeholder}
					onChange={this.onChange}
					isClearable={this.props.isClearable}
					isSearchable={this.props.isSearchable}
					getOptionLabel={(item: any) => item.name}
					getOptionValue={(item: any) => item.id}
					options={this.props.options}
				/>
				{this.props.hasError && <FormLabel classes={{ root: 'requiredLabel' }}>{this.props.helperText}</FormLabel>}
			</FormControl>
		);
	}
}

export default DropdownSelect;
