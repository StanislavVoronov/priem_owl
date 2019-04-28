import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import React from 'react';
import Select from 'react-select';
import styles from './styles.module.css';
import { IHasError, IHelperText } from '../models';
import { ISelectItem } from '$common';

interface ISelectProps extends IHasError, IHelperText {
	value?: ISelectItem | null;
	placeholder?: string;
	onChange: (data: any) => void;
	options: any[];
	title: string;
	isSearchable?: boolean;
	isCleanable?: boolean;
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
	getOptionLabel = (item: ISelectItem) => item.name;
	getOptionValue = (item: ISelectItem): any => item.id;
	render() {
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
					isClearable={this.props.isCleanable}
					isSearchable={this.props.isSearchable}
					getOptionLabel={this.getOptionLabel}
					getOptionValue={this.getOptionValue}
					options={this.props.options}
				/>
				{this.props.hasError && <FormLabel classes={{ root: 'requiredLabel' }}>{this.props.helperText}</FormLabel>}
			</FormControl>
		);
	}
}

export default DropdownSelect;
