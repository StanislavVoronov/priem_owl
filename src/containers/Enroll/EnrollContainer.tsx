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
	invalidData: Partial<EnrollForms>;
}

class EnrollContainer extends React.Component<IProps, IState> {
	state: IState = {
		invalidData: {},
		passedStep: 0,
		activeStep: 0,
		confirmCode: '',
		registerForm: defaultRegisterDataForm,
		personForm: defaultPersonDataForm,
		contactsForm: defaultContactsDataForm,
		educationForm: defaultEducationDataForm,
		documentsForm: [],
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
		const { lastName, middleName, birthday, firstName, gender } = this.state.registerForm;
		this.props.checkPerson({ firstName, lastName, birthday, middleName, gender }).then(this.handleNext);
	};
	submit = () => {
		const { registerForm } = this.state;
		switch (this.state.activeStep) {
			case 0: {
				this.props.registerNewPerson(registerForm.login, registerForm.password).then(this.onCheckPerson);
			}
		}
	};
	submitAddDocumentsDataForm = (documentsForm: IDocument[]) => {
		this.setState({ documentsForm });
		this.handleNext();
	};
	submitContactsDataForm = (contactsForm: IContactsForm) => {
		this.setState({ contactsForm });
		this.props.sendVerificationCode(contactsForm.email, contactsForm.mobPhone).then(this.handleNext);
	};
	submitEducationDataForm = (educationForm: IEducationForm) => {
		this.setState({ educationForm });
		this.handleNext();
	};
	onChangeConfirmCode = (event: ChangeEvent<HTMLInputElement>) => {
		this.setState({ confirmCode: inputValueAsString(event) });
	};
	updateForm = (form: keyof IEnrollForm) => (field: keyof EnrollForms, value: any) => {
		if (field === 'login') {
			this.props.checkLogin(value).catch(error => {
				this.setState({ invalidData: { ...this.state.invalidData, login: error.message } });
			});
		}

		const invalidData = validateRegistrationForm(this.state.registerForm);
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
					defaultData={{
						registerForm: this.state.registerForm,
						contactsForm: this.state.contactsForm,
						educationForm: this.state.educationForm,
						documentsForm: this.state.documentsForm,
						personForm: this.state.personForm,
					}}
					activeStep={this.state.activeStep}
					passedStep={this.state.passedStep}
					handleStep={this.handleStep}
					submit={this.submit}
					submitContactsDataForm={this.submitContactsDataForm}
					submitAddDocumentsDataForm={this.submitAddDocumentsDataForm}
					submitEducationDataForm={this.submitEducationDataForm}
					steps={NEW_PERSON_STEPS}
					onChangeConfirmCode={this.onChangeConfirmCode}
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
