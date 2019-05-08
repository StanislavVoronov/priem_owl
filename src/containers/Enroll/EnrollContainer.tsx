import {
	IContactsForm,
	IDocument,
	IEducationForm,
	inputValueAsString,
	IPersonForm,
	IRegisterForm,
	IServerError,
	IPerson,
	defaultContactsDataForm,
	defaultEducationDataForm,
	defaultPersonDataForm,
	defaultRegisterDataForm,
	validateRegistrationForm,
	EnrollForms,
} from '$common';
import EnrollView from './EnrollView';
import Dictionary, { IDictionary } from '@mgutm-fcu/dictionary';
import * as React from 'react';
import { connect, MapStateToProps } from 'react-redux';
import { dictionariesSelector, enrollStateSelector } from './selectors';
import { checkPerson, checkLogin, registerNewPerson, createPerson, sendVerificationCode } from './operations';
import { FULL_DICTIONARY_LIST, NEW_PERSON_STEPS, SHORT_DICTIONARY_LIST } from './constants';
import { ChangeEvent } from 'react';
import { IEnrollForm } from './models';
import { IRootState } from '$store';

interface IDispatchToProps {
	registerNewPerson: (login: string, password: string) => Promise<number>;
	checkLogin(login: string): Promise<boolean>;
	sendVerificationCode(email: string, mobPhone: string): Promise<void>;
	createPerson(confirmCode: string, data: IEnrollForm): void;
	checkPerson(data: IPerson): Promise<void>;
}
interface IStateToProps {
	loading: boolean;
	registrationCompleted: boolean;
	createPersonError: IServerError | null;
	npId: number;
	checkPersonError: IServerError | null;
	checkLoginError: IServerError | null;
	verifyPersonError: IServerError | null;
	dictionaries: Record<string, IDictionary>;
}
type IProps = IDispatchToProps & IStateToProps;

interface IState extends IEnrollForm {
	passedStep: number;
	activeStep: number;
	confirmCode: string;
}

class EnrollContainer extends React.Component<IProps, IState> {
	state: IState = {
		passedStep: 0,
		activeStep: 0,
		confirmCode: '',
		registrationData: defaultRegisterDataForm,
		personData: defaultPersonDataForm,
		contactsData: defaultContactsDataForm,
		educationData: defaultEducationDataForm,
		documents: [],
	};
	public componentDidCatch(error: any, info: any) {
		// You can also log the error to an error reporting service
	}
	public handleNext = () => {
		const nextStep = this.state.activeStep + 1;
		this.setState({ activeStep: nextStep, passedStep: nextStep });
	};
	handleStep = (step: number) => () => {
		this.setState({
			activeStep: step,
		});
	};
	onCheckPerson = () => {
		const { lastName, middleName, birthday, firstName, gender } = this.state.registrationData;
		this.props.checkPerson({ firstName, lastName, birthday, middleName, gender }).then(this.handleNext);
	};
	submit = () => {
		switch (this.state.activeStep) {
			case 0: {
				const { registrationData } = this.state;
				this.props.registerNewPerson(registrationData.login, registrationData.password).then(this.onCheckPerson);
			}
		}
	};
	onChangeConfirmCode = (event: ChangeEvent<HTMLInputElement>) => {
		this.setState({ confirmCode: inputValueAsString(event) });
	};
	updateEducationForm = (newData: Partial<IEducationForm>) => {
		this.setState({ educationData: { ...this.state.educationData, ...newData } });
	};
	updatePersonForm = (newData: Partial<IPersonForm>) => {
		this.setState({ personData: { ...this.state.personData, ...newData } });
	};
	updateContactsForm = (newData: Partial<IContactsForm>) => {
		this.setState({ contactsData: { ...this.state.contactsData, ...newData } });
	};
	updateRegisterForm = (newData: Partial<IRegisterForm>) => {
		this.setState({ registrationData: { ...this.state.registrationData, ...newData } });
	};
	updateDocumentsForm = (documents: IDocument[]) => {
		this.setState({ documents });
	};
	render() {
		return (
			<Dictionary
				version={2}
				url={'/dev-bin/priem_api.fcgi'}
				list={this.props.npId ? FULL_DICTIONARY_LIST : SHORT_DICTIONARY_LIST}>
				<EnrollView
					loading={this.props.loading}
					updateEducationForm={this.updateEducationForm}
					updatePersonForm={this.updatePersonForm}
					updateContactsForm={this.updateContactsForm}
					updateRegisterForm={this.updateRegisterForm}
					updateDocumentsForm={this.updateDocumentsForm}
					createPersonError={this.props.createPersonError}
					dictionaries={this.props.dictionaries}
					registrationData={this.state.registrationData}
					contactsData={this.state.contactsData}
					educationData={this.state.educationData}
					documents={this.state.documents}
					personData={this.state.personData}
					activeStep={this.state.activeStep}
					passedStep={this.state.passedStep}
					handleStep={this.handleStep}
					submit={this.submit}
					steps={NEW_PERSON_STEPS}
					onChangeConfirmCode={this.onChangeConfirmCode}
				/>
			</Dictionary>
		);
	}
}

const mapStateToProps: MapStateToProps<IStateToProps, {}, IRootState> = state => {
	const {
		npId,
		checkPersonError,
		createPersonFetching,
		createPersonError,
		checkLoginError,
		checkPersonFetching,
		verifyPersonError,
		registrationCompleted,
		verifyPersonFetching,
	} = enrollStateSelector(state);
	const dictionaries = dictionariesSelector(state);

	return {
		loading: checkPersonFetching || createPersonFetching || verifyPersonFetching,
		registrationCompleted,
		createPersonError,
		npId,
		checkPersonError,
		checkLoginError,
		verifyPersonError,
		dictionaries,
	};
};

const mapDispatchToProps = {
	registerNewPerson,
	checkLogin,
	createPerson,
	sendVerificationCode,
	checkPerson,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(EnrollContainer);
