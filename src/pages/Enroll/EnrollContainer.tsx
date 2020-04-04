import * as React from 'react';
import EnrollView from './EnrollView';
import { connect, MapStateToProps } from 'react-redux';
import { NEW_PERSON_STEPS } from '../../dictionaries';

import { IRootState, enrollSelector } from '$store';
import { IDictionaryConfig } from '@black_bird/dictionaries';
import { initAction, navigateToStep, getFirstNamesDictionary } from '$store';
import { ITransaction, noop } from '@black_bird/utils';

interface IState {
	dictionaries: IDictionaryConfig[];
}

interface IStateToProps {
	firstNameDictionary: ITransaction<any>;
	step: number;
	passedStep: number;
}

interface IDispatchToProps {
	init: () => void;
	createNewPersonFolder: () => Promise<void>;
	handleStep: (step: number) => void;
}
type IProps = IStateToProps & IDispatchToProps;

class EnrollContainer extends React.Component<IProps, IState> {
	public componentDidCatch(error: any, info: any) {
		// You can also log the error to an error reporting service
	}

	componentDidMount() {
		this.props.init();
	}

	handleStep = (step: number) => {
		this.props.handleStep(step);
	};

	render() {
		const { step, passedStep, firstNameDictionary } = this.props;

		const loading = firstNameDictionary.isFetching;

		return (
			<EnrollView
				steps={NEW_PERSON_STEPS}
				loading={loading}
				handleStep={this.handleStep}
				activeStep={step}
				passedStep={passedStep}
			/>
		);
	}
}

const mapStateToProps: MapStateToProps<IStateToProps, {}, IRootState> = (state) => {
	const firstNameDictionary = getFirstNamesDictionary(state);

	const enroll = enrollSelector(state);

	return { firstNameDictionary, step: enroll.step, passedStep: enroll.passedStep };
};

const mapDispatchToProps = {
	createNewPersonFolder: noop,
	init: initAction,
	handleStep: navigateToStep,
};

export default connect(mapStateToProps, mapDispatchToProps)(EnrollContainer);
