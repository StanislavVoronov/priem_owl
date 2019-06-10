import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { IHasError, IHelperText } from '../../containers/models';
import withStyles from '@material-ui/core/styles/withStyles';
import { Field, FieldProps, FormikProps } from 'formik';
import { has, prop, noop } from '$common';

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
	helperText: {
		color: 'red',
		fontSize: '0.875rem',
	},
	space: {
		marginTop: 16,
	},
};
class RadioButtonGroup extends React.PureComponent<IRadioGroupButton> {
	static defaultProps = {
		classes: {},
		validate: noop,
	};
	onChange = (form: FormikProps<any>) => (event: React.ChangeEvent<{}>, value: string) => {
		form.setFieldValue(this.props.name, value);
	};
	renderButtonGroup = (props: FieldProps) => {
		const { form, field } = props;
		const touched = has(field.name);

		return (
			<div className={this.props.classes.space}>
				<div className={this.props.classes.flexRow}>
					<FormLabel className={this.props.classes.label}>{this.props.title}</FormLabel>
					<FormLabel className={this.props.classes.asterisk}>{this.props.required && '*'}</FormLabel>
				</div>
				<RadioGroup
					aria-label={this.props.name}
					onChange={this.onChange(form)}
					name={this.props.name}
					value={field.value}
					className={this.props.classes.flexRow}>
					{this.props.items.map((item, index) => (
						<FormControlLabel
							key={`${item.value}-${index}`}
							value={item.value.toString()}
							control={<Radio color={item.color} />}
							label={item.label}
						/>
					))}
				</RadioGroup>
				{touched && prop(field.name, form.errors) && (
					<div className={this.props.classes.helperText}>{prop(field.name, form.errors)}</div>
				)}
			</div>
		);
	};
	render() {
		return <Field name={this.props.name} validate={this.props.validate} render={this.renderButtonGroup} />;
	}
}

export default withStyles(localStyles)(RadioButtonGroup);
