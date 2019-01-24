import React from 'react';
import { TextField, FormControl, FormLabel } from '../platform';
import { ITextFieldChange } from '../models/';

const ContactDataForm = (props: ITextFieldChange) => {
	return (
		<FormControl>
			<FormLabel>Адрес регистрации</FormLabel>
			<TextField label={'Индекс'} onChange={props.onChangeTextField('regIndex')} />
			<TextField label={'Область'} onChange={props.onChangeTextField('regRegion')} />
			<TextField label={'Населенный пункт'} onChange={props.onChangeTextField('regLocality')} />
		</FormControl>
	);
};
export default ContactDataForm;
