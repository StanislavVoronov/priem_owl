import { IDictionary } from '@mgutm-fcu/dictionary';
import { connect } from 'react-redux';

import * as React from 'react';

import { Stepper, StepContent, Step, TextInput, Button, StepButton } from '../../platform';
import { IContactDataForm, IDocDataItem, IEducationDataForm, IPersonDataForm, IRegisterDataForm } from './models';
import styles from './styles/common.css';
import ContactsDataForm from './components/ContactsDataForm';
import RegisterDataForm from './components/RegisterDataForm';
import PersonDataForm from './components/PersonDataForm';
import EducationDataForm from './components/EducationDataForm';
import DocumentsDataForm from './components/DocumentsDataForm';

import { withStyles } from '@material-ui/core';
import { IServerError } from './serverModels';
import { IDocDataForm } from '../../platform/DocDataForm';
const localStyles = {
	currentStepLabel: {
		fontSize: '1rem',
	},
	stepLabel: {
		fontSize: '0.875rem',
	},
};

interface IProps {
	steps: string[];
	activeStep: number;
	checkLoginError: IServerError | null;
	checkPersonError: IServerError | null;
	onCheckLogin: (login: string) => void;
	passedStep: number;
	submitEducationDataForm: (educationData: IEducationDataForm) => void;
	submitContactsDataForm: (contactsData: IContactDataForm) => void;
	submitPersonDataForm: (personData: IPersonDataForm) => void;
	submitRegisterDataForm: (registerData: IRegisterDataForm) => void;
	submitAddDocumentsDataForm: (documentsData: IDocDataForm[]) => void;
	onChangeConfirmationCode: (value: string) => void;
	handleStep: (step: number) => any;
	personExists: boolean;
	classes: Record<string, string>;
}

export class EnrollView extends React.PureComponent<IProps> {
	static defaultProps = {
		classes: {},
	};

	public render() {
		console.log('props', this.props);
		return (
			<React.Fragment>
				<Stepper activeStep={this.props.activeStep} orientation={'vertical'}>
					{this.props.steps.map((label, index) => (
						<Step key={label}>
							<StepButton onClick={this.props.handleStep(index)}>
								<span
									className={
										index === this.props.activeStep ? this.props.classes.currentStepLabel : this.props.classes.stepLabel
									}>
									{label}
								</span>
							</StepButton>

							<StepContent>
								{index === 0 && (
									<RegisterDataForm
										personExists={this.props.personExists}
										checkLoginError={this.props.checkLoginError}
										checkPersonError={this.props.checkPersonError}
										onCheckLogin={this.props.onCheckLogin}
										submit={this.props.submitRegisterDataForm}
									/>
								)}
								{index === 1 && <PersonDataForm submit={this.props.submitPersonDataForm} />}
								{index === 2 && <ContactsDataForm submit={this.props.submitContactsDataForm} />}
								{index === 3 && <EducationDataForm submit={this.props.submitEducationDataForm} />}
								{index === 4 && <DocumentsDataForm submit={this.props.submitAddDocumentsDataForm} />}
							</StepContent>
						</Step>
					))}
				</Stepper>
				{this.props.activeStep === 5 ? (
					<div className={styles.flexColumn}>
						<TextInput
							label="Код подтверждения"
							type="number"
							onBlur={this.props.onChangeConfirmationCode}
							helperText={`Введите код, отправленный на указанную в контактах электронную почту`}
						/>
						{/*<Button variant="contained" color="primary" onClick={this}>*/}
						{/*{'Далее'}*/}
						{/*</Button>*/}
					</div>
				) : null}
			</React.Fragment>
		);
	}
}

export default withStyles(localStyles)(EnrollView);
