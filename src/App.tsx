import { IDictionary } from '@mgutm-fcu/dictionary';
import { connect } from 'react-redux';

import * as React from 'react';

import { Stepper, StepContent, StepLabel, Step, Typography, Button, FormLabel, DocDataForm } from './platform/';
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
	IContactDataState,
	IEducationDataState,
	IUploadFile,
	IDocDataForm,
	IApplicationDataForm,
} from './common';
import { Dispatch } from 'redux';
import { ApplicationsDataForm } from './components/ApplicationsDataForm';
interface IAppState {
	activeStep: number;
	personData: IPersonDataState;
	contactData: IContactDataState;
	educationData: IEducationDataState;
	docList: IDocDataForm[];
	applicationData: IApplicationDataForm;
}
const renderPersonStep = (
	state: IPersonDataState,
	dictionaries: IDictionary[],
	onChangeGender: (event: any, gender: string) => void,
	onChangeData: (field: string) => (value: string | ISelectItem) => void,
	onChangeAutocompleteTextField: (field: string) => (value: string, data?: any) => void,
) => {
	const dictionaryMiddleNames =
		dictionaries[EDictionaryNameList.MiddleNames] && dictionaries[EDictionaryNameList.MiddleNames].values;
	return (
		<PersonDataForm
			dictionaryFirstNames={
				dictionaries[EDictionaryNameList.FirstNames] && dictionaries[EDictionaryNameList.FirstNames].values
			}
			dictionaryMiddleNames={
				state.gender !== null
					? dictionaryMiddleNames.filter((item: IDictionaryNames) => item.sex === state.gender)
					: dictionaryMiddleNames
			}
			dictionaryGovernments={
				dictionaries[EDictionaryNameList.Governments] && dictionaries[EDictionaryNameList.Governments].values
			}
			dictionaryPersonDocTypes={
				dictionaries[EDictionaryNameList.PersonDocTypes] && dictionaries[EDictionaryNameList.PersonDocTypes].values
			}
			onChangeAutocompleteTextField={onChangeAutocompleteTextField}
			onChangeData={onChangeData}
			{...state}
			onChangeGender={onChangeGender}
		/>
	);
};
const renderContactStep = (
	state: IContactDataState,
	dictionaries: IDictionary[],
	onChangeData: (field: string) => (value: string | ISelectItem | IUploadFile) => void,
) => {
	return (
		<ContactsDataForm
			dictionaryGovernments={
				dictionaries[EDictionaryNameList.Governments] && dictionaries[EDictionaryNameList.Governments].values
			}
			onChangeData={onChangeData}
			{...state}
		/>
	);
};

const renderEducationStep = (
	state: IEducationDataState,
	directories: IDictionary[],
	onChangeData: (field: string) => (value: string | ISelectItem | IUploadFile) => void,
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
			onChangeData={onChangeData}
			{...state}
		/>
	);
};

const renderDocStep = (
	docList: IDocDataForm[],
	addNewDoc: () => void,
	deleteDoc: (index: number) => void,
	onChangeData: (index: number) => (name: string) => (value: string | ISelectItem | IUploadFile) => void,
	dictionaries: IDictionary[],
) => {
	return (
		<div style={Styles.flexColumn}>
			{docList.map((item: IDocDataForm, index: number) => (
				<div style={Styles.flexColumn}>
					<DocDataForm
						title={'Тип документа'}
						subTitle={item.docType ? ` Тип ${item.docType.name}` : ''}
						dictionaryTypes={
							dictionaries[EDictionaryNameList.DocTypes] && dictionaries[EDictionaryNameList.DocTypes].values
						}
						dictionarySubTypes={
							(item.docType && item.docType.id === 1 && dictionaries[EDictionaryNameList.PersonDocTypes].values) ||
							(item.docType && item.docType.id === 2 && dictionaries[EDictionaryNameList.EducationDocTypes].values)
						}
						key={`${index}${item.docNumber}${item.docSeries}`}
						onChangeData={onChangeData(index)}
						docFile={item.docFile}
					/>
					<Button
						style={{ backgroundColor: 'red', color: 'white' }}
						variant="contained"
						onClick={() => deleteDoc(index)}>
						Удалить документ
					</Button>
					<div style={composeStyles({ magrinBottom: 10, borderStyle: 'solid', borderWidth: 1, borderColor: 'grey' })} />
				</div>
			))}
			<Button
				style={{
					boxShadow: 'none',
					textTransform: 'none',
					fontSize: 16,
					padding: '6px 12px',
					border: '1px solid',
					lineHeight: 1.5,
					backgroundColor: '#007bff',
					borderColor: '#007bff',
					color: 'white',
				}}
				onClick={addNewDoc}>
				Добавить новый документ
			</Button>
		</div>
	);
};

