import { IDictionary } from '@mgutm-fcu/dictionary';
import { connect } from 'react-redux';

import * as React from 'react';

import { Stepper, StepContent, StepLabel, Step, Typography, Button } from './platform/';
import { PersonDataForm } from './components/';
import { IState, IDictionaryNames, ISelectItem, EDictionaryNameList } from './common';
import { Dispatch } from 'redux';
const StepItem = (props: {
	label: string;
	children: React.ReactChild;
	backTitle?: string;
	backAction?: () => void;
	nextTitle?: string;
	nextAction?: () => void;
}) => {
	return (
		<Step key={props.label}>
			<StepLabel>{props.label}</StepLabel>
			<StepContent>
				<Typography>{props.children}</Typography>
				<div>
					<div>
						{props.backTitle && (
							<Button disabled={typeof props.backAction === 'function' ? false : true} onClick={props.backAction}>
								{props.backTitle}
							</Button>
						)}
						{props.nextTitle && (
							<Button
								disabled={typeof props.nextAction === 'function' ? false : true}
								color="primary"
								onClick={props.nextAction}>
								{props.nextTitle}
							</Button>
						)}
					</div>
				</div>
			</StepContent>
		</Step>
	);
};
interface IAppState {
	activeStep: number;
	gender: number | null;
}
const renderPersonDataStep = (
	gender: number | null,
	directories: IDictionary[],
	onChangeGender: (event: any, gender: string) => void,
	onChangeSelect: (field: string) => (value: ISelectItem) => void,
	onChangeTextField: (field: string) => (value: string) => void,
	onChangeAutocompleteTextField: (field: string) => (value: string, data?: any) => void,
) => {
	const dictionaryMiddleNames = directories[EDictionaryNameList.MiddleNames]
		? directories[EDictionaryNameList.MiddleNames].values
		: [];
	return (
		<PersonDataForm
			onChangeSelect={onChangeSelect}
			dictionaryFirstNames={
				directories[EDictionaryNameList.FirstNames] ? directories[EDictionaryNameList.FirstNames].values : []
			}
			dictionaryMiddleNames={
				gender !== null
					? dictionaryMiddleNames.filter((item: IDictionaryNames) => item.sex === gender)
					: dictionaryMiddleNames
			}
			dictionaryGorverments={
				directories[EDictionaryNameList.Goverments] ? directories[EDictionaryNameList.Goverments].values : []
			}
			dictionaryPersonDocTypes={
				directories[EDictionaryNameList.PersonDocTypes] ? directories[EDictionaryNameList.PersonDocTypes].values : []
			}
			onChangeAutocompleteTextField={onChangeAutocompleteTextField}
			onChangeTextField={onChangeTextField}
			gender={gender}
			onChangeGender={onChangeGender}
		/>
	);
};

export class App extends React.PureComponent<{ dictionaries: IDictionary[] }, IAppState> {
	constructor(props: never) {
		super(props);
		this.state = {
			activeStep: 0,
			gender: null,
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
	onChangeAutocompleteTextField = (name: string) => (value: string, genderData?: IDictionaryNames) => {
		let gender = this.state.gender;
		if (genderData && genderData.name) {
			gender = genderData.sex;
		}
		this.setState({ ...this.state, [name]: value, gender });
	};
	onChangeTextField = (name: string) => (value: string) => {
		this.setState({ ...this.state, [name]: value });
	};
	onChangeGender = (event: any, gender: string) => {
		this.setState({ gender: parseInt(gender) });
	};
	onChangeSelect = (name: string) => (item: ISelectItem) => {
		this.setState({ ...this.state, [name]: item.id });
	};
	public render() {
		console.log(this.state);
		const steps = ['Персональные данные', 'Контактные данные', 'Документы', 'Образование', 'Заявления'];

		return (
			<div>
				<Stepper activeStep={this.state.activeStep} orientation={'vertical'}>
					{steps.map((label, index) => (
						<Step key={label}>
							<StepLabel>{label}</StepLabel>
							<StepContent>
								{index === 0 &&
									renderPersonDataStep(
										this.state.gender,
										this.props.dictionaries,
										this.onChangeGender,
										this.onChangeSelect,
										this.onChangeTextField,
										this.onChangeAutocompleteTextField,
									)}
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
