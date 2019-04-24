import * as React from 'react';

import { Stepper, StepContent, Step, TextInput, Button, StepButton } from '../../platform';
import { IContactDataForm, IEducationDataForm, IPersonDataForm, IRegisterDataForm } from './models';
import styles from './styles/common.css';
import ContactsDataForm from './components/ContactsDataForm';
import RegisterDataForm from './components/RegisterDataForm';
import PersonDataForm from './components/PersonDataForm';
import EducationDataForm from './components/EducationDataForm';
import DocumentsDataForm from './components/DocumentsDataForm';
import { CardMedia, withStyles } from '@material-ui/core';
import { IServerError } from './serverModels';
import Logo from '../../static/logo.png';
import { IDocDataForm } from '../../platform/DocDataForm';
const localStyles = {
	currentStepLabel: {
		fontSize: '1.2rem',
	},
	stepLabel: {
		fontSize: '1rem',
	},
	logo: { height: window.innerHeight },
	head: {
		textAlign: 'center' as any,
		justifyContent: 'center' as any,
		display: 'flex',
		fontSize: '1.7em',
		margin: 0,
		paddingTop: 15,
		paddingLeft: 10,
		paddingRight: 10,
		paddingBottom: 10,
		flexWrap: 'wrap' as any,
		backgroundColor: '#24529D',
		color: 'white',
	},
	subHead: {
		textAlign: 'center' as any,
		justifyContent: 'center' as any,
		display: 'flex',
		fontSize: '1.5em',
		margin: 0,
		paddingLeft: 10,
		paddingRight: 10,
		flexWrap: 'wrap' as any,
		backgroundColor: '#24529D',
		color: 'white',
		paddingBottom: 15,
		marginBottom: 20,
	},
};

interface IProps {
	steps: string[];
	activeStep: number;
	checkLoginError: IServerError | null;
	checkPersonError: IServerError | null;
	verifyPersonError: IServerError | null;
	onCheckLogin: (login: string) => void;
	passedStep: number;
	submitEducationDataForm: (educationData: IEducationDataForm) => void;
	submitContactsDataForm: (contactsData: IContactDataForm) => void;
	submitPersonDataForm: (personData: IPersonDataForm) => void;
	submitRegisterDataForm: (registerData: IRegisterDataForm) => void;
	submitAddDocumentsDataForm: (documentsData: IDocDataForm[]) => void;
	onChangeConfirmationCode: (value: string) => void;
	handleStep: (step: number) => any;
	classes: Record<string, string>;
	onConfirmCode: () => void;
}

export class EnrollView extends React.PureComponent<IProps> {
	static defaultProps = {
		classes: {},
	};

	public render() {
		return (
			<React.Fragment>
				<h2 className={this.props.classes.head}>
					Московский государвственый университет технологии и управлении им. К.Г. Разумовского (ПКУ)
				</h2>
				<h2 className={this.props.classes.subHead}>Приемная компания {new Date().getFullYear()}</h2>
				<CardMedia className={this.props.classes.logo} image={Logo}>
					<Stepper
						style={{
							marginRight: 100,
							marginLeft: 100,
							backgroundColor: '#FBFDF0',
							borderRadius: 10,
							boxShadow: '0px 0px 0px 1px rgba(0,0,0,0.3)',
						}}
						activeStep={this.props.activeStep}
						orientation={'vertical'}>
						{this.props.steps.map((label, index) => (
							<Step key={label}>
								<StepButton
									style={{ display: 'flex', alignItems: 'center' }}
									onClick={this.props.handleStep(index)}
									disabled={index > this.props.passedStep}>
									<span
										className={
											index === this.props.activeStep
												? this.props.classes.currentStepLabel
												: this.props.classes.stepLabel
										}>
										{label}
									</span>
								</StepButton>

								<StepContent>
									{index === 0 && (
										<RegisterDataForm
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
					{this.props.activeStep >= this.props.steps.length ? (
						<div className={styles.flexColumn}>
							<TextInput
								label="Код подтверждения"
								type="number"
								onBlur={this.props.onChangeConfirmationCode}
								helperText={`Введите код, отправленный на указанную в контактах электронную почту`}
							/>
							<Button variant="contained" color="primary" onClick={this.props.onConfirmCode}>
								{'Подтвердить'}
							</Button>
						</div>
					) : null}
				</CardMedia>
			</React.Fragment>
		);
	}
}

export default withStyles(localStyles)(EnrollView);
