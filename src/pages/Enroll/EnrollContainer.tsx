import * as React from 'react';
import { IEnrollRegisterStateForm } from '$common';
import EnrollView from './EnrollView';
import Dictionary from '@mgutm-fcu/dictionary';

import { connect, MapStateToProps } from 'react-redux';
import { FULL_DICTIONARY_LIST, NEW_PERSON_STEPS, SHORT_DICTIONARY_LIST } from './constants';
import { EnrollForm } from './models';
import { IRootState } from '$store';

class EnrollContainer extends React.Component {
	public componentDidCatch(error: any, info: any) {
		// You can also log the error to an error reporting service
	}
	handleStep = (step: EnrollForm) => () => {
		this.setState({
			activeStep: step,
		});
	};
	submit = (event: React.FormEvent<HTMLFormElement>) => {
		return void 0;
	};
	render() {
		const dictionaryList = SHORT_DICTIONARY_LIST;

		return (
			<Dictionary version={2} url={'/dev-bin/priem_api.fcgi'} list={dictionaryList}>
				<EnrollView steps={NEW_PERSON_STEPS} activeStep={0} />
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
