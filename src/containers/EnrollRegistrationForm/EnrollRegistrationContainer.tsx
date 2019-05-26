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
} from '$store';
import { DictionaryState } from '@mgutm-fcu/dictionary';
import { onChangeTextInput } from '$store';
import { EDictionaryNameList, IEnrollRegisterStateForm } from '$common';
import { enrollCreateNewLogin, findPerson } from '$operations';
import { IFindPersonResponse } from '../../store/transactions/findPerson';

interface IStateToProps extends IEnrollRegisterStateForm {
	dictionaries: DictionaryState;
}
interface IDispatchToProps {
	onChangeTextInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
	changeMiddleName: (value: string) => void;
	changeGender: (value: number) => void;
	changeFirstName: (value: string, gender: number) => void;
	submit: () => void;
}
interface IOwnProps {
	onComplete: () => void;
}
type Props = IStateToProps & IDispatchToProps & IOwnProps;
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
	submit = () => {
		this.props.submit();
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
				submit={this.submit}
			/>
		);
	}
}
const mapStateToProps: MapStateToProps<IStateToProps, {}, IRootState> = state => {
	const dictionaries = dictionaryStateSelector(state);

	const { data, validation, statusValidation } = enrollRegistrationSelector(state);

	return { dictionaries, data, validation, statusValidation };
};

const mapDispatchToProps: MapDispatchToProps<IDispatchToProps, IOwnProps> = (dispatch, ownProps) => {
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
		submit: () => {
			dispatch<any>(enrollCreateNewLogin()).then(() => {
				dispatch<any>(findPerson()).then(ownProps.onComplete);
			});
		},
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(EnrollRegistrationContainer);
