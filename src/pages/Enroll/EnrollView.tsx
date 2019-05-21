import * as React from 'react';

import styles from './styles.module.css';
import Logo from '$assets/mgutm.png';
import { EnrollForm } from './models';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Title } from '../../components/Typography/Title';
import EnrollRegistrationContainer from '../../containers/EnrollRegistration/EnrollRegistrationContainer';
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

export class EnrollView extends React.PureComponent<any> {
	static defaultProps = {
		classes: {},
	};

	renderForm = () => {
		switch (this.props.activeStep) {
			case 0: {
				return <EnrollRegistrationContainer />;
			}
			// case EnrollForm.Person: {
			// 	return (
			// 		<React.Fragment>
			// 			<PersonForm
			// 				dictionaries={this.props.dictionaries}
			// 				updateForm={this.props.updatePersonForm}
			// 				data={this.props.personData}
			// 			/>
			// 			{this.renderError()}
			// 			{this.renderButton()}
			// 		</React.Fragment>
			// 	);
			// }
			// case EnrollForm.Contacts: {
			// 	return (
			// 		<React.Fragment>
			// 			<ContactsForm
			// 				dictionaries={this.props.dictionaries}
			// 				data={this.props.contactsData}
			// 				updateForm={this.props.updateContactsForm}
			// 			/>
			// 			{this.renderError()}
			// 			{this.renderButton()}
			// 		</React.Fragment>
			// 	);
			// }
			// case EnrollForm.Education: {
			// 	return (
			// 		<React.Fragment>
			// 			<EducationForm
			// 				updateForm={this.props.updateEducationForm}
			// 				dictionaries={this.props.dictionaries}
			// 				data={this.props.educationData}
			// 			/>
			// 			{this.renderButton()}
			// 		</React.Fragment>
			// 	);
			// }
			// case EnrollForm.Documents: {
			// 	return (
			// 		<React.Fragment>
			// 			<DocumentsForm
			// 				isForeigner={this.props.personData.document.docGovernment.id !== 1}
			// 				dictionaries={this.props.dictionaries}
			// 				defaultData={{ documents: this.props.documents, cheatType: { id: 0, name: 'Нет преимуществ' } }}
			// 				updateForm={this.props.updateDocumentsForm}
			// 			/>
			// 			{this.renderButton()}
			// 		</React.Fragment>
			// 	);
			// }
			// case EnrollForm.ConfirmEmail: {
			// 	return (
			// 		<React.Fragment>
			// 			<TextInput
			// 				label="Код подтверждения"
			// 				type="number"
			// 				onBlur={this.props.onChangeConfirmCode}
			// 				helperText={`Введите код, отправленный на указанную в контактах электронную почту`}
			// 			/>
			// 			{this.renderButton()}
			// 		</React.Fragment>
			// 	);
			// }
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
					<h2 className={styles.pkTitle}>Приемная компания {new Date().getFullYear()}</h2>
				</div>
				<h2 className={styles.namePageTitle}>Электронная подача документов для поступления в Университет</h2>
				<CardMedia className={this.props.classes.logo}>
					<Stepper className={this.props.classes.stepper} activeStep={0} orientation={'vertical'}>
						{!loading ? (
							this.props.steps.map((label: EnrollForm, index: number) => (
								<Step key={label}>
									<StepButton disabled={index >= this.props.passedStep}>
										<span className={label === this.props.activeStep ? styles.currentStepLabel : ''}>{label}</span>
									</StepButton>
									<StepContent>{this.renderForm()}</StepContent>
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
