import { IDictionary } from '@mgutm-fcu/dictionary';
import { connect } from 'react-redux';

import * as React from 'react';

import { Stepper, StepContent, StepLabel, Step } from './platform/';
import { RegisterDataForm } from './containers/Enroll';
import {
	IRootState,
	IPersonDataState,
	IContactDataState,
	IEducationDataState,
	IDocDataForm,
	IApplicationDataForm,
	dictionariesStateSelector,
} from './common';

import { ContactsDataForm, EducationDataForm, PersonDataForm } from './containers';
interface IAppState {
	activeStep: number;
	personData: IPersonDataState;
	contactData: IContactDataState;
	educationData: IEducationDataState;
	docList: IDocDataForm[];
	applicationData: IApplicationDataForm;
}

const steps = ['Регистрация', 'Персональные данные', 'Контактные данные', 'Образование', 'Документы', 'Заявления'];

export const AppContext = React.createContext<Record<string, any>>([]);
interface IStateToProps {
	dictionaries: Record<string, IDictionary>;
}
interface IDispatchProps {}
type IProps = IStateToProps & IDispatchProps;
export class App extends React.PureComponent<IProps, { activeStep: number }> {
	state = {
		activeStep: 3,
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
	public render() {
		return (
			<React.Fragment>
				<AppContext.Provider value={this.props.dictionaries}>
					<Stepper activeStep={this.state.activeStep} orientation={'vertical'}>
						{steps.map((label, index) => (
							<Step key={label}>
								<StepLabel>{label}</StepLabel>
								<StepContent>
									{index === 0 && <RegisterDataForm submit={this.handleNext} />}
									{index === 1 && <PersonDataForm submit={this.handleNext} />}
									{index === 2 && <ContactsDataForm submit={this.handleNext} />}
									{index === 3 && <EducationDataForm submit={this.handleNext} />}
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
