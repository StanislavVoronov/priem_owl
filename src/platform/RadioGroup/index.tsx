import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { IHasError, IHelperText } from '../../common';
import { FormHelperText } from '@material-ui/core';
import './styles.css';

interface IRadioButton {
	label: string;
	value: string | number;
	color?: any; // 'primary' | 'secondary'
}
interface IRadioGroupButton extends IHelperText, IHasError {
	required?: boolean;
	currentValue: string;
	values: IRadioButton[];
	title: string;
	helperText?: string;
	onChange: (event: any, value: string) => void;
}

const Index = (props: IRadioGroupButton) => {
	return (
		<FormControl margin="normal">
			<FormLabel style={{ color: props.hasError ? 'red' : 'black' }}>
				{props.title}
				{props.required && '*'}
			</FormLabel>
			<RadioGroup
				style={{ flexDirection: 'row' }}
				aria-label="Gender"
				name="gender"
				className="radioGroup"
				value={props.currentValue}
				onChange={props.onChange}>
				{props.values.map((item, index) => (
					<FormControlLabel
						className="controlLabel"
						key={`${item.value}-${index}`}
						value={item.value.toString()}
						control={<Radio color={item.color} />}
						label={item.label}
					/>
				))}
			</RadioGroup>
			{props.helperText && (
				<FormHelperText classes={{ root: 'helperText' }} style={{ color: props.hasError ? 'red' : 'black' }}>
					{props.helperText}
				</FormHelperText>
			)}
		</FormControl>
	);
};

export default Index;
