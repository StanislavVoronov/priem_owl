import { ISpacable, IStylable, makeSpace } from '../common';
import TextField from '@material-ui/core/TextField';
import React from 'react';

export interface IInputProps extends ISpacable, IStylable {
	onChange?: (text: string) => void;
	placeholder?: string;
	type?: 'date' | 'number' | 'text';
	onBlur?: (text: string) => void;
	isTopLabel?: boolean;
	defaultValue?: string;
	label?: string;
	required?: boolean;
	multiline?: boolean;
}

class TextInput extends React.PureComponent<IInputProps> {
	static defaultProps = {
		space: 'small',
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
		console.log('proprs', this.props);
		return (
			<TextField
				required={this.props.required}
				multiline={this.props.multiline}
				label={this.props.label}
				placeholder={this.props.placeholder}
				style={Object.assign(makeSpace(this.props.space), this.props.style)}
				type={this.props.type}
				onBlur={this.onBlur}
				onChange={this.onChange}
				defaultValue={this.props.defaultValue}
				InputLabelProps={{
					shrink: this.props.isTopLabel,
				}}
			/>
		);
	}
}

export default TextInput;
