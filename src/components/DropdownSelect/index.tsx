import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import React from 'react';
import Select from 'react-select';
import styles from './styles.module.css';
import { ISelectItem, noop, prop } from '$common';
import { Field, FieldProps, FormikProps } from 'formik';

interface ISelectProps {
	name: string;
	placeholder?: string;
	onChange: (data: any) => void;
	options: any[];
	title: string;
	isSearchable?: boolean;
	isCleanable?: boolean;
	isMulti?: boolean;
	required?: boolean;
	helperText?: string;
}

class DropdownSelect extends React.PureComponent<ISelectProps> {
	public static defaultProps = {
		isSearchable: true,
		isClearable: false,
		options: [],
		onChange: noop,
	};

	onChange = (form: FormikProps<ISelectItem>) => (value: any) => {
		form.setFieldValue(this.props.name, value);
		this.props.onChange(value);
	};
	getOptionLabel = (item: ISelectItem) => item.name;
	getOptionValue = (item: ISelectItem): any => item.id;
	validate = (value: ISelectItem | null) => {
		return value ? void 0 : 'Необходимо выбрать значение';
	};
	onBlur = (form: FormikProps<ISelectItem>, value: ISelectItem) => () => {
		if (this.props.required) {
			form.validateField(value.name);
		}
	};
	renderFormSelect = ({ form, field }: FieldProps<ISelectItem>) => {
		const error = prop(this.props.name)(form.errors);

		return (
			<FormControl margin="normal">
				<FormLabel className={styles.label} style={{ fontSize: '0.875rem' }}>
					{this.props.title}
					{this.props.required ? ' *' : ''}
				</FormLabel>
				<Select
					className="basic-single"
					value={field.value}
					isMulti={this.props.isMulti}
					classNamePrefix="select"
					placeholder={this.props.placeholder}
					onBlur={this.onBlur(form, field.value)}
					onChange={this.onChange(form)}
					isClearable={this.props.isCleanable}
					isSearchable={this.props.isSearchable}
					getOptionLabel={this.getOptionLabel}
					getOptionValue={this.getOptionValue}
					options={this.props.options}
				/>
				{error && <FormLabel style={{ color: 'red', marginTop: 4, fontSize: '0.875rem' }}>{error}</FormLabel>}
			</FormControl>
		);
	};
	render() {
		return <Field name={this.props.name} validate={this.validate} render={this.renderFormSelect} />;
	}
}

export default DropdownSelect;
