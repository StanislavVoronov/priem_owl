import React from 'react';

import { FormControlLabel, Radio, RadioGroup, FormControl, FormLabel } from './';
import { composeStyles, IHasError, IHelperText, makeVerticalSpace } from '../common';
import { FormHelperText } from '@material-ui/core';
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

const RadionGroupButton = (props: IRadioGroupButton) => {
	return (
		<FormControl style={{ display: 'flex', flexDirection: 'column', marginTop: 15, marginBottom: 15 }}>
			<FormLabel style={{ color: props.hasError ? 'red' : 'black' }}>
				{props.title}
				{props.required && '*'}
			</FormLabel>
			<RadioGroup
				style={{ display: 'flex', flexDirection: 'row', marginLeft: 20 }}
				aria-label="Gender"
				name="gender"
				value={props.currentValue}
				onChange={props.onChange}>
				{props.values.map((item, index) => (
					<FormControlLabel
						key={`${item.value}-${index}`}
						value={item.value.toString()}
						control={<Radio color={item.color} />}
						label={item.label}
					/>
				))}
			</RadioGroup>
			{props.helperText && (
				<FormHelperText style={{ marginTop: 0, color: props.hasError ? 'red' : 'black' }}>
					{props.helperText}
				</FormHelperText>
			)}
		</FormControl>
	);
};

export default RadionGroupButton;
