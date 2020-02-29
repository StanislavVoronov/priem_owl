import * as React from 'react';
import EnrollView from './EnrollView';
import { connect, MapStateToProps } from 'react-redux';
import { FULL_DICTIONARY_LIST, NEW_PERSON_STEPS, SHORT_DICTIONARY_LIST } from '../../dictionaries';

import { IRootState, fromTransaction, enrollSelector, getMiddleNamesDictionary } from '$store';
import { createNewPersonFolder } from '$operations';
import { IDictionaryConfig } from '@black_bird/dictionaries';
import { initAction, handleNextStep } from '$store';
import { getFirstNamesDictionary } from '../../store/selectors';
import { ITransaction } from '@black_bird/utils';

interface IState {
	dictionaries: IDictionaryConfig[];
}

interface IStateToProps {
	firstNameDictionary: ITransaction<any>;
	personId: number;
	step: number;
	passedStep: number;
}

interface IDispatchToProps {
	init: () => void;
	createNewPersonFolder: () => Promise<void>;
	handleNextStep: () => void;
}
type IProps = IStateToProps & IDispatchToProps;

class EnrollContainer extends React.Component<IProps, IState> {
	state: IState = {
		dictionaries: SHORT_DICTIONARY_LIST,
	};
	public componentDidCatch(error: any, info: any) {
		// You can also log the error to an error reporting service
	}

	componentDidMount() {
		this.props.init();
	}

	handleStep = (step: number) => () => {
		this.props.handleNextStep();
	};
	onCompleteRegistration = () => {
		// this.setState({ passedStep: -1, activeStep: this.state.activeStep + 1 });
	};
	handleNext = () => {
		this.props.handleNextStep();
	};
	createNewPersonFolder = () => {
		this.props.createNewPersonFolder().then(this.onCompleteRegistration);
	};
	render() {
		const { step, passedStep, firstNameDictionary } = this.props;

		const loading = firstNameDictionary.isFetching;

		return (
			<EnrollView
				steps={NEW_PERSON_STEPS}
				loading={loading}
				handleNext={this.handleNext}
				activeStep={step}
				handleStep={this.handleStep}
				passedStep={passedStep}
				createNewPersonFolder={this.createNewPersonFolder}
			/>
		);
	}
}

const mapStateToProps: MapStateToProps<IStateToProps, {}, IRootState> = state => {
	const firstNameDictionary = getFirstNamesDictionary(state);

	const enroll = enrollSelector(state);

	// const { result } = fromTransaction.createLogin(state);

	return { personId: 0, firstNameDictionary, step: enroll.step, passedStep: enroll.passedStep };
};

const mapDispatchToProps = {
	createNewPersonFolder,
	init: initAction,
	handleNextStep,
};

export default connect(mapStateToProps, mapDispatchToProps)(EnrollContainer);
