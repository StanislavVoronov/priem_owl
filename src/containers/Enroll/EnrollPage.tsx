import { IDictionary } from '@mgutm-fcu/dictionary';
import { connect } from 'react-redux';

import * as React from 'react';

import { Stepper, StepContent, StepLabel, Step } from '../../platform';
import {
	IContactDataForm,
	IDocDataItem,
	IEducationDataForm,
	IPerson,
	IPersonDataForm,
	IRegisterDataForm,
} from './models';
import { IRootState, dictionariesStateSelector } from '../../common';

import ContactsDataForm from './components/ContactsDataForm';
import RegisterDataForm from './components/RegisterDataForm';
import PersonDataForm from './components/PersonDataForm';
import EducationDataForm from './components/EducationDataForm';
import DocumentsDataForm from './components/DocumentsDataForm';

import { registerNewPerson, createPerson, sendVerificationCode } from './operations';

import { TextInput, Button, StepButton } from '../../platform';
import styles from './styles/common.css';
import {
	defaultContactsDataForm,
	defaultEducationDataForm,
	defaultPersonDataForm,
	defaultRegisterDataForm,
} from './defaults';

interface IAppState {
	activeStep: number;
	confirmCode: number;
	registerData: IRegisterDataForm;
	personData: IPersonDataForm;
	contactsData: IContactDataForm;
	educationData: IEducationDataForm;
	documents: IDocDataItem[];
	passedStep: number;
}

const steps = ['Регистрация', 'Персональные данные', 'Контактные данные', 'Образование', 'Документы', 'Заявления'];

export const AppContext = React.createContext<Record<string, any>>([]);
interface IStateToProps {
	dictionaries: Record<string, IDictionary>;
}
interface IDispatchProps {
	createPerson(confirmCode: number, data: IPerson): void;
	sendVerificationCode(email: string, mobPhone: string): Promise<void>;
	registerNewPerson(login: string, password: string): Promise<number>;
}
type IProps = IStateToProps & IDispatchProps;
export class EnrollPage extends React.PureComponent<IProps, IAppState> {
	state = {
		passedStep: 5,
		activeStep: 1,
		confirmCode: 0,
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
	public handleBack = () => {
		this.setState(state => ({ activeStep: state.activeStep - 1 }));
	};
	submitRegisterDataForm = (registerData: IRegisterDataForm) => {
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
	handleStep = (step: number) => () => {
		if (step < this.state.passedStep) {
			this.setState({
				activeStep: step,
			});
		}
	};
	onChangeTextField = (value: any) => {
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
								<StepButton
									disabled={index > this.state.passedStep}
									onClick={this.handleStep(index)}
									className={styles.stepLabel}>
									{label}
								</StepButton>

								<StepContent>
									{index === 0 && <RegisterDataForm submit={this.submitRegisterDataForm} />}
									{index === 1 && <PersonDataForm submit={this.submitPersonDataForm} />}
									{index === 2 && <ContactsDataForm submit={this.submitContactsDataForm} />}
									{index === 3 && <EducationDataForm submit={this.submitEducationDataForm} />}
									{index === 4 && <DocumentsDataForm submit={this.submitAddDocumentsDataForm} />}
								</StepContent>
							</Step>
						))}
					</Stepper>
					{this.state.activeStep === 5 && this.state.contactsData.email ? (
						<div>
							<TextInput
								label="Код подтверждения"
								type="number"
								onChange={this.onChangeTextField}
								helperText={`Введите код, отправленный на электронную почту ${this.state.contactsData.email}`}
							/>
							<Button variant="contained" color="primary" onClick={this.register}>
								{'Далее'}
							</Button>
						</div>
					) : null}
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
)(EnrollPage);
