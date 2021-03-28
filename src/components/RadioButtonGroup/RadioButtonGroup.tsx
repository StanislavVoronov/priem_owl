import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { IHasError, IHelperText } from '../../containers/models';

import { noop } from '$common';
import { IFormField } from '@black_bird/components';
import classes from './RadioButtonGroup.module.css';

interface IRadioButton {
	label: string;
	value: string | number;
	color?: any; // 'primary' | 'secondary'
}
interface IRadioGroupButton extends IHelperText, IHasError {
	required?: boolean;
	items: IRadioButton[];
	title: string;
	helperText?: string;
	validate: (value: string) => string | void;
	classes: any;
	name: string;
	onChange: (data: IFormField<string>) => void;
	value: string;
}
const localStyles = {
	asterisk: {
		color: 'red',
		fontSize: '0.775rem',
	},
	label: {
		marginRight: 3,
		fontSize: '0.775rem',
	},
	flexRow: {
		display: 'flex',
		flexDirection: 'row' as any,
	},
	group: {
		display: 'flex',
		flexDirection: 'row' as any,
		paddingLeft: '12px',
	},
	helperText: {
		color: 'red',
		fontSize: '0.875rem',
	},
};
class RadioButtonGroup extends React.PureComponent<IRadioGroupButton> {
	static defaultProps = {
		classes: {},
		validate: noop,
	};
	onChange = (event: React.ChangeEvent<{}>, value: string) => {
		this.props.onChange({ name: this.props.name, value });
	};
	render() {
		const { value, name, items } = this.props;

		return (
			<div className="spaceHorMiddle">
				<div className="flexRow">
					<FormLabel className={classes.label}>{this.props.title}</FormLabel>
					<FormLabel className="asterisk">{this.props.required && '*'}</FormLabel>
				</div>
				<RadioGroup
					aria-label={this.props.name}
					onChange={this.onChange}
					name={name}
					value={value}
					className={classes.group}>
					{items.map((item, index) => (
						<FormControlLabel
							key={`${item.value}-${index}`}
							value={item.value}
							classes={{ root: classes.radioLabel }}
							control={<Radio classes={{ root: classes.radio }} color={item.color} />}
							label={item.label}
						/>
					))}
				</RadioGroup>
			</div>
		);
	}
}

export default RadioButtonGroup;
