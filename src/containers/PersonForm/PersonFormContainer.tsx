import React from 'react';
import { Form, IFormProps } from '@black_bird/components';
import { ITransaction } from '@black_bird/utils';

import { IDictionary, IPersonForm } from '$common';

import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import {
	personFormSelector,
	getGovernmentDictionary,
	getPersonTypesDocDictionary,
	getTypesDocsDictionary,
	IRootState,
	submitPersonFormAction,
} from '$store';
import { PersonFormView } from './PersonFormView';

interface IStateToProps {
	form: IPersonForm;
	personTypesDocsDictionary: ITransaction<IDictionary>;
	typesDocsDictionary: ITransaction<IDictionary>;
	governmentDictionary: ITransaction<IDictionary>;
}
interface IDispatchToProps {
	submit: (values: IPersonForm) => void;
}

type IProps = IStateToProps & IDispatchToProps;

const PersonFormContainer = (props: IProps) => {
	const renderForm = (form: IFormProps<any>) => {
		return (
			<PersonFormView
				typesDocsDictionary={props.typesDocsDictionary}
				personTypesDocsDictionary={props.personTypesDocsDictionary}
				governmentDictionary={props.governmentDictionary}
				form={form}
			/>
		);
	};

	return (
		<Form onSubmit={props.submit} buttonText="Далее" renderForm={renderForm} initialValues={props.form} />
	);
};

const mapStateToProps: MapStateToProps<IStateToProps, {}, IRootState> = state => {
	const personTypesDocsDictionary = getPersonTypesDocDictionary(state);
	const typesDocsDictionary = getTypesDocsDictionary(state);
	const governmentDictionary = getGovernmentDictionary(state);

	const form = personFormSelector(state);

	return { form, personTypesDocsDictionary, typesDocsDictionary, governmentDictionary };
};

const mapDispatchToProps: MapDispatchToProps<IDispatchToProps, {}> = {
	submit: submitPersonFormAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(PersonFormContainer);
