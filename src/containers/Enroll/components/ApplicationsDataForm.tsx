import { EDictionaryNameList } from '$common';
import React from 'react';
import { IDictionary } from '@mgutm-fcu/dictionary';
import { DropdownSelect } from '$components';

interface IApplicationsDataFormProps {
	dictionaries: IDictionary[];
}
class ApplicationsDataForm extends React.Component<IApplicationsDataFormProps> {
	onChange = () => {
		return void 0;
	};
	render() {
		return <div />;
	}
}

export default ApplicationsDataForm;
