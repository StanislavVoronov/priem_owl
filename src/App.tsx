import { Auth } from '@mgutm-fcu/auth';
import { Dictionary, IDictionary } from '@mgutm-fcu/dictionary';
import { connect } from 'react-redux';

import * as React from 'react';

import { Stepper, StepContent, StepLabel, Step, Typography, Button } from './platform/';
import { PersonDataForm } from './components/';
import { IState } from './models';
import { Dispatch } from 'redux';
import { DictionaryNameList } from './enums';
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
interface IDictionaryPersonDocTypeFilter {
	type: number;
}
export class App extends React.PureComponent<any, IAppState> {
	constructor(props: never) {
		super(props);
		this.state = {
			activeStep: 0,
			gender: null,
		};
	}
	public handleNext = () => {
		this.setState(state => ({ activeStep: state.activeStep + 1 }));
	};
	public handleBack = () => {
		this.setState(state => ({ activeStep: state.activeStep - 1 }));
	};
	onChangeTextField = (name: string) => (event: any, genderData?: { name: string; sex: string }) => {
		console.log(genderData);
		this.setState({ ...this.state, [name]: event.target.value });
	};
	onChangeGender = (index: number) => {
		this.setState({ gender: index });
	};
	public render() {
		console.log(this.state);
		const steps = ['Персональные данные', 'Контактные данные', 'Документы', 'Образование', 'Заявления'];
		return (
			<Auth
				auth={{ url: '/dev-bin/priem_login' }}
				title="Приемная кампания"
				user={{ url: '/dev-bin/priem_api.fcgi', api: 'user' }}>
				<Dictionary
					url={'/dev-bin/priem_dictionary.fcgi?dict=raw'}
					list={[
						{ table: 'directory_filial', columns: ['id', 'name'] },
						{ table: DictionaryNameList.Goverments, columns: ['id', 'name'] },
						{
							name: DictionaryNameList.PersonDocTypes,
							table: 'directory_doc_subtypes',
							columns: ['id', 'name', 'type'],
							filter: (item: IDictionaryPersonDocTypeFilter) => item.type === 1,
						},
						{
							name: DictionaryNameList.FirstNames,
							table: 'directory_names',
							columns: ['id', 'name', 'type', 'sex'],
							filter: (item: IDictionaryPersonDocTypeFilter) => item.type === 0,
						},
						{
							name: DictionaryNameList.MiddleNames,
							table: 'directory_names',
							columns: ['id', 'name', 'type', 'sex'],
							filter: (item: IDictionaryPersonDocTypeFilter) => item.type === 1,
						},
					]}>
					<div>
						<Stepper activeStep={this.state.activeStep} orientation={'vertical'}>
							{steps.map((label, index) => (
								<Step key={label}>
									<StepLabel>{label}</StepLabel>

									<StepContent>
										<PersonDataForm
											dictionaryFirstNames={
												this.props.directories[DictionaryNameList.FirstNames]
													? this.props.directories[DictionaryNameList.FirstNames].values
													: []
											}
											dictionaryGorverments={
												this.props.directories[DictionaryNameList.Goverments]
													? this.props.directories[DictionaryNameList.Goverments].values
													: []
											}
											dictionaryPersonDocTypes={
												this.props.directories[DictionaryNameList.PersonDocTypes]
													? this.props.directories[DictionaryNameList.PersonDocTypes].values
													: []
											}
											onChangeTextField={this.onChangeTextField}
											onChangeGender={this.onChangeGender}
										/>
									</StepContent>
								</Step>
							))}
						</Stepper>
					</div>
				</Dictionary>
			</Auth>
		);
	}
}

const mapStateToProps = (state: IState) => {
	return {
		directories: state.dictionaries,
	};
};

const mapDispatchToProps = (_: Dispatch) => {
	return {};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(App);
