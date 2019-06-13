import React from 'react';
import { withStyles, FormControlLabel } from '@material-ui/core';
import CheckboxMaterial from '@material-ui/core/Checkbox';
import { FormikProps, Field, FieldProps } from 'formik';
import { IStylable, prop } from '$common';
import { H2 } from '$components';
const styles = {
	checkFormControl: {
		marginTop: 10,
		marginBottom: 4,
		fontSize: '1em',
	},
};
interface IProps extends IStylable {
	name: string;
	onChange?: (checked: boolean) => void;
	label: React.ReactNode;
}

const Checkbox = (props: IProps) => {
	const onChangeStatus = (form: FormikProps<boolean>) => (event: any, checked: boolean) => {
		form.setFieldValue(props.name, checked);
		if (props.onChange) {
			props.onChange(checked);
		}
	};

	const renderCheckbox = ({ field, form }: FieldProps) => {
		const error = prop(props.name, form.errors);

		return (
			<>
				<FormControlLabel
					className={props.classes.checkFormControl}
					onChange={onChangeStatus(form)}
					control={<CheckboxMaterial color="primary" checked={field.value} name={props.name} />}
					label={props.label}
				/>
				{error && <span style={{ fontSize: 0.875, color: 'red' }}>{error}</span>}
			</>
		);
	};

	return <Field name={props.name} render={renderCheckbox} />;
};

export default withStyles(styles)(Checkbox);
