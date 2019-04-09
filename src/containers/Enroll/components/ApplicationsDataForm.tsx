import { composeStyles, EDictionaryNameList } from '../../../common';
import React from 'react';
import { IDictionary } from '@mgutm-fcu/dictionary';
import DropdownSelect from '../../../platform/DropdownSelect';

interface ApplicationsDataFormProps {
	dictionaries: IDictionary[];
}
export const ApplicationsDataForm = (props: ApplicationsDataFormProps) => {
	return (
		<div>
			<DropdownSelect
				onChangeSelect={() => void 0}
				defaultValue={{ id: 0, name: 'Нет преимуществ' }}
				title={'Особая категория поступления'}
				options={props.dictionaries[EDictionaryNameList.PriemSpecialCategories].values}
			/>
		</div>
	);
};
