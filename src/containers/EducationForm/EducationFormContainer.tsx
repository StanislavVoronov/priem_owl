import React from 'react';
import { Form, IFormProps } from '@black_bird/components';
import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import {
	educationFormSelector,
	firstHighEducChanged,
	getEducTypeDocDictionary,
	getGovernmentDictionary,
	getPrevEducTypesDocDictionary,
	IRootState,
	submitEducationFormAction,
} from '$store';
import { IContactsForm, IDictionary, IEducationForm, IPersonForm } from '$common';
import { isVoid, ITransaction } from '@black_bird/utils';
import EducationFormView from './EducationFormView';

interface IPropsState {
	governmentDictionary: ITransaction<IDictionary[]>;
	prevEducDictionary: ITransaction<IDictionary[]>;
	educTypeDocDictionary: ITransaction<IDictionary[]>;
	form: IEducationForm;
}

interface IDispatchToProps {
	submit: (form: IContactsForm) => void;
	onChangeFirstHighEduc: (value: boolean) => void;
}

type Props = IPropsState & IDispatchToProps;

class EducationFormContainer extends React.PureComponent<Props> {
	disabledForm = ({ values }: { values: IEducationForm }) => {
		return isVoid(values.document.file);
	};

	renderForm = (form: IFormProps<any>) => {
		const { educTypeDocDictionary, governmentDictionary, prevEducDictionary, onChangeFirstHighEduc } = this.props;

		return (
			<EducationFormView
				prevEducDictionary={prevEducDictionary}
				form={form}
				governmentDictionary={governmentDictionary}
				educTypeDocDictionary={educTypeDocDictionary}
				onChangeFirstHighEduc={onChangeFirstHighEduc}
			/>
		);
	};

	render() {
		const { form, submit } = this.props;

		return (
			<Form
				disabled={this.disabledForm}
				onSubmit={submit}
				buttonText="Следующий шаг"
				renderForm={this.renderForm}
				initialValues={form}
			/>
		);
	}
}

const mapStateToProps: MapStateToProps<IPropsState, {}, IRootState> = (state) => {
	const governmentDictionary = getGovernmentDictionary(state);
	const prevEducDictionary = getPrevEducTypesDocDictionary(state);
	const educTypeDocDictionary = getEducTypeDocDictionary(state);

	const form = educationFormSelector(state);

	return { form, governmentDictionary, prevEducDictionary, educTypeDocDictionary };
};

const mapDispatchToProps: MapDispatchToProps<IDispatchToProps, {}> = {
	submit: submitEducationFormAction,
	onChangeFirstHighEduc: firstHighEducChanged,
};

export default connect(mapStateToProps, mapDispatchToProps)(EducationFormContainer);
