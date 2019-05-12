import {
	defaultContactsDataForm,
	defaultEducationDataForm,
	defaultPersonDataForm,
	defaultRegisterDataForm,
	IContactsForm,
	IDocument,
	IEducationForm,
	inputValueAsString,
	IPersonForm,
	IRegisterForm,
	IServerError,
} from '$common';
import EnrollView from './EnrollView';
import Dictionary, { IDictionary } from '@mgutm-fcu/dictionary';
import * as React from 'react';
import { ChangeEvent, FormEvent } from 'react';
import { connect, MapStateToProps } from 'react-redux';
import { dictionariesSelector, enrollStateSelector } from './selectors';
import { createPerson, registerNewPerson, sendVerificationCode } from './operations';
import { FULL_DICTIONARY_LIST, SHORT_DICTIONARY_LIST } from './constants';
import { EnrollForm, EnrollSteps, IEnrollForm } from './models';
import { IRootState } from '$store';
import { MouseEventHandler } from 'react';

interface IDispatchToProps {
	registerNewPerson: (data: IRegisterForm) => Promise<void>;
	sendVerificationCode(email: string, mobPhone: string): Promise<void>;
	createPerson(confirmCode: string, data: IEnrollForm): Promise<void>;
}
interface IStateToProps {
	loading: boolean;
	error: IServerError | null;
	registrationCompleted: boolean;
	npId: number;
	dictionaries: Record<string, IDictionary>;
}
type IProps = IDispatchToProps & IStateToProps;

interface IState extends IEnrollForm {
	passedStep: number;
	activeStep: EnrollForm;
	confirmCode: string;
}

class EnrollContainer extends React.Component<IProps, IState> {
	state: IState = {
		passedStep: 0,
		activeStep: EnrollForm.Registration,
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
		const nextStep = EnrollSteps.findIndex(item => item === this.state.activeStep) + 1;
		this.setState({ activeStep: EnrollSteps[nextStep], passedStep: nextStep });
	};
	handleStep = (step: EnrollForm) => () => {
		this.setState({
			activeStep: step,
		});
	};
	submit = (event: FormEvent<HTMLFormElement>) => {
		switch (this.state.activeStep) {
			case EnrollForm.Registration: {
				const { registrationData } = this.state;
				this.props.registerNewPerson(registrationData).then(this.handleNext);
				break;
			}
			case EnrollForm.Contacts: {
				this.props
					.sendVerificationCode(this.state.contactsData.email, this.state.contactsData.mobPhone)
					.then(this.handleNext);
				break;
			}
			case EnrollForm.ConfirmEmail: {
				const { registrationData, contactsData, educationData, documents, personData } = this.state;
				this.props
					.createPerson(this.state.confirmCode, {
						registrationData,
						contactsData,
						personData,
						documents,
						educationData,
					})
					.then(this.handleNext);
				break;
			}
			default: {
				this.handleNext();
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
		const dictionaryList = this.props.npId ? FULL_DICTIONARY_LIST : SHORT_DICTIONARY_LIST;

		return (
			<Dictionary version={2} url={'/dev-bin/priem_api.fcgi'} list={dictionaryList}>
				<EnrollView
					registrationCompleted={this.props.registrationCompleted}
					loading={this.props.loading}
					error={this.props.error}
					updateEducationForm={this.updateEducationForm}
					updatePersonForm={this.updatePersonForm}
					updateContactsForm={this.updateContactsForm}
					updateRegisterForm={this.updateRegisterForm}
					updateDocumentsForm={this.updateDocumentsForm}
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
					steps={EnrollSteps}
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
		error: createPersonError || checkPersonError || verifyPersonError || checkLoginError,
		loading: checkPersonFetching || createPersonFetching || verifyPersonFetching,
		registrationCompleted,
		createPersonError,
		npId,
		dictionaries,
	};
};

const mapDispatchToProps = {
	registerNewPerson,
	createPerson,
	sendVerificationCode,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(EnrollContainer);
