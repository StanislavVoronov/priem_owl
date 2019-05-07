import * as React from 'react';

import { Stepper, StepContent, Step, TextInput, Button, StepButton, CardMedia, withStyles, H2 } from '$components';
import {
	IContactsForm,
	IEducationForm,
	IPersonForm,
	IRegisterForm,
	IDocument,
	IServerError,
	EnrollForms,
} from '$common';
import styles from './styles.module.css';
import { ContactsForm, RegisterForm, PersonForm, EducationForm, DocumentsForm } from '$components';
import BackgroundLogo from '$assets/logo.png';
import Logo from '$assets/mgutm.png';
import { ChangeEvent } from 'react';
import { IDictionaryState } from '@mgutm-fcu/dictionary';
import LoadingButton from '../../components/Buttons/LoadingButtont';
import { IEnrollForm } from './models';

const localStyles = {
	logo: { height: window.innerHeight },
	stepper: {
		height: window.innerHeight,
		marginBottom: 50,
		marginRight: 50,
		marginLeft: 50,
		backgroundColor: '#fdfdff',
		borderRadius: 10,
		boxShadow: '0px 0px 0px 1px rgba(0,0,0,0.3)',
	},
};

interface IProps {
	registrationCompleted: boolean;
	createPersonError: IServerError | null;
	defaultData: IEnrollForm;
	steps: string[];
	activeStep: number;
	passedStep: number;
	submitEducationDataForm: (educationData: IEducationForm) => void;
	submitContactsDataForm: (contactsData: IContactsForm) => void;
	submitAddDocumentsDataForm: (documentsData: IDocument[]) => void;
	onChangeConfirmCode: (event: ChangeEvent<HTMLInputElement>) => void;
	handleStep: (step: number) => any;
	classes: Record<string, string>;
	dictionaries: IDictionaryState;
	updateForm: (form: keyof IEnrollForm) => <T>(field: keyof EnrollForms, value: T) => void;
	invalidData: Partial<EnrollForms>;
	loading: boolean;
	submit: () => void;
}

export class EnrollView extends React.PureComponent<IProps> {
	static defaultProps = {
		classes: {},
	};
	renderTitleButton = () => {
		switch (this.props.activeStep) {
			case 0: {
				return 'Зарегистрироваться';
			}
			default: {
				return 'Далее';
			}
		}
	};
	renderForm = () => {
		switch (this.props.activeStep) {
			case 0: {
				return (
					<RegisterForm
						invalidData={this.props.invalidData}
						updateForm={this.props.updateForm('registerForm')}
						dictionaries={this.props.dictionaries}
						defaultData={this.props.defaultData.registerForm}
					/>
				);
			}
			case 1: {
				return (
					<PersonForm
						dictionaries={this.props.dictionaries}
						updateForm={this.props.updateForm('personForm')}
						defaultData={this.props.defaultData.personForm}
					/>
				);
			}
			case 2: {
				return (
					<ContactsForm
						updateForm={this.props.updateForm('contactsForm')}
						dictionaries={this.props.dictionaries}
						defaultData={this.props.defaultData.contactsForm}
						invalidData={this.props.invalidData}
					/>
				);
			}
			case 3: {
				return (
					<EducationForm
						dictionaries={this.props.dictionaries}
						defaultData={this.props.defaultData.educationForm}
						submit={this.props.submitEducationDataForm}
					/>
				);
			}
			case 4: {
				return (
					<DocumentsForm
						isForeigner={this.props.defaultData.personForm.document.docGovernment.id !== 1}
						dictionaries={this.props.dictionaries}
						defaultData={this.props.defaultData.documentsForm}
						submit={this.props.submitAddDocumentsDataForm}
					/>
				);
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
					<h2 className={styles.pkTitle}>Приемная компания {new Date().getFullYear()}</h2>
				</div>
				<h2 className={styles.namePageTitle}>Электронная подача документов для поступления в Университет</h2>
				<CardMedia className={this.props.classes.logo} image={BackgroundLogo}>
					<Stepper className={this.props.classes.stepper} activeStep={this.props.activeStep} orientation={'vertical'}>
						{this.props.steps.map((label, index) => (
							<Step key={label}>
								<StepButton onClick={this.props.handleStep(index)} disabled={index >= this.props.passedStep}>
									<span className={index === this.props.activeStep ? styles.currentStepLabel : ''}>{label}</span>
								</StepButton>
								<StepContent>
									{this.renderForm()}
									<LoadingButton
										loading={this.props.loading}
										onClick={this.props.submit}
										disabled={Object.keys(this.props.invalidData).length > 0}>
										{this.renderTitleButton()}
									</LoadingButton>
								</StepContent>
							</Step>
						))}
						{this.props.registrationCompleted && (
							<h2 style={{ textAlign: 'center' }}>
								Процесс подачи документов для поступления в Университет успешно завершен!
							</h2>
						)}
						{!this.props.registrationCompleted && this.props.activeStep >= this.props.steps.length ? (
							<React.Fragment>
								<p>
									<TextInput
										label="Код подтверждения"
										type="number"
										onBlur={this.props.onChangeConfirmCode}
										helperText={`Введите код, отправленный на указанную в контактах электронную почту`}
									/>
								</p>
								{this.props.createPersonError && <H2 color="red">{this.props.createPersonError.message}</H2>}
							</React.Fragment>
						) : null}
					</Stepper>
				</CardMedia>
			</React.Fragment>
		);
	}
}

export default withStyles(localStyles)(EnrollView);
