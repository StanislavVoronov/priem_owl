import { IRootState } from '../../common';
import EnrollView from './EnrollView';
import Dictionary from '@mgutm-fcu/dictionary/Dictionary';
import * as React from 'react';
import { connect, MapStateToProps } from 'react-redux';
import { enrollStateSelector } from './selectors';
import {
	defaultContactsDataForm,
	defaultEducationDataForm,
	defaultPersonDataForm,
	defaultRegisterDataForm,
} from './defaults';
import { IDictionary } from '@mgutm-fcu/dictionary';
import { checkPerson, checkLogin, registerNewPerson, createPerson, sendVerificationCode } from './operations';
import { FULL_DICTIONARY_LIST, NEW_PERSON_STEPS, SHORT_DICTIONARY_LIST } from './constants';
import {
	IContactDataForm,
	IDocDataItem,
	IEducationDataForm,
	IPerson,
	IPersonDataForm,
	IRegisterDataForm,
	PersonInfo,
} from './models';
import { IServerError } from './serverModels';
import { IDocDataForm } from '../../platform/DocDataForm';

interface IDispatchToProps {
	checkLogin(login: string): void;
	registerNewPerson: (login: string, password: string) => Promise<number>;
	sendVerificationCode(email: string, mobPhone: string): Promise<void>;
	createPerson(confirmCode: string, data: IPerson): void;
	checkPerson(data: PersonInfo): Promise<void>;
}
interface IStateToProps {
	npId: number;
	checkPersonError: IServerError | null;
	checkLoginError: IServerError | null;
	verifyPersonError: IServerError | null;
	dictionaries: Record<string, IDictionary>;
}
type IProps = IDispatchToProps & IStateToProps;

interface IState {
	passedStep: number;
	activeStep: number;
	confirmCode: string;
	registerData: IRegisterDataForm;
	personData: IPersonDataForm;
	contactsData: IContactDataForm;
	educationData: IEducationDataForm;
	documents: IDocDataForm[];
}
export const DictionaryContext = React.createContext({});
class EnrollContainer extends React.Component<IProps, IState> {
	state = {
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
		const { lastName, middleName, birthday, firstName } = this.state.registerData;
		this.props.checkPerson({ firstName, lastName, birthday, middleName }).then(this.handleNext);
	};
	submitRegisterDataForm = (registerData: IRegisterDataForm) => {
		this.setState({ registerData });
		this.props.registerNewPerson(registerData.login, registerData.password).then(this.onCheckPerson);
	};
	submitAddDocumentsDataForm = (documents: IDocDataItem[]) => {
		this.setState({ documents });
		this.handleNext();
	};
	submitPersonDataForm = (personData: IPersonDataForm) => {
		this.setState({ personData });
		this.handleNext();
	};
	submitContactsDataForm = (contactsData: IContactDataForm) => {
		this.setState({ contactsData });
		this.props.sendVerificationCode(contactsData.email, contactsData.mobPhone).then(this.handleNext);
	};
	submitEducationDataForm = (educationData: IEducationDataForm) => {
		this.setState({ educationData });
		this.handleNext();
	};
	onChangeConfirmationCode = (confirmCode: string) => {
		this.setState({ confirmCode });
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
				<DictionaryContext.Provider value={this.props.dictionaries}>
					<EnrollView
						activeStep={this.state.activeStep}
						passedStep={this.state.passedStep}
						handleStep={this.handleStep}
						onCheckLogin={this.onCheckLogin}
						checkLoginError={this.props.checkLoginError}
						checkPersonError={this.props.checkPersonError}
						onChangeConfirmationCode={this.onChangeConfirmationCode}
						submitPersonDataForm={this.submitPersonDataForm}
						submitRegisterDataForm={this.submitRegisterDataForm}
						submitContactsDataForm={this.submitContactsDataForm}
						submitAddDocumentsDataForm={this.submitAddDocumentsDataForm}
						submitEducationDataForm={this.submitEducationDataForm}
						steps={NEW_PERSON_STEPS}
						onConfirmCode={this.onConfirmCode}
						verifyPersonError={this.props.verifyPersonError}
					/>
				</DictionaryContext.Provider>
			</Dictionary>
		);
	}
}

const mapStateToProps: MapStateToProps<IStateToProps, {}, IRootState> = state => {
	const { npId, checkPersonError, checkLoginError, verifyPersonError } = enrollStateSelector(state);
	return {
		npId,
		checkPersonError,
		checkLoginError,
		verifyPersonError,
		dictionaries: state.dictionaries,
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
