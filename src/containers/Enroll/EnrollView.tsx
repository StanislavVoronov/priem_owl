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
	validateRegistrationForm,
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

interface IProps extends IEnrollForm {
	createPersonError: IServerError | null;
	steps: string[];
	activeStep: number;
	passedStep: number;
	onChangeConfirmCode: (event: ChangeEvent<HTMLInputElement>) => void;
	handleStep: (step: number) => any;
	classes: Record<string, string>;
	dictionaries: IDictionaryState;
	loading: boolean;
	submit: () => void;
	updateEducationForm: (data: Partial<IEducationForm>) => void;
	updatePersonForm: (data: Partial<IPersonForm>) => void;
	updateContactsForm: (data: Partial<IContactsForm>) => void;
	updateRegisterForm: (data: Partial<IRegisterForm>) => void;
	updateDocumentsForm: (data: IDocument[]) => void;
	invalidData: Record<string, string>;
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
			case 5: {
				return 'Отправить код';
			}
			default: {
				return 'Далее';
			}
		}
	};
	renderError = () => {
		if (this.props.createPersonError) {
			return <H2 color="red">{this.props.createPersonError.message}</H2>;
		}

		return null;
	};
	renderForm = () => {
		switch (this.props.activeStep) {
			case 0: {
				return (
					<RegisterForm
						invalidData={this.props.invalidData}
						updateForm={this.props.updateRegisterForm}
						dictionaries={this.props.dictionaries}
						data={this.props.registrationData}
					/>
				);
			}
			case 1: {
				return (
					<PersonForm
						dictionaries={this.props.dictionaries}
						updateForm={this.props.updatePersonForm}
						data={this.props.personData}
					/>
				);
			}
			case 2: {
				return (
					<ContactsForm
						dictionaries={this.props.dictionaries}
						data={this.props.contactsData}
						invalidData={this.props.invalidData}
						updateForm={this.props.updateContactsForm}
					/>
				);
			}
			case 3: {
				return (
					<EducationForm
						updateForm={this.props.updateEducationForm}
						dictionaries={this.props.dictionaries}
						data={this.props.educationData}
					/>
				);
			}
			case 4: {
				return (
					<DocumentsForm
						isForeigner={this.props.personData.document.docGovernment.id !== 1}
						dictionaries={this.props.dictionaries}
						documents={this.props.documents}
						updateForm={this.props.updateDocumentsForm}
					/>
				);
			}
			case 5: {
				return (
					<TextInput
						label="Код подтверждения"
						type="number"
						onBlur={this.props.onChangeConfirmCode}
						helperText={`Введите код, отправленный на указанную в контактах электронную почту`}
					/>
				);
			}
			default: {
				return (
					<h2 style={{ textAlign: 'center' }}>
						Процесс подачи документов для поступления в Университет успешно завершен!
					</h2>
				);
			}
		}
	};
	validateForm = () => {
		switch (this.props.activeStep) {
			case 0: {
				return Object.keys(validateRegistrationForm(this.props.registrationData)).length > 0;
			}
			default: {
				return false;
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
									{this.renderError()}
									<LoadingButton
										loading={this.props.loading}
										onClick={this.props.submit}
										disabled={this.validateForm()}>
										{this.renderTitleButton()}
									</LoadingButton>
								</StepContent>
							</Step>
						))}
					</Stepper>
				</CardMedia>
			</React.Fragment>
		);
	}
}

export default withStyles(localStyles)(EnrollView);
