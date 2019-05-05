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
	checkLogin(login: string): void;
	sendVerificationCode(email: string, mobPhone: string): Promise<void>;
	createPerson(confirmCode: string, data: IEnrollForm): void;
	checkPerson(data: IPerson): Promise<void>;
}
interface IStateToProps {
	createPersonFetching: boolean;
	createPersonError: IServerError | null;
	npId: number;
	checkPersonError: IServerError | null;
	checkLoginError: IServerError | null;
	verifyPersonError: IServerError | null;
	verifyPersonFetching: boolean;
	checkPersonFetching: boolean;
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
		activeStep: 4,
		confirmCode: '',
		registerData: defaultRegisterDataForm,
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
		const { lastName, middleName, birthday, firstName, gender } = this.state.registerData;
		this.props.checkPerson({ firstName, lastName, birthday, middleName, gender }).then(this.handleNext);
	};
	submitRegisterDataForm = (registerData: IRegisterForm) => {
		this.setState({ registerData });
		this.props.registerNewPerson(registerData.login, registerData.password).then(this.onCheckPerson);
	};
	submitAddDocumentsDataForm = (documents: IDocument[]) => {
		this.setState({ documents });
		this.handleNext();
	};
	submitPersonDataForm = (personData: IPersonForm) => {
		this.setState({ personData });
		this.handleNext();
	};
	submitContactsDataForm = (contactsData: IContactsForm) => {
		this.setState({ contactsData });
		this.props.sendVerificationCode(contactsData.email, contactsData.mobPhone).then(this.handleNext);
	};
	submitEducationDataForm = (educationData: IEducationForm) => {
		this.setState({ educationData });
		this.handleNext();
	};
	onChangeConfirmationCode = (event: ChangeEvent<HTMLInputElement>) => {
		this.setState({ confirmCode: inputValueAsString(event) });
	};
	onCheckLogin = (login: string) => {
		this.props.checkLogin(login);
	};
	onConfirmCode = () => {
		this.props.createPerson(this.state.confirmCode, {
			registerData: this.state.registerData,
			contactsData: this.state.contactsData,
			personData: this.state.personData,
			documents: this.state.documents,
			educationData: this.state.educationData,
		});
	};
	render() {
		return (
			<Dictionary
				version={2}
				url={'/dev-bin/priem_api.fcgi'}
				list={this.props.npId ? FULL_DICTIONARY_LIST : SHORT_DICTIONARY_LIST}>
				<EnrollView
					npId={this.props.npId}
					createPersonError={this.props.createPersonError}
					createPersonFetching={this.props.createPersonFetching}
					dictionaries={this.props.dictionaries}
					defaultRegisterData={this.state.registerData}
					defaultPersonData={this.state.personData}
					defaultEducationData={this.state.educationData}
					defaultContactsData={this.state.contactsData}
					defaultDocumentsData={this.state.documents}
					activeStep={this.state.activeStep}
					passedStep={this.state.passedStep}
					handleStep={this.handleStep}
					onCheckLogin={this.onCheckLogin}
					checkLoginError={this.props.checkLoginError}
					checkPersonError={this.props.checkPersonError}
					checkPersonFetching={this.props.checkPersonFetching}
					onChangeConfirmationCode={this.onChangeConfirmationCode}
					submitPersonDataForm={this.submitPersonDataForm}
					submitRegisterDataForm={this.submitRegisterDataForm}
					submitContactsDataForm={this.submitContactsDataForm}
					submitAddDocumentsDataForm={this.submitAddDocumentsDataForm}
					submitEducationDataForm={this.submitEducationDataForm}
					steps={NEW_PERSON_STEPS}
					onConfirmCode={this.onConfirmCode}
					verifyPersonError={this.props.verifyPersonError}
					verifyPersonFetching={this.props.verifyPersonFetching}
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
		verifyPersonFetching,
	} = enrollStateSelector(state);
	const dictionaries = dictionariesSelector(state);

	return {
		checkPersonFetching,
		createPersonFetching,
		createPersonError,
		npId,
		checkPersonError,
		checkLoginError,
		verifyPersonError,
		verifyPersonFetching,
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
