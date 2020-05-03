import React from 'react';
import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import { ITransaction } from '@black_bird/utils';
import { IFormField } from '@black_bird/components';
import {
	IRootState,
	onChangeFilialAction,
	applicationsFormSelector,
	priemFilialsTrnActions,
	priemFilialsTransactionSelector,
	priemInstitutesTransactionSelector,
	onChangeInstAction,
	onChangeEducLevelAction,
	priemEducLevelsTransactionSelector,
	onChangeDirectionAction,
	priemDirectionsTransactionSelector,
	onChangeProfilesAction,
	priemProfilesTransactionSelector,
	priemEducFormsTransactionSelector,
	priemPayFormsTransactionSelector,
	onChangeEducFormsAction,
	onChangePayFormsAction,
	newPriemAppAddedAction,
	submitApplicationFormAction,
	applicationDeletedAction,
	IAdmGroup,
	IAdmTransactionList,
	onChangeAdmTypeAction,
	priemAdmTypesTrnSelector,
} from '$store';
import { IAdmDictionaryItem } from '$common';
import ApplicationsFormView from './ApplicationsFormView';
import { disabledAddButtonSelector } from './selectors';

interface IStateToProps {
	filialDictionary: IAdmTransactionList;
	filial: IAdmDictionaryItem | null;
	institute: IAdmDictionaryItem | null;
	instituteDictionary: IAdmTransactionList;

	educLevel: IAdmDictionaryItem | null;
	educLevelDictionary: IAdmTransactionList;

	direction: IAdmDictionaryItem | null;
	directionDictionary: IAdmTransactionList;

	profiles: IAdmDictionaryItem[];
	profileDictionary: IAdmTransactionList;

	educForms: IAdmDictionaryItem[];
	educFormDictionary: IAdmTransactionList;

	payForms: IAdmDictionaryItem[];
	payFormDictionary: IAdmTransactionList;
	applications: IAdmGroup[];
	disabledAddButton: boolean;
	admType: IAdmDictionaryItem;
	admTypesDictionary: ITransaction<IAdmDictionaryItem[]>;
}

interface IDispatchToProps {
	fetchPriemFilials: () => void;
	onChangeFilial: (item: IFormField<IAdmDictionaryItem>) => void;
	onChangeInst: (item: IFormField<IAdmDictionaryItem>) => void;
	onChangeEducLevel: (item: IFormField<IAdmDictionaryItem>) => void;
	onChangeDirection: (item: IFormField<IAdmDictionaryItem>) => void;
	onChangeProfiles: (item: IFormField<IAdmDictionaryItem[]>) => void;
	onChangeEducForms: (item: IFormField<IAdmDictionaryItem[]>) => void;
	onChangePayForms: (item: IFormField<IAdmDictionaryItem[]>) => void;
	addPriemApplication: () => void;
	submitApplicationsForm: () => void;
	onDeleteApplication: (index: number) => void;
	onChangeAdmType: (admType: IFormField<IAdmDictionaryItem>) => void;
}

type Props = IStateToProps & IDispatchToProps;

class ContactsFormContainer extends React.PureComponent<Props> {
	componentDidMount(): void {
		this.props.fetchPriemFilials();
	}

	render() {
		return <ApplicationsFormView {...this.props} />;
	}
}

const mapStateToProps: MapStateToProps<IStateToProps, {}, IRootState> = (state) => {
	const filialDictionary = priemFilialsTransactionSelector(state);
	const instituteDictionary = priemInstitutesTransactionSelector(state);
	const educLevelDictionary = priemEducLevelsTransactionSelector(state);
	const directionDictionary = priemDirectionsTransactionSelector(state);
	const profileDictionary = priemProfilesTransactionSelector(state);
	const educFormDictionary = priemEducFormsTransactionSelector(state);
	const payFormDictionary = priemPayFormsTransactionSelector(state);
	const admTypesDictionary = priemAdmTypesTrnSelector(state);
	const disabledAddButton = disabledAddButtonSelector(state);

	const {
		filial,
		institute,
		profiles,
		educLevel,
		direction,
		educForms,
		payForms,
		applications,
		admType,
	} = applicationsFormSelector(state);

	return {
		educFormDictionary,
		payFormDictionary,
		filialDictionary,
		profileDictionary,
		directionDictionary,
		profiles,
		educLevelDictionary,
		instituteDictionary,
		educLevel,
		institute,
		direction,
		filial,
		educForms,
		payForms,
		applications,
		disabledAddButton,
		admTypesDictionary,
		admType,
	};
};

const mapDispatchToProps: MapDispatchToProps<IDispatchToProps, {}> = {
	fetchPriemFilials: priemFilialsTrnActions.trigger,
	onChangeFilial: onChangeFilialAction,
	onChangeInst: onChangeInstAction,
	onChangeEducLevel: onChangeEducLevelAction,
	onChangeDirection: onChangeDirectionAction,
	onChangeProfiles: onChangeProfilesAction,
	onChangeAdmType: onChangeAdmTypeAction,
	onChangeEducForms: onChangeEducFormsAction,
	onChangePayForms: onChangePayFormsAction,
	addPriemApplication: newPriemAppAddedAction,
	submitApplicationsForm: submitApplicationFormAction,
	onDeleteApplication: applicationDeletedAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactsFormContainer);
