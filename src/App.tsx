import { Auth } from '@mgutm-fcu/auth';
import { Dictionary } from '@mgutm-fcu/dictionary';
import { connect } from 'react-redux';

import * as React from 'react';

import { Stepper, StepContent, StepLabel, Step, Typography, Button } from './platform/';
import { PersonDataForm } from './components/';
import { IState } from './models';
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
}
export class App extends React.PureComponent<never, IAppState> {
	constructor(props: never) {
		super(props);
		this.state = {
			activeStep: 0,
		};
	}
	public handleNext = () => {
		this.setState(state => ({ activeStep: state.activeStep + 1 }));
	};
	public handleBack = () => {
		this.setState(state => ({ activeStep: state.activeStep - 1 }));
	};
	public render() {
		return (
			<Auth
				auth={{ url: '/dev-bin/priem_login' }}
				title="Приемная кампания"
				user={{ url: '/dev-bin/priem_api.fcgi', api: 'user' }}>
				<Dictionary
					url={'/dev-bin/priem_dictionary.fcgi?dict=raw'}
					list={[{ name: 'DIRECTORY_FILIAL', columns: ['ID', 'NAME'] }]}>
					<div>
						<Stepper activeStep={this.state.activeStep} orientation="vertical">
							<StepItem label={'Персональные данные'} nextAction={this.handleNext} backAction={this.handleBack}>
								<PersonDataForm />
							</StepItem>
						</Stepper>
					</div>
				</Dictionary>
			</Auth>
		);
	}
}

const mapStateToProps = (_: IState) => {
	return {};
};

const mapDispatchToProps = (_: Dispatch) => {
	return {};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(App);
