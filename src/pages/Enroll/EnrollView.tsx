import * as React from 'react';

import styles from './styles.module.css';
import Logo from '$assets/mgutm.png';
import { EnrollForm } from './models';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Title } from '../../components/Typography/Title';
import EnrollRegistrationContainer from '../../containers/EnrollRegistrationForm/EnrollRegistrationContainer';
import { CardMedia, Step, StepButton, StepContent, Stepper, withStyles } from '$components';

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
	handleNext: () => void;
	activeStep: number;
	classes: any;
	passedStep: number;
	steps: string[];
}
export class EnrollView extends React.PureComponent<IProps> {
	static defaultProps = {
		classes: {},
		passedStep: 0,
	};

	renderForm = (step: number) => {
		switch (step) {
			case 0: {
				return <EnrollRegistrationContainer onComplete={this.props.handleNext} />;
			}
			case 1: {
				return <div>1111</div>;
			}
			default: {
				return null;
			}
		}
	};
	render() {
		const loading = false;

		return (
			<React.Fragment>
				<div className={styles.header}>
					<img className={styles.logo} src={Logo} />
					<h2 className={styles.pkTitle}>Приемная компания</h2>
				</div>
				<h2 className={styles.namePageTitle}>Электронная подача документов для поступления в Университет</h2>
				<CardMedia className={this.props.classes.logo}>
					<Stepper className={this.props.classes.stepper} activeStep={this.props.activeStep} orientation={'vertical'}>
						{!loading ? (
							this.props.steps.map((label, index) => (
								<Step key={label}>
									<StepButton disabled={index >= this.props.passedStep}>
										<span className={index === this.props.activeStep ? styles.currentStepLabel : ''}>{label}</span>
									</StepButton>
									<StepContent>{this.renderForm(index)}</StepContent>
								</Step>
							))
						) : (
							<React.Fragment>
								<div className={styles.loading}>
									<CircularProgress />
									<h3>Подготовка формы</h3>
								</div>
							</React.Fragment>
						)}

						{/*<Title color="green">Процесс подачи документов для поступления в Университет успешно завершен!</Title>*/}
					</Stepper>
				</CardMedia>
			</React.Fragment>
		);
	}
}

export default withStyles(localStyles)(EnrollView);
