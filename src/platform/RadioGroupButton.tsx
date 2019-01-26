import React from 'react';

import { FormControlLabel, Radio, RadioGroup, FormControl, FormLabel } from './';

interface IRadioButton {
	label: string;
	value: string | number;
	color?: any; //'primary' | 'secondary'
}
interface IRadioGroupButton {
	currentValue: number | null;
	values: IRadioButton[];
	title: string;
	onChange: (event: any, value: string) => void;
}

const RadionGroupButton = (props: IRadioGroupButton) => {
	return (
		<FormControl style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
			<FormLabel>{props.title}</FormLabel>
			<RadioGroup
				style={{ display: 'flex', flexDirection: 'row', marginLeft: 20 }}
				aria-label="Gender"
				name="gender"
				value={String(props.currentValue)}
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
		</FormControl>
	);
};

export default RadionGroupButton;
