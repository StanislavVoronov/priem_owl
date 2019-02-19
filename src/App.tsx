import { IDictionary } from '@mgutm-fcu/dictionary';
import { connect } from 'react-redux';

import * as React from 'react';

import { Stepper, StepContent, StepLabel, Step, Typography, Button, FormLabel, DocDataForm } from './platform/';
import PersonDataForm from './components/Enroll/PersonDataForm';
import {
	IRootState,
	ISelectItem,
	makeVerticalSpace,
	Styles,
	composeStyles,
	IPersonDataState,
	IContactDataState,
	IEducationDataState,
	IUploadFile,
	IDocDataForm,
	IApplicationDataForm,
	makeHorizontalSpace,
} from './common';
import { Dispatch } from 'redux';
interface IAppState {
	activeStep: number;
	personData: IPersonDataState;
	contactData: IContactDataState;
	educationData: IEducationDataState;
	docList: IDocDataForm[];
	applicationData: IApplicationDataForm;
}

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
					{/*<DocDataForm*/}
					{/*title={'Тип документа'}*/}
					{/*subTitle={item.docType ? ` Тип ${item.docType.name}` : ''}*/}
					{/*dictionaryTypes={*/}
					{/*dictionaries[EDictionaryNameList.DocTypes] && dictionaries[EDictionaryNameList.DocTypes].values*/}
					{/*}*/}
					{/*dictionarySubTypes={*/}
					{/*(item.docType && item.docType.id === 1 && dictionaries[EDictionaryNameList.PersonDocTypes].values) ||*/}
					{/*(item.docType && item.docType.id === 2 && dictionaries[EDictionaryNameList.EducationDocTypes].values)*/}
					{/*}*/}
					{/*key={`${index}${item.docNumber}${item.docSeries}`}*/}
					{/*onChangeData={onChangeData(index)}*/}
					{/*docFile={item.docFile}*/}
					{/*/>*/}
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
		// You can also log the error to an error reporting service
		console.log(error, info);
	}
	public handleNext = () => {
		this.setState(state => ({ activeStep: state.activeStep + 1 }));
	};
	public handleBack = () => {
		this.setState(state => ({ activeStep: state.activeStep - 1 }));
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

	render() {
		console.log(this.state);
		return (
			<div>
				<Stepper activeStep={this.state.activeStep} orientation={'vertical'}>
					{steps.map((label, index) => (
						<Step key={label}>
							<StepLabel>{label}</StepLabel>
							<StepContent>
								{index === 0 && <PersonDataForm submit={data => {}} />}
								{/*{index === 3 &&*/}
								{/*renderDocStep(*/}
								{/*this.state.docList,*/}
								{/*this.addNewDocFile,*/}
								{/*this.deleteDocFile,*/}
								{/*this.onChangeDocData,*/}
								{/*this.props.dictionaries,*/}
								{/*)}*/}
								<div style={composeStyles(Styles.flexRow, Styles.flexRowVerCenter, makeVerticalSpace('large'))}>
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
										<div>
											<Button variant="contained" color="primary" onClick={this.handleNext}>
												{'Дальше'}
											</Button>
											<FormLabel style={makeHorizontalSpace('normal')}>
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

const mapStateToProps = (state: IRootState) => {
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
