import * as React from 'react';
import EnrollView from './EnrollView';
import { connect, MapStateToProps } from 'react-redux';
import { FULL_DICTIONARY_LIST, NEW_PERSON_STEPS, SHORT_DICTIONARY_LIST } from './constants';

import { IRootState, fromTransaction, dictionaryStateSelector, enrollSelector } from '$store';
import { createNewPersonFolder } from '$operations';
import { IDictionaryConfig } from '@black_bird/dictionaries';
import { initAction, handleNextStep } from '$store';

interface IState {
	dictionaries: IDictionaryConfig[];
}

interface IStateToProps {
	dictionaries: any;
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
		const dictionaries = FULL_DICTIONARY_LIST;
		this.setState({ dictionaries });
	};
	createNewPersonFolder = () => {
		this.props.createNewPersonFolder().then(this.onCompleteRegistration);
	};
	render() {
		const { step, passedStep } = this.props;

		const loading =
			Object.keys(this.props.dictionaries).length === 0 ||
			Object.values(this.props.dictionaries).find((item: any) => item.fetching) !== undefined;

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
	const dictionaries = dictionaryStateSelector(state);
	const enroll = enrollSelector(state);

	// const { result } = fromTransaction.createLogin(state);

	return { personId: 0, dictionaries, step: enroll.step, passedStep: enroll.passedStep };
};

const mapDispatchToProps = {
	createNewPersonFolder,
	init: initAction,
	handleNextStep,
};

export default connect(mapStateToProps, mapDispatchToProps)(EnrollContainer);
