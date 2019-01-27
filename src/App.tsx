import { IDictionary } from '@mgutm-fcu/dictionary';
import { connect } from 'react-redux';

import * as React from 'react';

import { Stepper, StepContent, StepLabel, Step, Typography, Button, FormLabel } from './platform/';
import { PersonDataForm, ContactsDataForm, EducationDataForm } from './components/';
import {
	IState,
	IDictionaryNames,
	ISelectItem,
	EDictionaryNameList,
	makeSpace,
	Styles,
	composeStyles,
	IPersonDataState,
} from './common';
import { Dispatch } from 'redux';
interface IAppState {
	activeStep: number;
	personData: IPersonDataState;
	contactData: { [key: string]: any };
	educationData: {
		hasEge: boolean;
		prevEduc: ISelectItem | null;
		levelEduc: ISelectItem | null;
	};
}
const renderPersonStep = (
	gender: number | null,
	directories: IDictionary[],
	onChangeGender: (event: any, gender: string) => void,
	onChangeData: (field: string) => (value: string | ISelectItem) => void,
	onChangeAutocompleteTextField: (field: string) => (value: string, data?: any) => void,
) => {
	const dictionaryMiddleNames =
		directories[EDictionaryNameList.MiddleNames] && directories[EDictionaryNameList.MiddleNames].values;
	return (
		<PersonDataForm
			onChangeSelect={onChangeData}
			dictionaryFirstNames={
				directories[EDictionaryNameList.FirstNames] && directories[EDictionaryNameList.FirstNames].values
			}
			dictionaryMiddleNames={
				gender !== null
					? dictionaryMiddleNames.filter((item: IDictionaryNames) => item.sex === gender)
					: dictionaryMiddleNames
			}
			dictionaryGovernments={
				directories[EDictionaryNameList.Governments] && directories[EDictionaryNameList.Governments].values
			}
			dictionaryPersonDocTypes={
				directories[EDictionaryNameList.PersonDocTypes] && directories[EDictionaryNameList.PersonDocTypes].values
			}
			onChangeAutocompleteTextField={onChangeAutocompleteTextField}
			onChangeTextField={onChangeData}
			gender={gender}
			onChangeGender={onChangeGender}
		/>
	);
};
const renderContactStep = (
	mobPhone: string,
	mobCountry: ISelectItem,
	isRegAddressEqualLive: boolean,
	needDormitory: boolean,
	directories: IDictionary[],
	onChangeData: (field: string) => (value: string | ISelectItem) => void,
) => {
	return (
		<ContactsDataForm
			dictionaryGovernments={
				directories[EDictionaryNameList.Governments] && directories[EDictionaryNameList.Governments].values
			}
			mobPhone={mobPhone}
			mobCountry={mobCountry}
			isRegAddressEqualLive={isRegAddressEqualLive}
			needDormitory={needDormitory}
			onChangeTextField={onChangeData}
			onChangeSelect={onChangeData}
		/>
	);
};

const renderEducationStep = (
	hasEGE: boolean,
	directories: IDictionary[],
	onChangeData: (field: string) => (value: string | ISelectItem) => void,
) => {
	return (
		<EducationDataForm
			dictionaryPreviousEducation={
				directories[EDictionaryNameList.PreviousEducation] && directories[EDictionaryNameList.PreviousEducation].values
			}
			dictionaryCoolnessTypes={
				directories[EDictionaryNameList.CoolnessTypes] && directories[EDictionaryNameList.CoolnessTypes].values
			}
			dictionaryLevelEducation={
				directories[EDictionaryNameList.EducationDocTypes] && directories[EDictionaryNameList.EducationDocTypes].values
			}
			onChangeSelect={onChangeData}
			onChangeTextField={onChangeData}
		/>
	);
};

const steps = ['Персональные данные', 'Контактные данные', 'Образование', 'Документы', 'Заявления'];

