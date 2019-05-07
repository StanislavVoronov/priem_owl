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
import { IEnrollFormState } from './models';
import { IRootState } from '$store';

interface IDispatchToProps {
	registerNewPerson: (login: string, password: string) => Promise<number>;
	checkLogin(login: string): Promise<boolean>;
	sendVerificationCode(email: string, mobPhone: string): Promise<void>;
	createPerson(confirmCode: string, data: IEnrollFormState): void;
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

interface IState extends IEnrollFormState {
	passedStep: number;
	activeStep: number;
	confirmCode: string;
	invalidData: Partial<EnrollForms>;
}

class EnrollContainer extends React.Component<IProps, IState> {
	state: IState = {
		invalidData: {},
		passedStep: 0,
		activeStep: 0,
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
	submit = () => {
		const { registerData } = this.state;
		switch (this.state.activeStep) {
			case 0: {
				this.props.registerNewPerson(registerData.login, registerData.password).then(this.onCheckPerson);
			}
		}
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
	onConfirmCode = () => {
		this.props.createPerson(this.state.confirmCode, {
			registerData: this.state.registerData,
			contactsData: this.state.contactsData,
			personData: this.state.personData,
			documents: this.state.documents,
			educationData: this.state.educationData,
		});
	};
	updateForm = (form: keyof IEnrollFormState) => (field: keyof IRegisterForm, value: any) => {
		if (field === 'login') {
			this.props.checkLogin(value).catch(error => {
				this.setState({ invalidData: { ...this.state.invalidData, login: error.message } });
			});
		}

		const invalidData = validateRegistrationForm(this.state.registerData);
		this.setState({
			...this.state,
			[form]: {
				...this.state[form],
				[field]: value,
			},
			invalidData: {
				...this.state.invalidData,
				...invalidData,
			},
		});
	};

	render() {
		return (
			<Dictionary
				version={2}
				url={'/dev-bin/priem_api.fcgi'}
				list={this.props.npId ? FULL_DICTIONARY_LIST : SHORT_DICTIONARY_LIST}>
				<EnrollView
					loading={this.props.loading}
					invalidData={this.state.invalidData}
					updateForm={this.updateForm}
					createPersonError={this.props.createPersonError}
					dictionaries={this.props.dictionaries}
					defaultRegisterData={this.state.registerData}
					defaultPersonData={this.state.personData}
					defaultEducationData={this.state.educationData}
					defaultContactsData={this.state.contactsData}
					defaultDocumentsData={this.state.documents}
					activeStep={this.state.activeStep}
					passedStep={this.state.passedStep}
					handleStep={this.handleStep}
					onChangeConfirmationCode={this.onChangeConfirmationCode}
					submitPersonDataForm={this.submitPersonDataForm}
					submit={this.submit}
					submitContactsDataForm={this.submitContactsDataForm}
					submitAddDocumentsDataForm={this.submitAddDocumentsDataForm}
					submitEducationDataForm={this.submitEducationDataForm}
					steps={NEW_PERSON_STEPS}
					onConfirmCode={this.onConfirmCode}
					registrationCompleted={this.props.registrationCompleted}
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
