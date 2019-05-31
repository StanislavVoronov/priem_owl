import * as React from 'react';

import styles from './styles.module.css';
import Logo from '$assets/mgutm.png';
import CircularProgress from '@material-ui/core/CircularProgress';
import { CardMedia, Step, StepButton, StepContent, Stepper, withStyles, Title, LoadingText } from '$components';
import {
	RegistrationForm,
	PersonForm,
	ContactsForm,
	EducationForm,
	DocumentsForm,
	AccountVerificationForm,
} from '$containers';

const localStyles = {
	logo: { height: window.innerHeight },
	stepper: {
		marginBottom: 50,
		marginRight: 50,
		marginLeft: 50,
		backgroundColor: '#fdfdff',
		borderRadius: 10,
		boxShadow: '0px 0px 0px 1px rgba(0,0,0,0.3)',
	},
};

interface IProps {
	loading: boolean;
	handleNext: () => void;
	activeStep: number;
	classes: any;
	passedStep: number;
	steps: string[];
	onCompleteRegForm: () => void;
}
export class EnrollView extends React.PureComponent<IProps> {
	static defaultProps = {
		classes: {},
		passedStep: 0,
	};

	renderForm = (step: number) => {
		switch (step) {
			case 0: {
				return <RegistrationForm onComplete={this.props.onCompleteRegForm} />;
			}
			case 1: {
				return <PersonForm submit={this.props.handleNext} />;
			}
			case 2: {
				return <ContactsForm submit={this.props.handleNext} />;
			}
			case 3: {
				return <EducationForm submit={this.props.handleNext} />;
			}
			case 4: {
				return <DocumentsForm submit={this.props.handleNext} />;
			}
			case 5: {
				return <AccountVerificationForm submit={this.props.handleNext} />;
			}
			default: {
				return null;
			}
		}
	};
	render() {
		return (
			<React.Fragment>
				<div className={styles.header}>
					<img className={styles.logo} src={Logo} />
					<h2 className={styles.pkTitle}>Приемная компания</h2>
				</div>
				<h2 className={styles.namePageTitle}>Электронная подача документов для поступления в Университет</h2>
				<CardMedia className={this.props.classes.logo}>
					<Stepper className={this.props.classes.stepper} activeStep={this.props.activeStep} orientation={'vertical'}>
						{!this.props.loading ? (
							this.props.steps.map((label, index) => (
								<Step key={label}>
									<StepButton disabled={index >= this.props.passedStep}>
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
				</CardMedia>
			</React.Fragment>
		);
	}
}

export default withStyles(localStyles)(EnrollView);
