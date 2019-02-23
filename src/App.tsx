import { IDictionary } from '@mgutm-fcu/dictionary';
import { connect, Provider } from 'react-redux';

import * as React from 'react';

import { Stepper, StepContent, StepLabel, Step, Typography, Button, FormLabel, DocDataForm } from './platform/';
import { RegisterDataForm } from './containers/Enroll';
import {
	IRootState,
	makeVerticalSpace,
	Styles,
	composeStyles,
	IPersonDataState,
	IContactDataState,
	IEducationDataState,
	IDocDataForm,
	IApplicationDataForm,
} from './common';
import { Dispatch } from 'redux';
import { IPersonData } from './containers/Enroll/models';
import Network from './modules/Network';
interface IAppState {
	activeStep: number;
	personData: IPersonDataState;
	contactData: IContactDataState;
	educationData: IEducationDataState;
	docList: IDocDataForm[];
	applicationData: IApplicationDataForm;
}

const steps = ['Регистрация', 'Персональные данные', 'Контактные данные', 'Образование', 'Документы', 'Заявления'];

export const AppContext = React.createContext<Record<string, any>>([]);
interface IStateToProps {
	dictionaries: Record<string, IDictionary>;
}
type IProps = IStateToProps;
export class App extends React.PureComponent<IProps, IAppState> {
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
	submitPersonData = (data: IPersonData) => {};
	render() {
		return (
			<React.Fragment>
				<AppContext.Provider value={this.props.dictionaries}>
					<Stepper activeStep={this.state.activeStep} orientation={'vertical'}>
						{steps.map((label, index) => (
							<Step key={label}>
								<StepLabel>{label}</StepLabel>
								<StepContent>
									{index === 0 && <RegisterDataForm submit={this.submitPersonData} />}
									{/*{index === 3 &&*/}
									{/*renderDocStep(*/}
									{/*this.state.docList,*/}
									{/*this.addNewDocFile,*/}
									{/*this.deleteDocFile,*/}
									{/*this.onChangeDocData,*/}
									{/*this.props.dictionaries,*/}
									{/*)}*/}
								</StepContent>
							</Step>
						))}
					</Stepper>
				</AppContext.Provider>
			</React.Fragment>
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
