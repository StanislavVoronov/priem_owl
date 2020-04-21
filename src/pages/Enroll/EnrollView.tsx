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
	VerAccountForm,
	ApplicationsForm,
} from '$containers';
import { IProxyElementProps, ProxyElement } from '@black_bird/components';
import { noop } from '$common';

interface IProps {
	loading: boolean;
	handleStep: (index: number) => void;
	activeStep: number;
	passedStep: number;
	steps: string[];
}
export class EnrollView extends React.PureComponent<IProps> {
	static defaultProps = {
		passedStep: 0,
	};

	handleStep = (step: number) => () => {
		this.props.handleStep(step);
	};

	renderStepContent = (step: number) => {
		switch (step) {
			case 0: {
				return <RegistrationForm />;
			}
			case 1: {
				return <PersonForm />;
			}
			case 2: {
				return <ContactsForm />;
			}
			case 3: {
				return <EducationForm />;
			}
			case 4: {
				return <ApplicationsForm />;
			}
			case 5: {
				return <DocumentsForm />;
			}

			case 6: {
				return <VerAccountForm />;
			}
			default: {
				return null;
			}
		}
	};

	render() {
		const { activeStep, passedStep } = this.props;

		return (
			<>
				<EnrollHeader />
				<h2 className={styles.namePageTitle}>Подача документов для поступения в Университет</h2>
				<Stepper
					classes={{ root: classes.root }}
					className={classes.stepper}
					activeStep={this.props.activeStep}
					orientation={'vertical'}>
					{!this.props.loading ? (
						this.props.steps.map((label, index) => (
							<Step expanded={activeStep === index} active={activeStep === index}>
								<StepButton
									disabled={passedStep < index}
									className={classes.stepButton}
									onClick={this.handleStep(index)}>
									<span>{label}</span>
								</StepButton>
								<StepContent>{this.renderStepContent(this.props.activeStep)}</StepContent>
							</Step>
						))
					) : (
						<LoadingText>Подготовка формы</LoadingText>
					)}
				</Stepper>
			</>
		);
	}
}

export default EnrollView;
