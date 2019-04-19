import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { IHasError, IHelperText } from '../models';
import { FormHelperText } from '@material-ui/core';
import './styles.css';
import withStyles from '@material-ui/core/styles/withStyles';

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
	classes: any;
}
const localStyles = {
	asterisk: {
		color: 'red',
		fontSize: '0.775rem',
	},
	label: {
		marginRight: 2,
		fontSize: '0.775rem',
	},
	flexRow: {
		display: 'flex',
		flexDirection: 'row' as any,
	},
	helperText: {
		color: 'red',
		fontSize: '0.875rem',
	},
};
class RadioButtonGroup extends React.PureComponent<IRadioGroupButton> {
	static defaultProps = {
		classes: {},
	};

	render() {
		return (
			<FormControl margin="normal">
				<div className={this.props.classes.flexRow}>
					<FormLabel className={this.props.classes.label}>{this.props.title}</FormLabel>
					<FormLabel className={this.props.classes.asterisk}>{this.props.required && '*'}</FormLabel>
				</div>
				<RadioGroup
					aria-label="Gender"
					name="gender"
					className={this.props.classes.flexRow}
					value={this.props.currentValue}
					onChange={this.props.onChange}>
					{this.props.values.map((item, index) => (
						<FormControlLabel
							key={`${item.value}-${index}`}
							value={item.value.toString()}
							control={<Radio color={item.color} />}
							label={item.label}
						/>
					))}
				</RadioGroup>
				{this.props.helperText && (
					<FormHelperText className={this.props.hasError && this.props.classes.helperText}>
						{this.props.helperText}
					</FormHelperText>
				)}
			</FormControl>
		);
	}
}

export default withStyles(localStyles)(RadioButtonGroup);