export class App extends React.PureComponent<{ dictionaries: IDictionary[] }, IAppState> {
	constructor(props: never) {
		super(props);
		this.state = {
			activeStep: 0,
			contactData: {
				isRegAddressEqualLive: true,
				needDormitory: false,
				mobPhone: '',
				mobCountry: { id: 1, name: 'Россия', phone_code: '7' },
			},
			personData: {
				firstName: '',
				gender: null,
				middleName: '',
				lastName: '',
			},
			educationData: {
				hasEge: false,
				prevEduc: null,
				levelEduc: null,
			},
		};
	}
	componentDidCatch(error: any, info: any) {
		alert('Произошла ошибка');
		// You can also log the error to an error reporting service
		console.log(error, info);
	}
	public handleNext = () => {
		this.setState(state => ({ activeStep: state.activeStep + 1 }));
	};
	public handleBack = () => {
		this.setState(state => ({ activeStep: state.activeStep - 1 }));
	};
	validateDataStep = () => {
		this.handleNext();
	};
	onChangeAutocompleteTextField = (name: string) => (value: string, genderData?: IDictionaryNames) => {
		let gender = this.state.personData.gender;
		if (genderData && genderData.name) {
			gender = genderData.sex;
		}
		const state = {
			...this.state,
			personData: { ...this.state.personData, [name]: value, gender },
		};
		this.setState(() => state);
	};
	onChangeGender = (event: any, gender: string) => {
		const state = {
			...this.state,
			personData: { ...this.state.personData, gender: parseInt(gender) },
		};
		this.setState(() => state);
	};
	onChangePersonData = (name: string) => (value: string | ISelectItem) => {
		const state = {
			...this.state,
			personData: {
				...this.state.personData,
				[name]: value,
			},
		};
		this.setState(() => state);
	};
	onChangeConcatData = (name: string) => (value: string | ISelectItem) => {
		const state = {
			...this.state,
			contactData: {
				...this.state.contactData,
				[name]: value,
			},
		};
		this.setState(() => state);
	};
	onChangeEducationData = (name: string) => (value: string | ISelectItem) => {
		const state = {
			...this.state,
			educationData: {
				...this.state.educationData,
				[name]: value,
			},
		};
		this.setState(() => state);
	};
	render() {
		console.log(this.state);
		return (
			<div>
				<Stepper activeStep={this.state.activeStep} orientation={'vertical'}>
					{steps.map((label, index) => (
						<Step key={label}>
							<StepLabel>{label}</StepLabel>
							<StepContent>
								{index === 0 &&
									renderPersonStep(
										this.state.personData.gender,
										this.props.dictionaries,
										this.onChangeGender,
										this.onChangePersonData,
										this.onChangeAutocompleteTextField,
									)}
								{index === 1 &&
									renderContactStep(
										this.state.contactData.mobPhone,
										this.state.contactData.mobCountry,
										this.state.contactData.isRegAddressEqualLive,
										this.state.contactData.needDormitory,
										this.props.dictionaries,
										this.onChangeConcatData,
									)}
								{index === 2 &&
									renderEducationStep(
										this.state.educationData.hasEge,
										this.props.dictionaries,
										this.onChangeEducationData,
									)}

								<div style={composeStyles(Styles.flexRow, Styles.flexRowVerCenter, makeSpace('v-big'))}>
									{index !== 0 && (
										<React.Fragment>
											<FormLabel>
												{steps[index - 1]}
												{' <'}
											</FormLabel>
											<Button
												style={makeSpace('h-middle')}
												variant="contained"
												color="primary"
												onClick={this.handleBack}>
												{'Назад'}
											</Button>
										</React.Fragment>
									)}
									{index + 1 !== steps.length && (
										<div style={makeSpace(index !== 0 ? 'h-large' : 'none')}>
											<Button variant="contained" color="primary" onClick={this.validateDataStep}>
												{'Дальше'}
											</Button>
											<FormLabel style={makeSpace('h-middle')}>
												{'> '}
												{steps[index + 1]}
											</FormLabel>
										</div>
									)}
								</div>
							</StepContent>
						</Step>
					))}
				</Stepper>
			</div>
		);
	}
}

const mapStateToProps = (state: IState) => {
	return {
		dictionaries: state.dictionaries,
	};
};

const mapDispatchToProps = (_: Dispatch) => {
	return {};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(App);
