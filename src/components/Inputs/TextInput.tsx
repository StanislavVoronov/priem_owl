import { IDisabled, IHasError, IHelperText } from '../models';
import TextField from '@material-ui/core/TextField';
import React, { ChangeEvent, ReactText } from 'react';
import { FormLabel, withStyles } from '@material-ui/core';
import { noop } from 'lodash';
import styles from './styles';

export interface IInputProps extends IHasError, IHelperText, IDisabled {
	onChange: (event: ChangeEvent<HTMLInputElement>) => void;
	classes: any;
	type: string;
	onBlur: (event: ChangeEvent<HTMLInputElement>) => void;
	isTopLabel: boolean;
	defaultValue?: ReactText;
	label?: string;
	required?: boolean;
	multiline?: boolean;
	value?: string;
	prefix?: string | number;
	postfix?: string | number;
	regExp?: string;
	placeholder?: string;
}

interface IState {
	value?: string;
	isControlled: boolean;
}
class TextInput<T> extends React.PureComponent<IInputProps, IState> {
	static defaultProps = {
		onBlur: noop,
		onChange: noop,
		type: 'text',
		isTopLabel: true,
		classes: {},
	};

	state = {
		value: this.props.value,
		isControlled: !!this.props.value,
	};

	public onChange: React.ChangeEventHandler<HTMLInputElement> = event => {
		if (event.target.value.length && this.props.regExp && !new RegExp(this.props.regExp).test(event.target.value)) {
			return;
		}
		if (!this.state.isControlled) {
			this.setState({ value: event.target.value });
		}
		this.props.onChange(event);
	};
	onBlur: React.ChangeEventHandler<HTMLInputElement> = event => {
		this.props.onBlur(event);
	};
	public render() {
		return (
			<React.Fragment>
				{this.props.prefix && <FormLabel>{this.props.prefix}</FormLabel>}
				<TextField
					margin="normal"
					value={this.state.isControlled ? this.props.value : this.state.value}
					error={this.props.hasError}
					helperText={this.props.helperText}
					required={this.props.required}
					multiline={this.props.multiline}
					label={this.props.label}
					placeholder={this.props.placeholder}
					type={this.props.type}
					onBlur={this.onBlur}
					onChange={this.onChange}
					defaultValue={this.props.defaultValue}
					InputLabelProps={{
						FormLabelClasses: { asterisk: this.props.classes.asterisk },
						shrink: this.props.isTopLabel,
					}}
				/>
			</React.Fragment>
		);
	}
}

export default withStyles(styles)(TextInput);
