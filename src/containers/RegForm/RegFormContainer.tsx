import * as React from 'react';
import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import { IException, isNotVoid, ITransaction } from '@black_bird/utils';
import { Form, IFormProps } from '@black_bird/components';
import RegFormView from './RegFormView';
import {
	IRootState,
	regFormSelector,
	submitRegFormAction,
	getMiddleNamesDictionary,
	getFirstNamesDictionary,
	isUniqueLoginTransactionSelector,
	isPersonFoundTransactionSelector,
	createLoginTransactionSelector,
	verPersonContactsTrnSelector,
	verPersonTrnSelector,
} from '$store';
import { IRegForm, INamesDictionary } from '$common';
import { setExistPersonVerCodeTrnSelector } from '../../store/transactions/setExistsPersonVerCode';

interface IStateToProps {
	firstNameDictionary: ITransaction<INamesDictionary[]>;
	middleNameDictionary: ITransaction<INamesDictionary[]>;
	error: IException | null;
	loading: boolean;
	form: IRegForm;
	email?: string;
}
interface IDispatchToProps {
	onSubmit: (values: IRegForm) => void;
}

type Props = IStateToProps & IDispatchToProps;
class EnrollRegistrationContainer extends React.Component<Props> {
	disabledForm = () => {
		return this.props.loading;
	};
	renderForm = (form: IFormProps<IRegForm>) => {
		const { firstNameDictionary, email, middleNameDictionary } = this.props;

		return (
			<RegFormView
				form={form}
				email={email}
				firstNameDictionary={firstNameDictionary}
				middleNameDictionary={middleNameDictionary}
			/>
		);
	};
	render() {
		const { onSubmit, form, email, error, loading } = this.props;

		return (
			<Form
				error={error}
				loading={loading}
				loadingText="Поиск личного дела"
				renderForm={this.renderForm}
				disabled={this.disabledForm}
				onSubmit={onSubmit}
				initialValues={form}
				buttonText={email ? 'Подтвердить учетную запись' : 'Проверить личное дело'}
			/>
		);
	}
}
const mapStateToProps: MapStateToProps<IStateToProps, {}, IRootState> = (state) => {
	const firstNameDictionary = getFirstNamesDictionary(state);
	const middleNameDictionary = getMiddleNamesDictionary(state);

	const uniqueLoginTransaction = isUniqueLoginTransactionSelector(state);
	const createLoginTransaction = createLoginTransactionSelector(state);
	const form = regFormSelector(state);
	const findPersonTransaction = isPersonFoundTransactionSelector(state);
	const verPersonContacts = verPersonContactsTrnSelector(state);
	const verPerson = verPersonTrnSelector(state);
	const setExistPersonVerCode = setExistPersonVerCodeTrnSelector(state);

	return {
		firstNameDictionary,
		middleNameDictionary,
		form,
		email: verPersonContacts.result?.email,
		error:
			uniqueLoginTransaction.exception ||
			createLoginTransaction.exception ||
			verPerson.exception ||
			verPersonContacts.exception ||
			setExistPersonVerCode.exception,
		loading:
			uniqueLoginTransaction.isFetching ||
			createLoginTransaction.isFetching ||
			findPersonTransaction.isFetching ||
			verPersonContacts.isFetching ||
			setExistPersonVerCode.isFetching ||
			verPerson.isFetching,
	};
};

const mapDispatchToProps: MapDispatchToProps<IDispatchToProps, {}> = {
	onSubmit: submitRegFormAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(EnrollRegistrationContainer);
