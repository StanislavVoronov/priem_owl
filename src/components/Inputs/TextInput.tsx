import { IDisabled, IHasError, IHelperText } from '../../containers/models';
import TextField, { BaseTextFieldProps } from '@material-ui/core/TextField';
import React, { ChangeEvent, ReactText } from 'react';
import { FormLabel, Omit, withStyles } from '@material-ui/core';
import { noop } from 'lodash';
import styles from './styles';

export interface IInputProps<T> extends BaseTextFieldProps {
	onChange: (event: ChangeEvent<HTMLInputElement>) => void;
	classes: any;
	type: string;
	onBlur: (event: ChangeEvent<HTMLInputElement>) => void;
	isTopLabel: boolean;
	defaultValue?: string;
	label?: string;
	required?: boolean;
	multiline?: boolean;
	value?: string;
	postfix?: string | number;
	pattern?: string;
	placeholder?: string;
	title: string;
	name: string;
	lang: string;
	minLength: number;
	maxLength: number;
}

interface IState {
	value?: string;
	isControlled: boolean;
}

class TextInput<T> extends React.PureComponent<IInputProps<T>, IState> {
	static defaultProps = {
		onBlur: noop,
		onChange: noop,
		type: 'text',
		isTopLabel: true,
		classes: {},
		value: '',
		title: '',
		name: '',
		lang: 'rus',
		minLength: -1,
		maxLength: -1,
	};

	state = {
		value: this.props.defaultValue,
		isControlled: !!this.props.value,
	};

	onChange: React.ChangeEventHandler<HTMLInputElement> = event => {
		if (this.state.isControlled) {
			this.props.onChange(event);
		} else {
			this.setState({ value: event.target.value });
		}
	};
	onBlur = (event: any) => {
		this.props.onBlur(event);
	};
	public render() {
		return (
			<React.Fragment>
				{this.props.prefix && <FormLabel>{this.props.prefix}</FormLabel>}
				<TextField
					margin="normal"
					value={this.state.isControlled ? this.props.value : this.state.value}
					error={this.props.error}
					helperText={this.props.helperText}
					required={this.props.required}
					multiline={this.props.multiline}
					label={this.props.label}
					placeholder={this.props.placeholder}
					type={this.props.type}
					onBlur={this.onBlur}
					onChange={this.onChange}
					defaultValue={this.props.defaultValue}
					inputProps={{
						lang: this.props.lang,
						maxLength: this.props.maxLength,
						minLength: this.props.minLength,
					}}
					name={this.props.name}
					InputLabelProps={{
						pattern: this.props.pattern,
						title: this.props.title,
						FormLabelClasses: { asterisk: this.props.classes.asterisk },
						shrink: this.props.isTopLabel,
					}}
				/>
			</React.Fragment>
		);
	}
}

export default withStyles(styles)(TextInput);
