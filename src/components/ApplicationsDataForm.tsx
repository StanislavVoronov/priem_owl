import { composeStyles, EDictionaryNameList, ISelectChanged, ITextFieldChanged, Styles } from '../common';
import React from 'react';
import { IDictionary } from '@mgutm-fcu/dictionary';
import DropdownSelect from '../platform/DropdownSelect';

interface ApplicationsDataFormProps extends ISelectChanged {
	dictionaries: IDictionary[];
}
export const ApplicationsDataForm = (props: ApplicationsDataFormProps) => {
	return (
		<div style={composeStyles(Styles.flexColumn)}>
			<DropdownSelect
				onChangeSelect={props.onChangeSelect('specialCategory')}
				defaultValue={{ id: 0, name: 'Нет преимуществ' }}
				title={'Особая категория поступления'}
				options={props.dictionaries[EDictionaryNameList.PriemSpecialCategories].values}
			/>
		</div>
	);
};
