import TextInput from '../../../platform/TextInput';
import React from 'react';
import { AppContext } from '../App';
import { Autocomplete, RadioGroupButton } from '../../../platform';
import {
	composeStyles,
	EDictionaryNameList,
	Gender,
	GlobalStyles,
	inValidateDataForm,
	IRootState,
	makeVerticalSpace,
} from '../../../common';
import { IDictionary } from '@mgutm-fcu/dictionary';
import { IRegisterFormData, PersonInfo } from '../models';
import { connect, MapStateToProps } from 'react-redux';
import { checkPersonExist, checkPersonLogin } from '../operations';
import { enrollStateSelector } from '../selectors';
import Button from '@material-ui/core/Button';
import { IServerError } from '../serverModels';

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
}
interface IStateProps {
	npId: number;
	checkPersonLoginError: IServerError | null;
}
type IProps = IOwnProps & IStateProps & IDispatchProps;

const GENDERS = [{ value: 1, label: 'Муж.', color: 'primary' }, { value: 2, label: 'Жен.' }];

interface IState extends IRegisterFormData {
	repeatPassword: string;
}
class RegisterDataForm extends React.PureComponent<IProps, IState> {
	public state: IState = {
		gender: Gender.None,
		lastName: 'test',
		firstName: 'test',
		middleName: 'test',
		birthday: new Date().toISOString(),
		login: 'test123456',
		password: 'test1234',
		repeatPassword: 'test1234',
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
				gender: gender === '1' ? Gender.Male : Gender.Female,
			}),
			this.checkPersonExist,
		);
	};
	public checkPersonExist = () => {
		const { firstName, lastName, gender, birthday, middleName } = this.state;

		if (firstName && lastName && birthday && gender) {
			this.props.checkPersonExist({ firstName, lastName, birthday, middleName });
		}
	};
	submit = () => {
		const { repeatPassword, ...rest } = this.state;
		this.props.submit(rest);
	};
	public render() {
		console.log('state', this.state);
		return (
			<AppContext.Consumer>
				{context => {
					const dictionaryFirstNames = context[EDictionaryNameList.FirstNames];
					const dictionaryMiddleNames = context[EDictionaryNameList.MiddleNames];

					const inValidPassword = this.state.password.length > 0 && this.state.password.length < 7;
					const inValidRepeatPassword =
						this.state.password && this.state.repeatPassword ? this.state.repeatPassword != this.state.password : false;
					const filteredDictionaryMiddleName = this.state.gender
						? { values: dictionaryMiddleNames.values.filter((item: any) => item.sex == this.state.gender) }
						: dictionaryMiddleNames;
					const { middleName, ...rest } = this.state;
					const isValidForm =
						inValidateDataForm(rest) || inValidRepeatPassword || inValidPassword || !!this.props.checkPersonLoginError;

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
								currentValue={String(this.state.gender)}
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
									type="password"
									onBlur={this.onChangePasswordField}
									hasError={inValidPassword}
									helperText={'Пароль должен быть не менее 7 символов'}
								/>
								<TextInput
									required={true}
									type="password"
									label="Подтвердить пароль"
									onBlur={this.onChangeRepeatPasswordField}
									hasError={inValidRepeatPassword}
									helperText={inValidRepeatPassword ? 'Пароли не совпадают' : ''}
								/>
							</React.Fragment>
							<div style={GlobalStyles.buttonNext}>
								<Button variant="contained" color="primary" disabled={isValidForm} onClick={this.submit}>
									{'Далее'}
								</Button>
							</div>
						</div>
					);
				}}
			</AppContext.Consumer>
		);
	}
}
const mapStateToProps: MapStateToProps<IStateProps, IOwnProps, IRootState> = state => {
	const { npId, checkPersonLoginError } = enrollStateSelector(state);
	return {
		npId,
		checkPersonLoginError,
	};
};
export default connect(
	mapStateToProps,
	{
		checkPersonExist,
		checkPersonLogin,
	},
)(RegisterDataForm);
