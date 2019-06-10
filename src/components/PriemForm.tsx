import { Form, Formik, FormikProps } from 'formik';
import React from 'react';
import SubmitButton from './Buttons/SubmitButton';
import { IServerError } from '$common';
import { H2 } from '$components';

interface IProps<Values> {
	initialValues: Values;
	schema: any;
	buttonText: string;
	onSubmit: (values: any) => void;
	renderForm: (form: FormikProps<Values>) => React.ReactNode;
	error: IServerError | null;
}

class PriemForm<Values> extends React.PureComponent<IProps<Values>> {
	static defaultProps = {
		error: null,
	};

	renderForm = (form: FormikProps<Values>) => {
		const { buttonText, error, renderForm } = this.props;
		console.log('form', form);

		return (
			<Form noValidate={true} className="flexColumn">
				{renderForm(form)}
				{error && <H2 color="red">{error.message}</H2>}
				<div style={{ marginTop: 24 }}>
					<SubmitButton>{buttonText}</SubmitButton>
				</div>
			</Form>
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

export default PriemForm;
