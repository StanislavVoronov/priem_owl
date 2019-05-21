import * as React from 'react';
import EnrollRegistrationView from './EnrollRegistrationView';
import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import { IRootState, enrollRegistrationSelector, dictionaryStateSelector } from '$store';
import { DictionaryState } from '@mgutm-fcu/dictionary';
import { updateEnrollRegistrationTextInput } from '$store';
import { IEnrollRegisterForm, IEnrollRegistration } from '$common';
import { ChangeEvent } from 'react';

interface IStateToProps extends IEnrollRegisterForm {
	dictionaries: DictionaryState;
}
interface IDispatchToProps {
	updateTextInput: (event: ChangeEvent<HTMLInputElement>) => void;
}
type Props = IStateToProps & IDispatchToProps;
class EnrollRegistrationContainer extends React.Component<Props> {
	render() {
		return (
			<EnrollRegistrationView
				updateTextInput={this.props.updateTextInput}
				data={this.props.data}
				validation={this.props.validation}
				dictionaries={this.props.dictionaries}
				statusValidation={this.props.statusValidation}
			/>
		);
	}
}
const mapStateToProps: MapStateToProps<IStateToProps, {}, IRootState> = state => {
	const dictionaries = dictionaryStateSelector(state);
	const { data, validation, statusValidation } = enrollRegistrationSelector(state);

	return { dictionaries, data, validation, statusValidation };
};

const mapDispatchToProps: MapDispatchToProps<IDispatchToProps, {}> = (dispatch: any) => {
	return {
		updateTextInput: (event: ChangeEvent<HTMLInputElement>) => {
			dispatch(updateEnrollRegistrationTextInput(event));
		},
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(EnrollRegistrationContainer);
