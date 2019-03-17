import TextInput from '../../../platform/TextInput';
import React from 'react';
import { AppContext } from '../../../App';
import { Autocomplete, RadioGroupButton } from '../../../platform';
import {
	composeStyles,
	EDictionaryNameList,
	IRootState,
	makeVerticalSpace,
	GlobalStyles,
	validateDataForm,
} from '../../../common';
import { IDictionary } from '@mgutm-fcu/dictionary';
import { IRegisterFormData, PersonInfo } from '../models';
import { connect, MapStateToProps } from 'react-redux';
import {
	checkPersonExist,
	checkPersonLogin,
	registerNewPerson,
	verifyPerson,
	confirmRegisterCode,
} from '../operations';
import { enrollStateSelector } from '../selectors';
import Button from '@material-ui/core/Button';
import { IServerError } from '../ServerModels';

const prepareDictionarySuggestions = (dictionary: IDictionary) => {
	if (!dictionary || !Array.isArray(dictionary.values)) {
		return [];
	}
	return dictionary.values.map((item: any) => item.name);
};
interface IOwnProps {
	submit(data: IRegisterFormData): void;
}
interface IDispatchProps {
	checkPersonExist(data: PersonInfo): void;
	checkPersonLogin(login: string): void;
	registerNewPerson(login: string, password: string): Promise<number>;
	verifyPerson(email: string): void;
	confirmRegisterCode(registerCode: string): Promise<void>;
}
interface IStateProps {
	npId: number;
	confirmationCodeAvailable: boolean;
	checkPersonLoginError: IServerError | null;
}
type IProps = IOwnProps & IStateProps & IDispatchProps;

const GENDERS = [{ value: 1, label: 'Муж.', color: 'primary' }, { value: 2, label: 'Жен.' }];

