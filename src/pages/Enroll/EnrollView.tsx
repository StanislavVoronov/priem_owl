import * as React from 'react';

import styles from './styles.module.css';

import { Step, StepButton, StepContent, Stepper, Title, LoadingText, EnrollHeader } from '$components';
import classes from './styles.module.css';
import {
	RegistrationForm,
	PersonForm,
	ContactsForm,
	EducationForm,
	DocumentsForm,
	AccountVerificationForm,
} from '$containers';
import { noop } from '$common';
import ApplicationsForm from '../../containers/ApplicationsForm/ApplicationsForm';

interface IProps {
	loading: boolean;
	handleNext: () => void;
	handleStep: (index: number) => () => void;
	activeStep: number;
	passedStep: number;
	steps: string[];
	createNewPersonFolder: () => void;
}
export class EnrollView extends React.PureComponent<IProps> {
	static defaultProps = {
		passedStep: 0,
	};

	renderForm = (step: number) => {
		switch (step) {
			case 0: {
				return <RegistrationForm />;
			}
			case 1: {
				return <PersonForm />;
			}
			case 2: {
				return <ContactsForm onComplete={this.props.handleNext} />;
			}
			case 3: {
				return <EducationForm onComplete={this.props.handleNext} />;
			}
			case 4: {
				return <ApplicationsForm onComplete={this.props.handleNext} />;
			}
			case 5: {
				return <DocumentsForm onComplete={this.props.handleNext} />;
			}

			case 6: {
				return <AccountVerificationForm onComplete={this.props.createNewPersonFolder} />;
			}
			default: {
				return null;
			}
		}
	};

	render() {
		return (
			<>
				<EnrollHeader />
				<h2 className={styles.namePageTitle}>Электронная подача документов для поступления в Университет</h2>
				<Stepper
					classes={{ root: classes.root }}
					className={classes.stepper}
					activeStep={this.props.activeStep}
					orientation={'vertical'}>
					{!this.props.loading ? (
						this.props.steps.map((label, index) => (
							<Step style={index <= this.props.passedStep ? { cursor: 'pointer' } : { cursor: 'default' }} key={label}>
								<StepButton
									className={classes.stepButton}
									disabled={index <= this.props.passedStep}
									onClick={index <= this.props.passedStep ? this.props.handleStep(index) : noop}>
									<span className={index === this.props.activeStep ? styles.currentStepLabel : ''}>{label}</span>
								</StepButton>
								<StepContent>{this.renderForm(index)}</StepContent>
							</Step>
						))
					) : (
						<LoadingText>Подготовка формы</LoadingText>
					)}

					{this.props.activeStep >= this.props.steps.length && (
						<Title color="green">Процесс подачи документов для поступления в Университет успешно завершен!</Title>
					)}
				</Stepper>
			</>
		);
	}
}

export default EnrollView;
