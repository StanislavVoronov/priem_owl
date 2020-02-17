import * as React from 'react';
import RegFormView from './RegFormView';
import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import { IRootState, regFormSelector, dictionaryStateSelector, fromTransaction, submitRegFormAction } from '$store';
import { IRegForm, IServerError } from '$common';

interface IStateToProps {
	dictionaries: any;
	error: IServerError | null;
	loading: boolean;
	data: IRegForm;
}
interface IDispatchToProps {
	onSubmit: (values: IRegForm) => void;
}

type Props = IStateToProps & IDispatchToProps;
class EnrollRegistrationContainer extends React.Component<Props> {
	onSubmit = (values: IRegForm) => {
		this.props.onSubmit(values);
	};
	render() {
		return (
			<RegFormView
				data={this.props.data}
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

	const data = regFormSelector(state);
	const { error, loading } = fromTransaction.findPerson(state);

	return {
		dictionaries,
		data,
		error,
		loading,
	};
};

const mapDispatchToProps: MapDispatchToProps<IDispatchToProps, {}> = {
	onSubmit: submitRegFormAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(EnrollRegistrationContainer);
