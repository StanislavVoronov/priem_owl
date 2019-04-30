import * as React from 'react';

import { Stepper, StepContent, Step, TextInput, Button, StepButton, CardMedia, withStyles } from '$components';
import { IContactDataForm, IEducationDataForm, IPersonDataForm, IRegisterDataForm } from './models';
import { IDocument } from '$common';
import styles from './styles/common.module.css';
import ContactsDataForm from './components/ContactsDataForm';
import RegisterDataForm from './components/RegisterDataForm';
import PersonDataForm from './components/PersonDataForm';
import EducationDataForm from './components/EducationDataForm';
import DocumentsDataForm from './components/DocumentsDataForm';

import { IServerError } from './serverModels';
import BackgroundLogo from '$assets/logo.png';
import Logo from '$assets/mgutm.png';
import { ChangeEvent } from 'react';

const localStyles = {
	currentStepLabel: {
		fontSize: '1.2rem',
	},
	stepLabel: {
		fontSize: '1rem',
	},
	logo: { height: window.innerHeight, marginBottom: 20 },
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
		fontSize: '1.4em',
		margin: 0,
		font: 'normal 28px Tahoma, Arial, sans-serif',
		flexWrap: 'wrap' as any,
		color: '#142A4F',
	},
};

interface IProps {
	defaultRegisterData: IRegisterDataForm;
	defaultPersonData: IPersonDataForm;
	defaultEducationData: IEducationDataForm;
	defaultContactsData: IContactDataForm;
	defaultDocumentsData: IDocument[];
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
	submitAddDocumentsDataForm: (documentsData: IDocument[]) => void;
	onChangeConfirmationCode: (event: ChangeEvent<HTMLInputElement>) => void;
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
				<div
					style={{
						height: 64,
						marginBottom: 20,
						backgroundColor: '#e8f0ff',
						paddingTop: 5,
						paddingBottom: 5,
						paddingLeft: 20,
						paddingRight: 20,
						alignItems: 'center',
						display: 'flex',
					}}>
					<img style={{ maxHeight: 60 }} src={Logo} />
					<div style={{ display: 'flex', flex: 1, justifyContent: 'center' }}>
						<h2 className={this.props.classes.subHead}>Электронная подача документов для поступления в Университет</h2>
					</div>
				</div>
				<h2 style={{ color: '#3f51b5', fontSize: '1.3rem', textAlign: 'center' }}>
					Приемная компания {new Date().getFullYear()}
				</h2>
				<CardMedia className={this.props.classes.logo} image={BackgroundLogo}>
					<Stepper
						style={{
							marginRight: 50,
							marginLeft: 50,
							backgroundColor: '#fdfdff',
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
									disabled={index >= this.props.passedStep}>
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
											defaultData={this.props.defaultRegisterData}
											checkLoginError={this.props.checkLoginError}
											checkPersonError={this.props.checkPersonError}
											onCheckLogin={this.props.onCheckLogin}
											submit={this.props.submitRegisterDataForm}
										/>
									)}
									{index === 1 && (
										<PersonDataForm
											defaultData={this.props.defaultPersonData}
											submit={this.props.submitPersonDataForm}
										/>
									)}
									{index === 2 && (
										<ContactsDataForm
											defaultData={this.props.defaultContactsData}
											submit={this.props.submitContactsDataForm}
										/>
									)}
									{index === 3 && (
										<EducationDataForm
											defaultData={this.props.defaultEducationData}
											submit={this.props.submitEducationDataForm}
										/>
									)}
									{index === 4 && (
										<DocumentsDataForm
											defaultData={this.props.defaultDocumentsData}
											submit={this.props.submitAddDocumentsDataForm}
										/>
									)}
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
