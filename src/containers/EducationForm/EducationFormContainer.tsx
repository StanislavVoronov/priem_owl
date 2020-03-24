import React from 'react';
import { Form, IFormProps } from '@black_bird/components';
import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import {
	educationFormSelector,
	getEducTypeDocDictionary,
	getGovernmentDictionary,
	getPrevEducTypesDocDictionary,
	IRootState,
	submitEducationFormAction,
} from '$store';
import { IContactsForm, IDictionary, IEducationForm } from '$common';
import { ITransaction } from '@black_bird/utils';
import EducationFormView from './EducationFormView';

interface IPropsState {
	governmentDictionary: ITransaction<IDictionary[]>;
	prevEducDictionary: ITransaction<IDictionary[]>;
	educTypeDocDictionary: ITransaction<IDictionary[]>;
	form: IEducationForm;
}

interface IDispatchToProps {
	submit: (form: IContactsForm) => void;
}

type Props = IPropsState & IDispatchToProps;

class EducationFormContainer extends React.PureComponent<Props> {
	renderForm = (form: IFormProps<any>) => {
		const { educTypeDocDictionary, governmentDictionary, prevEducDictionary } = this.props;

		return (
			<EducationFormView
				prevEducDictionary={prevEducDictionary}
				form={form}
				governmentDictionary={governmentDictionary}
				educTypeDocDictionary={educTypeDocDictionary}
			/>
		);
	};

	render() {
		return (
			<Form
				onSubmit={this.props.submit}
				buttonText="Следующий шаг"
				renderForm={this.renderForm}
				initialValues={this.props.form}
			/>
		);
	}
}

const mapStateToProps: MapStateToProps<IPropsState, {}, IRootState> = state => {
	const governmentDictionary = getGovernmentDictionary(state);
	const prevEducDictionary = getPrevEducTypesDocDictionary(state);
	const educTypeDocDictionary = getEducTypeDocDictionary(state);

	const form = educationFormSelector(state);

	return { form, governmentDictionary, prevEducDictionary, educTypeDocDictionary };
};

const mapDispatchToProps: MapDispatchToProps<IDispatchToProps, {}> = {
	submit: submitEducationFormAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(EducationFormContainer);
