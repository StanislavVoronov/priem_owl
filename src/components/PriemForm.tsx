import { Form, Formik, FormikProps } from 'formik';
import React from 'react';
import SubmitButton from './Buttons/SubmitButton';
import { IServerError, noop } from '$common';
import { H2 } from '$components';
import LoadingText from './LoadingText';

interface IProps<Values> {
	initialValues: Values;
	schema?: any;
	buttonText?: string;
	onSubmit: (values: any) => void;
	renderForm: (form: FormikProps<Values>) => React.ReactNode | React.ReactNode[];
	error: IServerError | null;
	loading: boolean;
	loadingText: string;
	disabled: (form: FormikProps<Values>) => boolean;
}

class PriemForm<Values> extends React.PureComponent<IProps<Values>> {
	static defaultProps = {
		error: null,
		loading: false,
		loadingText: '',
		onSubmit: noop,
		disabled: () => false,
	};

	renderForm = (form: FormikProps<Values>) => {
		const { buttonText, error, renderForm, loading, loadingText } = this.props;
		if (loading) {
			return <LoadingText>{loadingText}</LoadingText>;
		}

		return (
			<Form noValidate={true} className="flexColumn">
				{renderForm(form)}
				{error && <H2 color="red">{error.message}</H2>}
				{Object.values(form.errors).some(item => {
					if (Array.isArray(item)) {
						return Object.values(item).some(value => !!value);
					}

					return Array.isArray(item) && item.length > 0;
				}) && <H2 color="red">Заполните обязательные поля формы</H2>}
				{buttonText && (
					<div style={{ marginTop: 32 }}>
						<SubmitButton disabled={this.props.disabled(form)}>{buttonText}</SubmitButton>
					</div>
				)}
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
