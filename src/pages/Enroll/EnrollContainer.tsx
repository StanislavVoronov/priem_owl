import * as React from 'react';
import { IEnrollRegisterStateForm } from '$common';
import EnrollView from './EnrollView';
import Dictionary from '@mgutm-fcu/dictionary';

import { connect, MapStateToProps } from 'react-redux';
import { FULL_DICTIONARY_LIST, NEW_PERSON_STEPS, SHORT_DICTIONARY_LIST } from './constants';
import { EnrollForm } from './models';
import { IRootState } from '$store';

interface IState {
	activeStep: number;
}
class EnrollContainer extends React.Component<never, IState> {
	state = {
		activeStep: 1,
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
		const dictionaryList = SHORT_DICTIONARY_LIST;

		return (
			<Dictionary version={2} url={'/dev-bin/priem_api.fcgi'} list={dictionaryList}>
				<EnrollView steps={NEW_PERSON_STEPS} handleNext={this.handleNext} activeStep={this.state.activeStep} />
			</Dictionary>
		);
	}
}

const mapStateToProps: MapStateToProps<{}, {}, IRootState> = state => {
	return {};
};

export default connect(
	mapStateToProps,
	() => ({}),
)(EnrollContainer);
