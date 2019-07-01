import { Field, FieldProps, FormikProps } from 'formik';
import React from 'react';
import { get, ISelectItem, noop } from '$common';

export interface IFormWrapperProps<V> {
	value: V;
	onChange: (value: V) => void;
	error?: any;
	name: string;
}
interface IProps<V = any> {
	name: string;
	onChange: (value: any) => void;
	value?: V;
	children: (form: IFormWrapperProps<V>) => React.ReactNode;
}
class FieldWrapper extends React.Component<IProps> {
	static defaultProps = {
		onChange: noop,
	};
	onChange = (form: FormikProps<ISelectItem>) => (value: any) => {
		form.setFieldValue(this.props.name, value);
		if (form.errors[this.props.name]) {
			form.setFieldError(this.props.name, '');
		}
		this.props.onChange(value);
	};
	render() {
		return (
			<Field name={this.props.name}>
				{(props: FieldProps<any>) =>
					this.props.children({
						name: props.field.name,
						onChange: this.onChange(props.form),
						value: props.field.value,
						error: get(props.form.errors, this.props.name),
					})
				}
			</Field>
		);
	}
}

export default FieldWrapper;