const renderApplicationsStep = (
	onChangeData: (name: string) => (value: ISelectItem) => void,
	dictionaries: IDictionary[],
) => {
	return <ApplicationsDataForm onChangeSelect={onChangeData} dictionaries={dictionaries} />;
};
const steps = ['Персональные данные', 'Контактные данные', 'Образование', 'Документы', 'Заявления'];

export class App extends React.PureComponent<{ dictionaries: IDictionary[] }, IAppState> {
	constructor(props: never) {
		super(props);
		this.state = {
			activeStep: 0,
			docList: [],
			applicationData: {
				category: null,
				department: null,
				applicationList: [],
			},
			contactData: {
				regIndex: '',
				email: '',
				regHome: '',
				regRegion: '',
				regStreet: '',
				regLocality: '',
				needDormitory: false,
				mobPhone: '',
				mobCountry: { id: 1, name: 'Россия', phone_code: '7' },
				isRegAddressEqualLive: true,
				docFile: null,
				docType: { id: 3, name: '' },
			},
			personData: {
				docFile: null,
				birthday: null,
				docType: { id: 1, name: '' },
				docDate: null,
				codeDepartment: '',
				docIssued: '',
				docNumber: '',
				docSeries: '',
				firstName: '',
				gender: null,
				middleName: '',
				lastName: '',
			},
			educationData: {
				hasEge: false,
				prevEduc: null,
				levelEduc: null,
				isfFirstHighEducation: false,
				docNumber: '',
				docType: { id: 2, name: '' },
				docSeries: '',
				docIssued: '',
				docDate: null,
				docFile: null,
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
	onChangeDocData = (index: number) => (name: string) => (value: string | ISelectItem | IUploadFile) => {
		const docData = { ...this.state.docList[index], [name]: value };
		const docList = [...this.state.docList];
		docList[index] = docData;
		const state = {
			...this.state,
			docList,
		};
		this.setState(() => state);
	};
	deleteDocFile = (index: number) => {
		const state = {
			...this.state,
			docList: [...this.state.docList.splice(index, 1)],
		};
		this.setState(() => state);
	};
	addNewDocFile = () => {
		const state = {
			...this.state,
			docList: [
				...this.state.docList,
				{ docNumber: '', docType: null, docSeries: '', docIssued: '', docDate: null, docFile: null },
			],
		};
		this.setState(() => state);
	};
	onChangePersonData = (name: string) => (value: string | ISelectItem | IUploadFile) => {
		const state = {
			...this.state,
			personData: {
				...this.state.personData,
				[name]: value,
			},
		};
		this.setState(() => state);
	};
	onChangeContactData = (name: string) => (value: string | ISelectItem | boolean | IUploadFile) => {
		const state = {
			...this.state,
			contactData: {
				...this.state.contactData,
				[name]: value,
			},
		};
		this.setState(() => state);
	};
	onChangeEducationData = (name: string) => (value: string | ISelectItem | IUploadFile) => {
		const state = {
			...this.state,
			educationData: {
				...this.state.educationData,
				[name]: value,
			},
		};
		this.setState(() => state);
	};
	addNewApplication = (value: any) => {
		const state = {
			...this.state,
			applicationData: {
				...this.state.applicationData,
				applicationList: [...this.state.applicationData.applicationList, value],
			},
		};
		this.setState(() => state);
	};
	onChangeApplicationData = (name: string) => (value: ISelectItem) => {
		const state = {
			...this.state,
			applicationData: {
				...this.state.applicationData,
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
										this.state.personData,
										this.props.dictionaries,
										this.onChangeGender,
										this.onChangePersonData,
										this.onChangeAutocompleteTextField,
									)}
								{index === 1 &&
									renderContactStep(this.state.contactData, this.props.dictionaries, this.onChangeContactData)}
								{index === 2 &&
									renderEducationStep(this.state.educationData, this.props.dictionaries, this.onChangeEducationData)}
								{index === 3 &&
									renderDocStep(
										this.state.docList,
										this.addNewDocFile,
										this.deleteDocFile,
										this.onChangeDocData,
										this.props.dictionaries,
									)}
								{index === 4 && renderApplicationsStep(this.onChangeApplicationData, this.props.dictionaries)}
								<div style={composeStyles(Styles.flexRow, Styles.flexRowVerCenter, makeSpace('v-big'))}>
									{/*{index !== 0 && (*/}
									{/*<React.Fragment>*/}
									{/*<FormLabel>*/}
									{/*{steps[index - 1]}*/}
									{/*{' <'}*/}
									{/*</FormLabel>*/}
									{/*<Button*/}
									{/*style={makeSpace('h-middle')}*/}
									{/*variant="contained"*/}
									{/*color="primary"*/}
									{/*onClick={this.handleBack}>*/}
									{/*{'Назад'}*/}
									{/*</Button>*/}
									{/*</React.Fragment>*/}
									{/*)}*/}
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
