import React from 'react';
import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import { ITransaction } from '@black_bird/utils';
import { IFormField } from '@black_bird/components';
import {
	IRootState,
	onChangeFilialAction,
	applicationFormSelector,
	priemFilialsTransactionActions,
	submitApplicationFormAction, priemFilialsTransactionSelector,
} from '$store';
import { IAdmDictionaryItem } from '$common';
import ApplicationsFormView from './ApplicationsFormView';

interface IStateToProps {
	filials: ITransaction<IAdmDictionaryItem>;
	filial: IAdmDictionaryItem | null;
	// instituteDictionary: ITransaction<IDictionary>;
	// educLevelDictionary: ITransaction<IDictionary>;
	// directionDictionary: ITransaction<IDictionary>;
	// profileDictionary: ITransaction<IDictionary>;
	// payFormDictionary: ITransaction<IDictionary>;
	// educFormDictionary: ITransaction<IDictionary>;
	// disabledAddButton: boolean;
}

interface IDispatchToProps {
	fetchPriemFilials: () => void;
	onChangeFilial: (item: IFormField<IAdmDictionaryItem>) => void;
	submit: () => void;
	// onChangeFilial: (item: IFormField<ISelectItem>) => void;
	// onChangeInstitute: (item: ISelectItem) => void;
	// onChangeEducationLevel: (item: ISelectItem) => void;
	// onChangeDirection: (item: ISelectItem) => void;
	// onChangeProfile: (item: ISelectItem) => void;
	// onChangeEducationForm: (item: ISelectItem) => void;
	// onChangePayForm: (item: ISelectItem[]) => void;
	// addPriemApplication: () => void;
	// onDeleteApplication: (index: number) => void;
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
	const filials = priemFilialsTransactionSelector(state);
	const { filial } = applicationFormSelector(state);

	return { filials, filial };
};

const mapDispatchToProps: MapDispatchToProps<IDispatchToProps, {}> = {
	fetchPriemFilials: priemFilialsTransactionActions.trigger,
	onChangeFilial: onChangeFilialAction,
	submit: submitApplicationFormAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactsFormContainer);
