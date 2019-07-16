import * as React from 'react';
import RegistrationView from './RegistrationView';
import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import {
	IRootState,
	enrollRegistrationSelector,
	dictionaryStateSelector,
	fromTransaction,
	enrollSubmitRegFormAction,
} from '$store';
import { DictionaryState } from '@mgutm-fcu/dictionary';
import { IEnrollRegForm, IServerError } from '$common';

interface IStateToProps {
	dictionaries: DictionaryState;
	error: IServerError | null;
	loading: boolean;
	data: IEnrollRegForm;
	personExists: boolean;
}
interface IDispatchToProps {
	onSubmit: (values: IEnrollRegForm) => void;
}
interface IOwnProps {
	onComplete: () => void;
}
type Props = IStateToProps & IDispatchToProps & IOwnProps;
class EnrollRegistrationContainer extends React.Component<Props> {
	onSubmit = (values: IEnrollRegForm) => {
		this.props.onSubmit(values);
	};
	render() {
		return (
			<RegistrationView
				data={this.props.data}
				personExists={this.props.personExists}
				loading={this.props.loading}
				dictionaries={this.props.dictionaries}
				error={this.props.error}
				submit={this.onSubmit}
			/>
		);
	}
}
const mapStateToProps: MapStateToProps<IStateToProps, {}, IRootState> = state => {
	const dictionaries = dictionaryStateSelector(state);

	const data = enrollRegistrationSelector(state);
	const { error, loading, result } = fromTransaction.findPerson(state);

	return {
		dictionaries,
		data,
		error: result
			? {
					code: '',
					message:
						'Абитуриент уже зарегистрирован в системе. Просьба, обратиться в приемную комиссию для подачи заявлений на поступление',
			  }
			: error,
		loading,
		personExists: result,
	};
};

const mapDispatchToProps: MapDispatchToProps<IDispatchToProps, IOwnProps> = (dispatch, ownProps) => {
	return {
		onSubmit: (values: IEnrollRegForm) => {
			dispatch(enrollSubmitRegFormAction(values));
			ownProps.onComplete();
		},
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(EnrollRegistrationContainer);