interface IState extends IRegisterFormData {
	repeatPassword: string;
	registerCode: string;
}
class RegisterDataForm extends React.PureComponent<IProps, IState> {
	public state: IState = {
		gender: '',
		lastName: '',
		firstName: '',
		middleName: '',
		birthday: '',
		login: '',
		password: '',
		repeatPassword: '',
		email: '',
		registerCode: '',
	};
	public onChangeTextField = (name: string) => (value: string) => {
		this.setState(
			state => ({
				...state,
				[name]: value,
			}),
			this.checkPersonExist,
		);
	};
	onChangeLoginField = (value: string) => {
		this.setState(state => ({
			...state,
			login: value,
		}));

		this.props.checkPersonLogin(value);
	};
	onChangePasswordField = (value: string) => {
		this.setState(state => ({
			...state,
			password: value,
		}));
	};
	onChangeRegisterCode = (value: string) => {
		this.setState(state => ({
			...state,
			registerCode: value,
		}));
	};
	onChangeRepeatPasswordField = (value: string) => {
		this.setState(state => ({
			...state,
			repeatPassword: value,
		}));
	};
	public onChangeFirstName = (dictionaryFirstNames: IDictionary) => (value: string, index?: number) => {
		this.setState(
			state => ({
				...state,
				firstName: value,
				gender: index !== undefined ? dictionaryFirstNames.values[index].sex.toString() : '',
			}),
			this.checkPersonExist,
		);
	};
	public onChangeGender = (event: any, gender: string) => {
		this.setState(
			state => ({
				...state,
				gender,
			}),
			this.checkPersonExist,
		);
	};
	public checkPersonExist = () => {
		const { firstName, lastName, gender, birthday, middleName, email } = this.state;

		if (firstName && lastName && birthday && gender) {
			this.props.checkPersonExist({ firstName, lastName, birthday, middleName });
		}
	};
	confirmRegisterCode = () => {
		this.props.confirmRegisterCode(this.state.registerCode).then(this.submit);
	};
	registerNewPerson = () => {
		const { login, password, email } = this.state;
		this.props.registerNewPerson(login, password).then(() => {
			this.props.verifyPerson(email);
		});
	};
	submit = () => {
		const { registerCode, repeatPassword, ...rest } = this.state;
		this.props.submit(rest);
	};
	public render() {
		console.log('state', this.state);
		return (
			<AppContext.Consumer>
				{context => {
					const dictionaryFirstNames = context[EDictionaryNameList.FirstNames];
					const dictionaryMiddleNames = context[EDictionaryNameList.MiddleNames];

					const isValidPassword = this.state.password.length > 0 && this.state.password.length < 7;
					const isValidRepeatPassword =
						this.state.password && this.state.repeatPassword ? this.state.repeatPassword != this.state.password : false;
					const filteredDictionaryMiddleName = this.state.gender
						? { values: dictionaryMiddleNames.values.filter((item: any) => item.sex == this.state.gender) }
						: dictionaryMiddleNames;
					const { middleName, ...rest } = this.state;
					console.log('validatge', validateDataForm(rest), rest);
					return (
						<div style={composeStyles(GlobalStyles.flexColumn)}>
							<TextInput
								required={true}
								placeholder={'Введите фамилию'}
								label="Фамилия"
								onBlur={this.onChangeTextField('lastName')}
							/>
							<Autocomplete
								label={'Имя'}
								required={true}
								onChange={this.onChangeFirstName(dictionaryFirstNames)}
								placeholder={'Введите имя'}
								style={makeVerticalSpace('small')}
								suggestions={prepareDictionarySuggestions(dictionaryFirstNames)}
							/>

							<Autocomplete
								label={'Отчество'}
								placeholder={'Введите отчество'}
								onChange={this.onChangeTextField('middleName')}
								style={makeVerticalSpace('small')}
								suggestions={prepareDictionarySuggestions(filteredDictionaryMiddleName)}
							/>

							<RadioGroupButton
								title="Пол"
								required={true}
								currentValue={this.state.gender}
								values={GENDERS}
								onChange={this.onChangeGender}
							/>
							<TextInput
								required={true}
								label="Дата рождения"
								type="date"
								onBlur={this.onChangeTextField('birthday')}
							/>

							<React.Fragment>
								<TextInput
									required={true}
									regExp={'[a-zA-z0-9]'}
									label="Логин"
									onChange={this.onChangeLoginField}
									hasError={!!this.props.checkPersonLoginError}
									helperText={
										this.props.checkPersonLoginError
											? this.props.checkPersonLoginError.message
											: 'Логин должен быть не менее 5 символов'
									}
								/>

								<TextInput
									required={true}
									label="Пароль"
									onBlur={this.onChangePasswordField}
									hasError={isValidPassword}
									helperText={'Пароль должен быть не менее 7 символов'}
								/>

								<TextInput
									required={true}
									label="Подтвердить пароль"
									onBlur={this.onChangeRepeatPasswordField}
									hasError={isValidRepeatPassword}
									helperText={isValidRepeatPassword ? 'Пароли не совпадают' : ''}
								/>

								<TextInput
									required={true}
									disabled={!!this.props.npId}
									regExp={'[a-zA-z0-9_-]'}
									label="Электронная почта"
									onBlur={this.onChangeTextField('email')}
									helperText={'Необходимо для подтверждения учетной записи'}
								/>
							</React.Fragment>
							<div style={{ marginTop: 30, marginBottom: 30 }}>
								{!this.props.confirmationCodeAvailable ? (
									<Button
										disabled={
											!validateDataForm(rest) &&
											!isValidPassword &&
											!isValidRepeatPassword &&
											!this.props.checkPersonLoginError &&
											this.state.login.length < 5 &&
											this.state.password.length < 7 &&
											!this.props.confirmationCodeAvailable
										}
										variant="contained"
										color="primary"
										onClick={this.registerNewPerson}>
										{'Регистрация'}
									</Button>
								) : (
									<React.Fragment>
										<div>
											<TextInput
												required={true}
												type="number"
												label="Код подтверждения регистрации"
												onChange={this.onChangeRegisterCode}
												helperText={`Введите код, отравленный на ${this.state.email}`}
											/>
										</div>
										<div style={{ marginTop: 20, marginBottom: 20 }}>
											<Button
												disabled={!this.state.registerCode}
												variant="contained"
												color="primary"
												onClick={this.confirmRegisterCode}>
												{'Подтвердить'}
											</Button>
										</div>
									</React.Fragment>
								)}
							</div>
						</div>
					);
				}}
			</AppContext.Consumer>
		);
	}
}
const mapStateToProps: MapStateToProps<IStateProps, IOwnProps, IRootState> = state => {
	const { npId, confirmationCodeAvailable, checkPersonLoginError } = enrollStateSelector(state);
	return {
		npId,
		confirmationCodeAvailable,
		checkPersonLoginError,
	};
};
export default connect(
	mapStateToProps,
	{
		checkPersonExist,
		checkPersonLogin,
		registerNewPerson,
		verifyPerson,
		confirmRegisterCode,
	},
)(RegisterDataForm);
