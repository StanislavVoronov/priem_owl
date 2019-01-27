import { composeStyles, ISelectChanged, ITextFieldChanged, Styles } from '../common';
import React from 'react';
import { IDictionary } from '@mgutm-fcu/dictionary';

interface ApplicationsDataFormProps extends ISelectChanged, ITextFieldChanged {
	dictionaryFilials: IDictionary[];
	dictionaryUniversities: IDictionary[];
	dictionarySpecialCategories: IDictionary[];
	dictionaryDepartments: IDictionary[];
}
const ApplicationsDataForm = (props: ApplicationsDataFormProps) => {
	<div style={composeStyles(Styles.flexColumn)} />;
};
