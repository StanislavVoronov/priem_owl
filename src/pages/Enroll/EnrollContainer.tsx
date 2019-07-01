import * as React from 'react';
import EnrollView from './EnrollView';
import Dictionary, { DictionaryState, IDictionary, IDictionaryConfig } from '@mgutm-fcu/dictionary';

import { connect, MapStateToProps } from 'react-redux';
import { FULL_DICTIONARY_LIST, NEW_PERSON_STEPS, SHORT_DICTIONARY_LIST } from './constants';

import { IRootState, fromTransaction, dictionaryStateSelector } from '$store';
import { fetchPriemFilials } from '$operations';

interface IState {
	activeStep: number;
	passedStep: number;
	dictionaries: IDictionaryConfig[];
}

interface IStateToProps {
	dictionaries: DictionaryState;
	personId: number;
}

interface IDispatchToProps {
	fetchPriemFilials: () => void;
}
type IProps = IStateToProps & IDispatchToProps;

class EnrollContainer extends React.Component<IProps, IState> {
	state: IState = {
		activeStep: 4,
		passedStep: 0,
		dictionaries: SHORT_DICTIONARY_LIST,
	};
	componentDidMount(): void {
		this.props.fetchPriemFilials();
	}

	public componentDidCatch(error: any, info: any) {
		// You can also log the error to an error reporting service
	}
	handleStep = (step: number) => () => {
		this.setState({
			activeStep: step,
		});
	};
	onCompleteCheckPersonForm = () => {
		this.setState({ dictionaries: FULL_DICTIONARY_LIST, activeStep: this.state.activeStep + 1 });
	};
	onCompleteRegistration = () => {
		this.setState({ passedStep: -1, activeStep: this.state.activeStep + 1 });
	};
	handleNext = () => {
		this.setState({ activeStep: this.state.activeStep + 1, passedStep: this.state.passedStep + 1 });
	};

	render() {
		const loading =
			Object.keys(this.props.dictionaries).length === 0 ||
			Object.values(this.props.dictionaries).find((item: IDictionary) => item.fetching) !== undefined;

		return (
			<Dictionary version={2} url={'/dev-bin/priem_api.fcgi'} list={this.state.dictionaries}>
				<EnrollView
					steps={NEW_PERSON_STEPS}
					loading={loading}
					handleNext={this.handleNext}
					onCompleteCheckPersonForm={this.onCompleteCheckPersonForm}
					onCompleteRegistration={this.onCompleteRegistration}
					activeStep={this.state.activeStep}
					handleStep={this.handleStep}
					passedStep={this.state.passedStep}
				/>
			</Dictionary>
		);
	}
}

const mapStateToProps: MapStateToProps<IStateToProps, {}, IRootState> = state => {
	const dictionaries = dictionaryStateSelector(state);
	const { result } = fromTransaction.createLogin(state);

	return { personId: result, dictionaries };
};

const mapDispatchToProps = {
	fetchPriemFilials,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(EnrollContainer);
