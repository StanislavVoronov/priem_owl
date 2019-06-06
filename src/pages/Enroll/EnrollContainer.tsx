import * as React from 'react';
import EnrollView from './EnrollView';
import Dictionary, { DictionaryState, IDictionary, IDictionaryConfig } from '@mgutm-fcu/dictionary';

import { connect, MapStateToProps } from 'react-redux';
import { FULL_DICTIONARY_LIST, NEW_PERSON_STEPS, SHORT_DICTIONARY_LIST } from './constants';

import { IRootState, fromTransaction, dictionaryStateSelector } from '$store';

interface IState {
	activeStep: number;
	dictionaries: IDictionaryConfig[];
}

interface IStateToProps {
	dictionaries: DictionaryState;
	personId: number;
}
type IProps = IStateToProps;

class EnrollContainer extends React.Component<IProps, IState> {
	state: IState = {
		activeStep: 0,
		dictionaries: SHORT_DICTIONARY_LIST,
	};
	public componentDidCatch(error: any, info: any) {
		// You can also log the error to an error reporting service
	}
	handleStep = (step: number) => () => {
		this.setState({
			activeStep: step,
		});
	};
	onCompleteRegForm = () => {
		this.setState({ dictionaries: FULL_DICTIONARY_LIST, activeStep: this.state.activeStep + 1 });
	};
	handleNext = () => {
		this.setState({ activeStep: this.state.activeStep + 1 });
	};

	submit = (event: React.FormEvent<HTMLFormElement>) => {
		return void 0;
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
					onCompleteRegForm={this.onCompleteRegForm}
					activeStep={this.state.activeStep}
				/>
			</Dictionary>
		);
	}
}

const mapStateToProps: MapStateToProps<IStateToProps, {}, IRootState> = state => {
	const dictionaries = dictionaryStateSelector(state);
	const { result } = fromTransaction.createLoginSelector(state);

	return { personId: result, dictionaries };
};

export default connect(mapStateToProps)(EnrollContainer);
