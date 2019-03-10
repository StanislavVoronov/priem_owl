import { IDictionary } from '@mgutm-fcu/dictionary';
import { connect } from 'react-redux';

import * as React from 'react';

import { Stepper, StepContent, StepLabel, Step } from './platform/';
import { IEducationDataForm, IPersonDataForm, IRegisterFormData, RegisterDataForm } from './containers/Enroll';
import { IRootState, dictionariesStateSelector } from './common';

import { ContactsDataForm, EducationDataForm, PersonDataForm } from './containers';
import DocumentsDataForm, { IDocDataItem } from './containers/Enroll/components/DocumentsDataForm';

class IContactsDataForm {}

interface IAppState {
	activeStep: number;
	registerData?: IRegisterFormData;
	personData?: IPersonDataForm;
	contactsData?: IContactsDataForm;
	educationData?: IEducationDataForm;
	documents?: IDocDataItem[];
}

const steps = ['Регистрация', 'Персональные данные', 'Контактные данные', 'Образование', 'Документы', 'Заявления'];

export const AppContext = React.createContext<Record<string, any>>([]);
interface IStateToProps {
	dictionaries: Record<string, IDictionary>;
}
interface IDispatchProps {}
type IProps = IStateToProps & IDispatchProps;
export class App extends React.PureComponent<IProps, IAppState> {
	state = {
		activeStep: 4,
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
		this.handleNext();
	};
	submitAddDocumentsDataForm = (documents: IDocDataItem[]) => {
		this.setState({ documents });
		this.handleNext();
	};
	submitPersonDataForm = (personData: IPersonDataForm) => {
		this.setState({ personData });
		this.handleNext();
	};
	submitContactsDataForm = (contactsData: IContactsDataForm) => {
		this.setState({ contactsData });
		this.handleNext();
	};
	submitEducationDataForm = (educationData: IEducationDataForm) => {
		this.setState({ educationData });
		this.handleNext();
	};
	public render() {
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

export default connect(mapStateToProps)(App);
