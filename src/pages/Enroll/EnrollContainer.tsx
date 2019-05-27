import * as React from 'react';
import EnrollView from './EnrollView';
import Dictionary, { DictionaryState, IDictionary } from '@mgutm-fcu/dictionary';

import { connect, MapStateToProps } from 'react-redux';
import { FULL_DICTIONARY_LIST, NEW_PERSON_STEPS, SHORT_DICTIONARY_LIST } from './constants';

import { IRootState, fromTransaction, dictionaryStateSelector } from '$store';

interface IState {
	activeStep: number;
}

interface IStateToProps {
	dictionaries: DictionaryState;
	personId: number;
}
type IProps = IStateToProps;

class EnrollContainer extends React.Component<IProps, IState> {
	state = {
		activeStep: 0,
	};
	public componentDidCatch(error: any, info: any) {
		// You can also log the error to an error reporting service
	}
	handleStep = (step: number) => () => {
		this.setState({
			activeStep: step,
		});
	};
	handleNext = () => {
		this.setState({ activeStep: this.state.activeStep + 1 });
	};

	submit = (event: React.FormEvent<HTMLFormElement>) => {
		return void 0;
	};
	render() {
		const dictionaryList = this.props.personId ? FULL_DICTIONARY_LIST : SHORT_DICTIONARY_LIST;
		const loading =
			Object.keys(this.props.dictionaries).length === 0 ||
			Object.values(this.props.dictionaries).find((item: IDictionary) => item.fetching) !== undefined;

		return (
			<Dictionary version={2} url={'/dev-bin/priem_api.fcgi'} list={dictionaryList}>
				<EnrollView
					steps={NEW_PERSON_STEPS}
					loading={loading}
					handleNext={this.handleNext}
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
