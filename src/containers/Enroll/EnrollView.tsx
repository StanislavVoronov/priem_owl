import * as React from 'react';
import { ChangeEvent, FormEvent } from 'react';

import {
	CardMedia,
	ContactsForm,
	DocumentsForm,
	EducationForm,
	H2,
	PersonForm,
	RegisterForm,
	Step,
	StepButton,
	StepContent,
	Stepper,
	TextInput,
	withStyles,
} from '$components';
import {
	IContactsForm,
	IDocument,
	IEducationForm,
	IPersonForm,
	IRegisterForm,
	IServerError,
	validateContactsForm,
	validateDocumentsForm,
	validateEducationForm,
	validatePersonForm,
	validateRegistrationForm,
} from '$common';
import styles from './styles.module.css';
import Logo from '$assets/mgutm.png';
import { IDictionary, IDictionaryState } from '@mgutm-fcu/dictionary';
import LoadingButton from '../../components/Buttons/LoadingButtont';
import { EnrollForm, IEnrollForm } from './models';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Title } from '../../components/Typography/Title';

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
	steps: EnrollForm[];
	activeStep: EnrollForm;
	passedStep: number;
	onChangeConfirmCode: (event: ChangeEvent<HTMLInputElement>) => void;
	handleStep: (step: EnrollForm) => any;
	classes: Record<string, string>;
	dictionaries: IDictionaryState;
	loading: boolean;
	submit: (event: FormEvent<HTMLFormElement>) => void;
	updateEducationForm: (data: Partial<IEducationForm>) => void;
	updatePersonForm: (data: Partial<IPersonForm>) => void;
	updateContactsForm: (data: Partial<IContactsForm>) => void;
	updateRegisterForm: (data: Partial<IRegisterForm>) => void;
	updateDocumentsForm: (data: IDocument[]) => void;
	registrationCompleted: boolean;
}

export class EnrollView extends React.PureComponent<IProps> {
	static defaultProps = {
		classes: {},
	};
	validateForm = () => {
		switch (this.props.activeStep) {
			case EnrollForm.Registration: {
				return validateRegistrationForm(this.props.registrationData);
			}
			case EnrollForm.Person: {
				return validatePersonForm(this.props.personData);
			}
			case EnrollForm.Contacts: {
				const { homePhone, ...rest } = this.props.contactsData;

				return validateContactsForm(rest);
			}
			case EnrollForm.Education: {
				return validateEducationForm(this.props.educationData);
			}
			case EnrollForm.Documents: {
				return validateEducationForm(this.props.educationData);
			}
			case EnrollForm.ConfirmEmail: {
				return validateDocumentsForm(this.props.documents);
			}
			default: {
				return true;
			}
		}
	};
	getButtonTitle = () => {
		switch (this.props.activeStep) {
			case EnrollForm.Registration: {
				return 'Зарегистрироваться';
			}
			case EnrollForm.ConfirmEmail: {
				return 'Отправить';
			}
			default: {
				return 'Далее';
			}
		}
	};
	renderButton = () => {
		return (
			<LoadingButton disabled={!this.validateForm()} loading={this.props.loading}>
				{this.getButtonTitle()}
			</LoadingButton>
		);
	};
	renderError = () => {
		return (
			this.props.error && (
				<div className={styles.errorContainer}>
					<H2 color="red">{this.props.error.message}</H2>
				</div>
			)
		);
	};
	renderForm = () => {
		switch (this.props.activeStep) {
			case EnrollForm.Registration: {
				return (
					<RegisterForm
						updateForm={this.props.updateRegisterForm}
						dictionaries={this.props.dictionaries}
						data={this.props.registrationData}
					/>
				);
			}
			case EnrollForm.Person: {
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
			case EnrollForm.Contacts: {
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
			case EnrollForm.Education: {
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
			case EnrollForm.Documents: {
				return (
					<React.Fragment>
						<DocumentsForm
							isForeigner={this.props.personData.document.docGovernment.id !== 1}
							dictionaries={this.props.dictionaries}
							defaultData={{ documents: this.props.documents, cheatType: { id: 0, name: 'Нет преимуществ' } }}
							updateForm={this.props.updateDocumentsForm}
						/>
						{this.renderButton()}
					</React.Fragment>
				);
			}
			case EnrollForm.ConfirmEmail: {
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
				return null;
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
				<CardMedia className={this.props.classes.logo}>
					<Stepper
						className={this.props.classes.stepper}
						activeStep={this.props.steps.findIndex(item => item === this.props.activeStep)}
						orientation={'vertical'}>
						{!loading ? (
							this.props.steps.map((label: EnrollForm, index: number) => (
								<Step key={label}>
									<StepButton onClick={this.props.handleStep(label)} disabled={index >= this.props.passedStep}>
										<span className={label === this.props.activeStep ? styles.currentStepLabel : ''}>{label}</span>
									</StepButton>
									{this.props.activeStep === this.props.steps[index] && <StepContent>{this.renderForm()}</StepContent>}
								</Step>
							))
						) : (
							<React.Fragment>
								<div className={styles.loading}>
									<CircularProgress />
									<h3>Загрузка справочников</h3>
								</div>
							</React.Fragment>
						)}
						{this.props.registrationCompleted && (
							<Title color="green">Процесс подачи документов для поступления в Университет успешно завершен!</Title>
						)}
					</Stepper>
				</CardMedia>
			</React.Fragment>
		);
	}
}

export default withStyles(localStyles)(EnrollView);
