import * as React from 'react';
import RegistrationView from './RegistrationView';
import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import { IRootState, enrollRegistrationSelector, dictionaryStateSelector, fromTransaction } from '$store';
import { DictionaryState } from '@mgutm-fcu/dictionary';
import { IEnrollRegForm, IServerError } from '$common';
import { onCompleteRegistrationForm } from '$operations';

interface IStateToProps {
	dictionaries: DictionaryState;
	error: IServerError | null;
	loading: boolean;
	data: IEnrollRegForm;
	personExists: boolean;
}
interface IDispatchToProps {
	submit: (values: IEnrollRegForm) => Promise<void>;
}
interface IOwnProps {
	onComplete: () => void;
}
type Props = IStateToProps & IDispatchToProps & IOwnProps;
class EnrollRegistrationContainer extends React.Component<Props> {
	submit = (values: IEnrollRegForm) => {
		this.props.submit(values).then(this.props.onComplete);
	};
	render() {
		return (
			<RegistrationView
				data={this.props.data}
				personExists={this.props.personExists}
				loading={this.props.loading}
				dictionaries={this.props.dictionaries}
				error={this.props.error}
				submit={this.submit}
			/>
		);
	}
}
const mapStateToProps: MapStateToProps<IStateToProps, {}, IRootState> = state => {
	const dictionaries = dictionaryStateSelector(state);

	const data = enrollRegistrationSelector(state);
	const { error, loading, result } = fromTransaction.findPersonSelector(state);

	return {
		dictionaries,
		data,
		error: result
			? {
					code: '',
					message:
						'Абитуриент уже зарегистрирован в системе. Просьба, обратиться в приемную комиссию только для подачи заявлений на поступление',
			  }
			: error,
		loading,
		personExists: result,
	};
};

const mapDispatchToProps: MapDispatchToProps<IDispatchToProps, IOwnProps> = dispatch => {
	return {
		submit: (values: IEnrollRegForm) => {
			return dispatch<any>(onCompleteRegistrationForm(values));
		},
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(EnrollRegistrationContainer);
