import React from 'react';
import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import { ITransaction } from '@black_bird/utils';
import { IFormField } from '@black_bird/components';
import {
	IRootState,
	onChangeFilialAction,
	applicationsFormSelector,
	priemFilialsTransactionActions,
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
} from '$store';
import { IAdmDictionaryItem } from '$common';
import ApplicationsFormView from './ApplicationsFormView';
import { disabledAddButtonSelector } from './selectors';

interface IStateToProps {
	filialDictionary: ITransaction<IAdmDictionaryItem>;
	filial: IAdmDictionaryItem | null;
	institute: IAdmDictionaryItem | null;
	instituteDictionary: ITransaction<IAdmDictionaryItem>;

	educLevel: IAdmDictionaryItem | null;
	educLevelDictionary: ITransaction<IAdmDictionaryItem>;

	direction: IAdmDictionaryItem | null;
	directionDictionary: ITransaction<IAdmDictionaryItem>;

	profiles: IAdmDictionaryItem[];
	profileDictionary: ITransaction<IAdmDictionaryItem>;

	educForms: IAdmDictionaryItem[];
	educFormDictionary: ITransaction<IAdmDictionaryItem>;

	payForms: IAdmDictionaryItem[];
	payFormDictionary: ITransaction<IAdmDictionaryItem>;
	applications: IAdmGroup[];
	disabledAddButton: boolean;
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

const mapStateToProps: MapStateToProps<IStateToProps, {}, IRootState> = state => {
	const filialDictionary = priemFilialsTransactionSelector(state);
	const instituteDictionary = priemInstitutesTransactionSelector(state);
	const educLevelDictionary = priemEducLevelsTransactionSelector(state);
	const directionDictionary = priemDirectionsTransactionSelector(state);
	const profileDictionary = priemProfilesTransactionSelector(state);
	const educFormDictionary = priemEducFormsTransactionSelector(state);
	const payFormDictionary = priemPayFormsTransactionSelector(state);

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
	} = applicationsFormSelector(state);

	console.log("disabled", disabledAddButton);

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
	};
};

const mapDispatchToProps: MapDispatchToProps<IDispatchToProps, {}> = {
	fetchPriemFilials: priemFilialsTransactionActions.trigger,
	onChangeFilial: onChangeFilialAction,
	onChangeInst: onChangeInstAction,
	onChangeEducLevel: onChangeEducLevelAction,
	onChangeDirection: onChangeDirectionAction,
	onChangeProfiles: onChangeProfilesAction,
	onChangeEducForms: onChangeEducFormsAction,
	onChangePayForms: onChangePayFormsAction,
	addPriemApplication: newPriemAppAddedAction,
	submitApplicationsForm: submitApplicationFormAction,
	onDeleteApplication: applicationDeletedAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactsFormContainer);
