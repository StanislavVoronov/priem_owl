import * as React from 'react';
import RegistrationView from './RegistrationView';
import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import {
	IRootState,
	enrollRegistrationSelector,
	dictionaryStateSelector,
	onChangeMiddleName,
	onChangeGender,
	changeFirstName,
	updateRegFormTextInput,
} from '$store';
import { DictionaryState } from '@mgutm-fcu/dictionary';
import { EDictionaryNameList, IEnrollRegForm, IForm, IInvalidData } from '$common';
import { enrollCreateNewLogin, findPerson } from '$operations';

interface IStateToProps extends IEnrollRegForm, IInvalidData<IEnrollRegForm> {
	dictionaries: DictionaryState;
	statusValidation: boolean;
}
interface IDispatchToProps {
	onChangeTextInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
	onChangeMiddleName: (value: string) => void;
	onChangeGender: (value: number) => void;
	onChangeFirstName: (value: string, gender: number) => void;
	submit: () => void;
}
interface IOwnProps {
	submit: () => void;
}
type Props = IStateToProps & IDispatchToProps & IOwnProps;
class EnrollRegistrationContainer extends React.Component<Props> {
	onChangeFirstName = (firstName: string) => {
		const firstNamesDictionary = this.props.dictionaries[EDictionaryNameList.FirstNames];
		const person = firstNamesDictionary.values.find(item => item.name === firstName);

		this.props.onChangeFirstName(firstName, person ? person.sex : 0);
	};
	onChangeTextInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (this.props.statusValidation) {
			this.props.onChangeTextInput(event);
		}
	};
	onBlurTextInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		this.props.onChangeTextInput(event);
	};

	submit = () => {
		this.props.submit();
	};
	render() {
		return (
			<RegistrationView
				{...this.props}
				onChangeFirstName={this.onChangeFirstName}
				onChangeTextInput={this.onChangeTextInput}
				submit={this.submit}
				onBlurTextInput={this.onBlurTextInput}
			/>
		);
	}
}
const mapStateToProps: MapStateToProps<IStateToProps, {}, IRootState> = state => {
	const dictionaries = dictionaryStateSelector(state);

	const { data, statusValidation } = enrollRegistrationSelector(state);
	const validation = { lastName: '', middleName: '', firstName: '', birthday: '', gender: '' };

	return { dictionaries, ...data, validation, statusValidation };
};

const mapDispatchToProps: MapDispatchToProps<IDispatchToProps, IOwnProps> = (dispatch, ownProps) => {
	return {
		onChangeTextInput: (event: React.ChangeEvent<HTMLInputElement>) => {
			dispatch(updateRegFormTextInput(event));
		},
		onChangeMiddleName: (value: string) => {
			dispatch(onChangeMiddleName(value));
		},
		onChangeGender: (value: number) => {
			dispatch(onChangeGender(value));
		},
		onChangeFirstName: (value: string, gender: number) => {
			dispatch(changeFirstName(value, gender));
		},
		submit: () => {
			dispatch<any>(enrollCreateNewLogin()).then(() => {
				dispatch<any>(findPerson()).then(ownProps.submit);
			});
		},
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(EnrollRegistrationContainer);
