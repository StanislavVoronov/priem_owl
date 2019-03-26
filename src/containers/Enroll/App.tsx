import { IDictionary } from '@mgutm-fcu/dictionary';
import { connect } from 'react-redux';

import * as React from 'react';

import { Stepper, StepContent, StepLabel, Step } from '../../platform';
import { IContactDataForm, IEducationDataForm, IPerson, IPersonDataForm, IRegisterFormData, RegisterDataForm } from '.';
import { IRootState, dictionariesStateSelector } from '../../common';

import { ContactsDataForm, EducationDataForm, PersonDataForm } from '..';
import DocumentsDataForm, { IDocDataItem } from './components/DocumentsDataForm';
import { registerNewPerson, createPerson, sendVerificationCode } from './operations';
import Button from '@material-ui/core/Button';
import TextInput from '../../platform/TextInput';

interface IAppState {
	activeStep: number;
	confirmCode: string;
	registerData?: IRegisterFormData;
	personData?: IPersonDataForm;
	contactsData?: IContactDataForm;
	educationData?: IEducationDataForm;
	documents?: IDocDataItem[];
}

const steps = ['Регистрация', 'Персональные данные', 'Контактные данные', 'Образование', 'Документы', 'Заявления'];

export const AppContext = React.createContext<Record<string, any>>([]);
interface IStateToProps {
	dictionaries: Record<string, IDictionary>;
}
interface IDispatchProps {
	createPerson(confirmCode: string, data: IPerson): void;
	sendVerificationCode(email: string, mobPhone: string): Promise<void>;
	registerNewPerson(login: string, password: string): Promise<number>;
}
type IProps = IStateToProps & IDispatchProps;
export class App extends React.PureComponent<IProps, IAppState> {
	state = {
		activeStep: 0,
		confirmCode: '',
	};

	public componentDidCatch(error: any, info: any) {
		// You can also log the error to an error reporting service
	}
	public handleNext = () => {
		this.setState(state => ({ activeStep: state.activeStep + 1 }));
	};
	public handleBack = () => {
		this.setState(state => ({ activeStep: state.activeStep - 1 }));
	};
	submitRegisterDataForm = (registerData: IRegisterFormData) => {
		this.setState({ registerData });
		this.props.registerNewPerson(registerData.login, registerData.password).then(this.handleNext);
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
	register = () => {
		const { activeStep, confirmCode, ...rest } = this.state;
		this.props.createPerson(confirmCode, rest);
	};
	onChangeTextField = (value: string) => {
		this.setState({ confirmCode: value });
	};
	public render() {
		console.log('APP', this.state);
		return (
			<React.Fragment>
				<AppContext.Provider value={this.props.dictionaries}>
					<Stepper activeStep={this.state.activeStep} orientation={'vertical'}>
						{steps.map((label, index) => (
							<Step key={label}>
								<StepLabel>{label}</StepLabel>
								<StepContent>
									{index === 0 && <RegisterDataForm submit={this.submitRegisterDataForm} />}
									{index === 1 && <PersonDataForm submit={this.submitPersonDataForm} />}
									{index === 2 && <ContactsDataForm submit={this.submitContactsDataForm} />}
									{index === 3 && <EducationDataForm submit={this.submitEducationDataForm} />}
									{index === 4 && <DocumentsDataForm submit={this.submitAddDocumentsDataForm} />}
									{/*)}*/}
								</StepContent>
							</Step>
						))}
					</Stepper>
					<TextInput label="Код подтверждения" type="number" onChange={this.onChangeTextField} />
					<Button variant="contained" color="primary" onClick={this.register}>
						{'Далее'}
					</Button>
				</AppContext.Provider>
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state: IRootState) => {
	return {
		dictionaries: dictionariesStateSelector(state),
	};
};

export default connect(
	mapStateToProps,
	{ registerNewPerson, createPerson, sendVerificationCode },
)(App);
