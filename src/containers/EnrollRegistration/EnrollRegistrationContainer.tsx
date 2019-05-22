import * as React from 'react';
import EnrollRegistrationView from './EnrollRegistrationView';
import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import {
	IRootState,
	enrollRegistrationSelector,
	dictionaryStateSelector,
	onChangeMiddleName,
	onChangeGender,
	changeFirstName,
	changeLogin,
} from '$store';
import { DictionaryState } from '@mgutm-fcu/dictionary';
import { onChangeTextInput, checkLoginTransaction } from '$store';
import { EDictionaryNameList, IEnrollRegisterStateForm } from '$common';

interface IStateToProps extends IEnrollRegisterStateForm {
	dictionaries: DictionaryState;
}
interface IDispatchToProps {
	onChangeTextInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
	changeMiddleName: (value: string) => void;
	changeGender: (value: number) => void;
	changeFirstName: (value: string, gender: number) => void;
	changeLogin: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
type Props = IStateToProps & IDispatchToProps;
class EnrollRegistrationContainer extends React.Component<Props> {
	onChangeFirstName = (firstName: string) => {
		const firstNamesDictionary = this.props.dictionaries[EDictionaryNameList.FirstNames];
		const person = firstNamesDictionary.values.find(item => item.name === firstName);

		this.props.changeFirstName(firstName, person ? person.sex : 0);
	};
	onChangeTextInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (this.props.statusValidation) {
			this.props.onChangeTextInput(event);
		}
	};
	render() {
		return (
			<EnrollRegistrationView
				onBlurTextInput={this.props.onChangeTextInput}
				data={this.props.data}
				validation={this.props.validation}
				onChangeMiddleName={this.props.changeMiddleName}
				onChangeGender={this.props.changeGender}
				onChangeFirstName={this.onChangeFirstName}
				dictionaries={this.props.dictionaries}
				onChangeTextInput={this.onChangeTextInput}
				onChangeLogin={this.props.changeLogin}
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
		onChangeTextInput: (event: React.ChangeEvent<HTMLInputElement>) => {
			dispatch(onChangeTextInput(event));
		},
		changeMiddleName: (value: string) => {
			dispatch(onChangeMiddleName(value));
		},
		changeGender: (value: number) => {
			dispatch(onChangeGender(value));
		},
		changeFirstName: (value: string, gender: number) => {
			dispatch(changeFirstName(value, gender));
		},
		changeLogin: (event: React.ChangeEvent<HTMLInputElement>) => {
			dispatch(changeLogin(event));
			dispatch(checkLoginTransaction(event.target.value));
		},
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(EnrollRegistrationContainer);
