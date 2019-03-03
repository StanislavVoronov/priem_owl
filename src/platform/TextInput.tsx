import {
	composeStyles,
	IDisabled,
	IExtensible,
	IHasError,
	IHelperText,
	ISpacable,
	IStylable,
	makeVerticalSpace,
} from '../common';
import TextField from '@material-ui/core/TextField';
import React from 'react';
import { FormLabel } from '@material-ui/core';

export interface IInputProps extends ISpacable, IStylable, IHasError, IHelperText, IExtensible, IDisabled {
	onChange?: (text: string) => void;
	placeholder?: string;
	type?: 'date' | 'number' | 'text';
	onBlur?: (text: string) => void;
	isTopLabel?: boolean;
	defaultValue?: string;
	label?: string;
	required?: boolean;
	multiline?: boolean;
	value?: string;
	prefix?: string | number;
	postfix?: string | number;
	regExp?: string;
}

class TextInput extends React.PureComponent<IInputProps, { value: string }> {
	state = {
		value: '',
	};
	public static defaultProps = {
		horizontalSpace: 'small',
		verticalSpace: 'small',
		type: 'text',
		required: false,
		isTopLabel: true,
		style: {},
	};
	public onChange = (event: any) => {
		if (this.props.regExp && !new RegExp(this.props.regExp).test(event.target.value)) {
			return;
		}
		this.setState({ value: event.target.value });
		if (this.props.onChange) {
			this.props.onChange(event.target.value);
		}
	};
	public onBlur = (event: any) => {
		if (this.props.onBlur) {
			this.props.onBlur(event.target.value);
		}
	};
	public render() {
		return (
			<React.Fragment>
				{this.props.prefix && <FormLabel>{this.props.prefix}</FormLabel>}
				<TextField
					value={this.state.value}
					error={this.props.hasError}
					helperText={this.props.helperText}
					required={this.props.required}
					multiline={this.props.multiline}
					label={this.props.label}
					placeholder={this.props.placeholder}
					style={composeStyles(makeVerticalSpace(this.props.verticalSpace!), this.props.style)}
					type={this.props.type}
					onBlur={this.onBlur}
					onChange={this.onChange}
					defaultValue={this.props.defaultValue}
					InputLabelProps={{
						shrink: this.props.isTopLabel,
					}}
				/>
			</React.Fragment>
		);
	}
}

export default TextInput;
