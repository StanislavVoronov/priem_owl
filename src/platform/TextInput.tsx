import { composeStyles, IHasError, IHelperText, ISpacable, IStylable, makeSpace } from '../common';
import TextField from '@material-ui/core/TextField';
import React from 'react';
import { FormLabel } from '@material-ui/core';

export interface IInputProps extends ISpacable, IStylable, IHasError, IHelperText {
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
}

class TextInput extends React.PureComponent<IInputProps> {
	static defaultProps = {
		space: 'v-small',
		type: 'text',
		required: false,
		isTopLabel: true,
		style: {},
	};
	onChange = (event: any) => {
		if (this.props.onChange) {
			this.props.onChange(event.target.value);
		}
	};
	onBlur = (event: any) => {
		if (this.props.onBlur) {
			this.props.onBlur(event.target.value);
		}
	};
	render() {
		return (
			<React.Fragment>
				{this.props.prefix && <FormLabel>{this.props.prefix}</FormLabel>}
				<TextField
					value={this.props.value}
					error={this.props.hasError}
					helperText={this.props.helperText}
					required={this.props.required}
					multiline={this.props.multiline}
					label={this.props.label}
					placeholder={this.props.placeholder}
					style={composeStyles(makeSpace(this.props.space!), this.props.style)}
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
