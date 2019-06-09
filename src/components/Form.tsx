import { FieldProps, Formik, FormikProps } from 'formik';
import React from 'react';
import SubmitButton from './Buttons/SubmitButton';
import { IServerError } from '$common';
import { H2 } from '$components';

interface IProps<Values> {
	initialValues: Values;
	schema: any;
	buttonText: string;
	onSubmit: (values: any) => void;
	renderForm: (formikProps: FieldProps) => React.ReactNode;
	error: IServerError | null;
}

class Form<Values> extends React.PureComponent<IProps<Values>> {
	static defaultProps = {
		error: null,
	};
	renderForm = (formikProps: FieldProps) => {
		const { buttonText, error, renderForm } = this.props;

		return (
			<div className="flexColumn">
				{renderForm(formikProps)}
				{error && <H2 color="red">{error.message}</H2>}
				<div style={{ marginTop: 24 }}>
					<SubmitButton>{buttonText}</SubmitButton>
				</div>
			</div>
		);
	};
	render() {
		const { schema, onSubmit, initialValues } = this.props;

		return (
			<Formik
				validationSchema={schema}
				onSubmit={onSubmit}
				validateOnBlur={false}
				validateOnChange={false}
				initialValues={initialValues}>
				{this.renderForm}
			</Formik>
		);
	}
}

export default Form;
