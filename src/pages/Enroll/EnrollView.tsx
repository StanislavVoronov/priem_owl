import * as React from 'react';

import styles from './styles.module.css';
import Logo from '$assets/mgutm.png';
import { CardMedia, Step, StepButton, StepContent, Stepper, Title, LoadingText } from '$components';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import CategoryIcon from '@material-ui/icons/Category';
import DateRangeIcon from '@material-ui/icons/DateRange';
import DescriptionIcon from '@material-ui/icons/Description';
import SchoolIcon from '@material-ui/icons/School';
import GroupIcon from '@material-ui/icons/Group';
import classes from './styles.module.css';
import {
	RegistrationForm,
	EnrollPersonForm,
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
	createNewPersonLogin: () => void;
	createNewPersonFolder: () => void;
}
export class EnrollView extends React.PureComponent<IProps> {
	static defaultProps = {
		passedStep: 0,
	};

	renderForm = (step: number) => {
		switch (step) {
			case 0: {
				return <RegistrationForm onComplete={this.props.createNewPersonLogin} />;
			}
			case 1: {
				return <EnrollPersonForm onComplete={this.props.handleNext} />;
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
	onNavIconClick = (href: string) => () => {
		window.open(href, '_blank');
	};
	onLogoClick = () => {
		window.open('http://mgutm.ru', '_blank');
	};
	render() {
		return (
			<React.Fragment>
				<div>
					<img className={classes.logo} onClick={this.onLogoClick} src={Logo} />

					<BottomNavigation showLabels className={classes.nav}>
						<BottomNavigationAction
							className={classes.navAction}
							label={
								<a
									style={{ fontSize: '1rem' }}
									href="http://mgutm.ru/entrant_2012/aktualnii_dokumenti.php"
									target="_blank">
									Правила приема
								</a>
							}
							icon={
								<ImportContactsIcon
									onClick={this.onNavIconClick('http://mgutm.ru/entrant_2012/aktualnii_dokumenti.php')}
									fontSize="large"
									color="primary"
								/>
							}
						/>
						<BottomNavigationAction
							className={classes.navAction}
							label={
								<a style={{ fontSize: '1rem' }} href="http://mgutm.ru/entrant/doc.php" target="_blank">
									Необходимые документы
								</a>
							}
							icon={
								<DescriptionIcon
									fontSize="large"
									color="primary"
									onClick={this.onNavIconClick('http://mgutm.ru/entrant/doc.php')}
								/>
							}
						/>
						<BottomNavigationAction
							className={classes.navAction}
							label={
								<a
									style={{ fontSize: '1rem' }}
									onClick={this.onNavIconClick('http://mgutm.ru/entrant_2012/naprovleniya_podgotovki.php')}
									href="http://mgutm.ru/entrant_2012/naprovleniya_podgotovki.php"
									target="_blank">
									Направления подготовки
								</a>
							}
							icon={<CategoryIcon fontSize="large" color="primary" />}
						/>
						<BottomNavigationAction
							className={classes.navAction}
							label={
								<a
									style={{ fontSize: '1rem' }}
									onClick={this.onNavIconClick('http://mgutm.ru/entrant_2012/plan-kalendar-priema.php')}
									href="http://mgutm.ru/entrant_2012/plan-kalendar-priema.php"
									target="_blank">
									Календарь приема
								</a>
							}
							icon={<DateRangeIcon fontSize="large" color="primary" />}
						/>
						<BottomNavigationAction
							className={classes.navAction}
							label={
								<a style={{ fontSize: '1rem' }} href="http://mgutm.ru/exams/" target="_blank">
									Вступительные испытания
								</a>
							}
							onClick={this.onNavIconClick('http://mgutm.ru/exams/')}
							icon={<SchoolIcon fontSize="large" color="primary" />}
						/>
						<BottomNavigationAction
							className={classes.navAction}
							label={
								<a style={{ fontSize: '1rem' }} href="http://mgutm.ru/entrant_2012/plan.php" target="_blank">
									План приема
								</a>
							}
							onClick={this.onNavIconClick('http://mgutm.ru/entrant_2012/plan.php')}
							icon={<GroupIcon fontSize="large" color="primary" />}
						/>
					</BottomNavigation>
				</div>
				<h2 className={styles.namePageTitle}>Электронная подача документов для поступления в Университет</h2>
				<CardMedia>
					<Stepper className={classes.stepper} activeStep={this.props.activeStep} orientation={'vertical'}>
						{!this.props.loading ? (
							this.props.steps.map((label, index) => (
								<Step
									style={index <= this.props.passedStep ? { cursor: 'pointer' } : { cursor: 'default' }}
									key={label}
									onClick={index <= this.props.passedStep ? this.props.handleStep(index) : noop}>
									<StepButton disabled={index <= this.props.passedStep}>
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

export default EnrollView;
