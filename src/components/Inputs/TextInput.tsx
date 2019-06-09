import TextField, { BaseTextFieldProps } from '@material-ui/core/TextField';
import React from 'react';
import { FormLabel, withStyles } from '@material-ui/core';
import { noop } from 'lodash';
import styles from './styles';
import { Field, FieldProps } from 'formik';

import { has, propEq, prop } from '$common';

export interface IInputProps {
	disabled: boolean;
	classes: any;
	type: string;
	isTopLabel: boolean;
	label?: string;
	required: boolean;
	multiline?: boolean;
	postfix?: string | number;
	prefix: string;
	placeholder?: string;
	helperText: string;
	name: string;
	minLength: number;
	maxLength: number;
	validate: (value: string) => void;
	validateOnChange: boolean;
}

class TextInput extends React.PureComponent<IInputProps> {
	static defaultProps = {
		validate: noop,
		type: 'text',
		isTopLabel: true,
		classes: {},
		required: false,
		minLength: -1,
		maxLength: -1,
		prefix: '',
		helperText: '',
		disabled: false,
		validateOnChange: false,
		name: '',
	};
	onBlur = ({ field, form }: FieldProps) => (event: any) => {
		field.onBlur(event);
		if (!form.validateOnBlur && this.props.required) {
			form.validateField(field.name);
		}
	};
	onChange = ({ field, form }: FieldProps) => (event: any) => {
		field.onChange(event);
		if (this.props.validateOnChange) {
			form.validateField(field.name);
		}
	};
	renderTextInput = (props: FieldProps) => {
		const { form, field } = props;
		const touched = has(field.name);

		console.log('checkRender', props);

		return (
			<>
				{this.props.prefix && <FormLabel>{this.props.prefix}</FormLabel>}
				<TextField
					margin="normal"
					disabled={this.props.disabled}
					value={field.value}
					error={touched && !propEq(field.name, void 0, form.errors)}
					helperText={(touched && prop(field.name, form.errors)) || this.props.helperText}
					required={this.props.required}
					multiline={this.props.multiline}
					label={this.props.label}
					placeholder={this.props.placeholder}
					type={this.props.type}
					onBlur={this.onBlur(props)}
					onChange={this.onChange(props)}
					inputProps={{
						name: this.props.name,
						type: this.props.type,
						maxLength: this.props.maxLength,
						minLength: this.props.minLength,
					}}
					name={this.props.name}
					InputLabelProps={{
						FormLabelClasses: { asterisk: this.props.classes.asterisk },
						shrink: this.props.isTopLabel,
					}}
				/>
			</>
		);
	};
	render() {
		return <Field name={this.props.name} validate={this.props.validate} render={this.renderTextInput} />;
	}
}

export default withStyles(styles)(TextInput);
