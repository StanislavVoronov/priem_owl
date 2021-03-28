import * as React from 'react';
import { Step, StepButton, StepContent, Stepper, EnrollHeader } from '$components';
import { LoadingText } from '@black_bird/components';
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
import { IException } from '@black_bird/utils';

interface IProps {
	loading: boolean;
	handleStep: (index: number) => void;
	activeStep: number;
	passedStep: number;
	steps: string[];
	exception: IException | null;
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
				return <DocumentsForm />;
			}
			case 5: {
				return <ApplicationsForm />;
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
		const { activeStep, passedStep, exception } = this.props;

		return (
			<>
				<EnrollHeader />
				<Stepper
					className={classes.stepper}
					activeStep={this.props.activeStep}
					orientation={'vertical'}>
					{exception ? (
						<h3 className={classes.error}>
							{exception.message || exception.stack || exception.comment}
						</h3>
					) : !this.props.loading ? (
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
