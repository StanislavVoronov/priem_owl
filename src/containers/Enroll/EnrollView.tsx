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
	validatePersonForm,
	validateContactsForm,
	validateEducationForm,
	validateDocument,
	validateDocumentsForm,
} from '$common';
import styles from './styles.module.css';
import { ContactsForm, RegisterForm, PersonForm, EducationForm, DocumentsForm } from '$components';
import BackgroundLogo from '$assets/logo.png';
import Logo from '$assets/mgutm.png';
import { ChangeEvent } from 'react';
import { IDictionary, IDictionaryState } from '@mgutm-fcu/dictionary';
import LoadingButton from '../../components/Buttons/LoadingButtont';
import { IEnrollForm } from './models';
import CircularProgress from '@material-ui/core/CircularProgress';

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

interface IProps extends IEnrollForm {
	error: IServerError | null;
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
}

export class EnrollView extends React.PureComponent<IProps> {
	static defaultProps = {
		classes: {},
	};
	validateForm = () => {
		switch (this.props.activeStep) {
			case 0: {
				return validateRegistrationForm(this.props.registrationData);
			}
			case 1: {
				return validatePersonForm(this.props.personData);
			}
			case 2: {
				return validateContactsForm(this.props.contactsData);
			}
			case 3: {
				return validateEducationForm(this.props.educationData);
			}
			case 4: {
				return validateEducationForm(this.props.educationData);
			}
			case 5: {
				return validateDocumentsForm(this.props.documents);
			}
			default: {
				return true;
			}
		}
	};
	getButtonTitle = () => {
		switch (this.props.activeStep) {
			case 0: {
				return 'Зарегистрироваться';
			}
			case 5: {
				return 'Отправить';
			}
			default: {
				return 'Далее';
			}
		}
	};
	renderButton = () => {
		return (
			<LoadingButton loading={this.props.loading} onClick={this.props.submit} disabled={!this.validateForm()}>
				{this.getButtonTitle()}
			</LoadingButton>
		);
	};
	renderError = () => {
		return (
			this.props.error && (
				<div style={{ marginTop: 16, marginBottom: 4, display: 'flex', justifyContent: 'center' }}>
					<H2 color="red">{this.props.error.message}</H2>
				</div>
			)
		);
	};
	renderForm = () => {
		switch (this.props.activeStep) {
			case 0: {
				return (
					<React.Fragment>
						<RegisterForm
							updateForm={this.props.updateRegisterForm}
							dictionaries={this.props.dictionaries}
							data={this.props.registrationData}
						/>
						{this.renderError()}
						{this.renderButton()}
					</React.Fragment>
				);
			}
			case 1: {
				return (
					<React.Fragment>
						<PersonForm
							dictionaries={this.props.dictionaries}
							updateForm={this.props.updatePersonForm}
							data={this.props.personData}
						/>
						{this.renderError()}
						{this.renderButton()}
					</React.Fragment>
				);
			}
			case 2: {
				return (
					<React.Fragment>
						<ContactsForm
							dictionaries={this.props.dictionaries}
							data={this.props.contactsData}
							updateForm={this.props.updateContactsForm}
						/>
						{this.renderError()}
						{this.renderButton()}
					</React.Fragment>
				);
			}
			case 3: {
				return (
					<React.Fragment>
						<EducationForm
							updateForm={this.props.updateEducationForm}
							dictionaries={this.props.dictionaries}
							data={this.props.educationData}
						/>
						{this.renderButton()}
					</React.Fragment>
				);
			}
			case 4: {
				return (
					<React.Fragment>
						<DocumentsForm
							isForeigner={this.props.personData.document.docGovernment.id !== 1}
							dictionaries={this.props.dictionaries}
							documents={this.props.documents}
							updateForm={this.props.updateDocumentsForm}
						/>
						{this.renderButton()}
					</React.Fragment>
				);
			}
			case 5: {
				return (
					<React.Fragment>
						<TextInput
							label="Код подтверждения"
							type="number"
							onBlur={this.props.onChangeConfirmCode}
							helperText={`Введите код, отправленный на указанную в контактах электронную почту`}
						/>
						{this.renderButton()}
					</React.Fragment>
				);
			}
			default: {
				return (
					<h2 style={{ textAlign: 'center', color: 'green' }}>
						Процесс подачи документов для поступления в Университет успешно завершен!
					</h2>
				);
			}
		}
	};
	render() {
		const loading =
			Object.keys(this.props.dictionaries).length === 0 ||
			Object.values(this.props.dictionaries).find((item: IDictionary) => item.fetching) !== undefined;

		return (
			<React.Fragment>
				<div className={styles.header}>
					<img className={styles.logo} src={Logo} />
					<h2 className={styles.pkTitle}>Приемная компания {new Date().getFullYear()}</h2>
				</div>
				<h2 className={styles.namePageTitle}>Электронная подача документов для поступления в Университет</h2>
				<CardMedia className={this.props.classes.logo} image={BackgroundLogo}>
					<Stepper className={this.props.classes.stepper} activeStep={this.props.activeStep} orientation={'vertical'}>
						{!loading ? (
							this.props.steps.map((label, index) => (
								<Step key={label}>
									<StepButton onClick={this.props.handleStep(index)} disabled={index >= this.props.passedStep}>
										<span className={index === this.props.activeStep ? styles.currentStepLabel : ''}>{label}</span>
									</StepButton>
									<StepContent>{this.renderForm()}</StepContent>
								</Step>
							))
						) : (
							<React.Fragment>
								<div
									style={{
										height: 150,
										display: 'flex',
										flexDirection: 'column',
										justifyContent: 'center',
										alignItems: 'center',
									}}>
									<CircularProgress />
									<h3>Загрузка справочников</h3>
								</div>
							</React.Fragment>
						)}
					</Stepper>
				</CardMedia>
			</React.Fragment>
		);
	}
}

export default withStyles(localStyles)(EnrollView);
