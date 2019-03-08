import { FormControl, FormLabel } from '../platform/';
import React from 'react';
import Select from 'react-select';
import { composeStyles, IHasError, IHelperText, ISpacable, IStylable, makeVerticalSpace } from '../common';
interface ISelectProps extends IStylable, ISpacable, IHasError, IHelperText {
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
const styles = {
	label: {
		fontSize: '0.75em',
		marginBottom: 5,
	},
};
class DropdownSelect extends React.PureComponent<ISelectProps> {
	public static defaultProps = {
		isSearchable: true,
		isClearable: true,
		verticalSpace: 'normal',
		value: 'id',
		label: 'name',
		options: [],
	};
	public render() {
		console.log('default', this.props.defaultValue);
		return (
			<FormControl style={composeStyles(makeVerticalSpace(this.props.verticalSpace), this.props.style)}>
				<FormLabel style={styles.label}>
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
				{this.props.hasError && <FormLabel style={composeStyles({ color: 'red' })}>{this.props.helperText}</FormLabel>}
			</FormControl>
		);
	}
}

export default DropdownSelect;
