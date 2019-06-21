import React from 'react';
import { InputAdornment, InputLabel, FormControl, TextField } from '@material-ui/core';
import { Field, FieldProps } from 'formik';
import classes from './styles.module.css';
import { has, get, noop } from '$common';

export interface IInputProps {
	disabled: boolean;
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
		const error = touched && get(form.errors, field.name);

		return (
			<FormControl style={{ marginTop: 10 }}>
				<InputLabel
					classes={{ asterisk: classes.asterisk }}
					shrink
					required={this.props.required}
					htmlFor={this.props.name}>
					{this.props.label}
				</InputLabel>
				<TextField
					margin="normal"
					name={this.props.name}
					id={this.props.name}
					disabled={this.props.disabled}
					value={field.value}
					error={!!error}
					helperText={error || this.props.helperText}
					required={this.props.required}
					multiline={this.props.multiline}
					placeholder={this.props.placeholder}
					type={this.props.type}
					onBlur={this.onBlur(props)}
					onChange={this.onChange(props)}
					inputProps={{
						startAdornment: this.props.prefix && <InputAdornment position="start">{this.props.prefix}</InputAdornment>,
					}}
				/>
			</FormControl>
		);
	};
	render() {
		return <Field name={this.props.name} validate={this.props.validate} render={this.renderTextInput} />;
	}
}

export default TextInput;
