import React from 'react';
import { Form, IFormProps } from '@black_bird/components';
import ContactsFormView from './ContactsFormView';
import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import { contactsFormSelector, getGovernmentDictionary, IRootState, submitContactsFormAction } from '$store';
import { IContactsForm, IDictionary } from '$common';
import { ITransaction } from '@black_bird/utils';

interface IPropsState {
	governmentDictionary: ITransaction<IDictionary>;
	form: IContactsForm;
}

interface IDispatchToProps {
	submit: (form: IContactsForm) => void;
}

type Props = IPropsState & IDispatchToProps;

class ContactsFormContainer extends React.PureComponent<Props> {
	renderForm = (form: IFormProps<any>) => {
		return <ContactsFormView form={form} governmentDictionary={this.props.governmentDictionary} />;
	};

	render() {
		return (
			<Form
				onSubmit={this.props.submit}
				buttonText="Далее"
				renderForm={this.renderForm}
				initialValues={this.props.form}
			/>
		);
	}
}

const mapStateToProps: MapStateToProps<IPropsState, {}, IRootState> = state => {
	const governmentDictionary = getGovernmentDictionary(state);

	const form = contactsFormSelector(state);

	return { form, governmentDictionary };
};

const mapDispatchToProps: MapDispatchToProps<IDispatchToProps, {}> = {
	submit: submitContactsFormAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactsFormContainer);
