import React from 'react';
import { TextInput, FormControl, FormLabel } from '../platform';
import { ITextFieldChanged } from '../common/';

const ContactDataForm = (props: ITextFieldChanged) => {
	return (
		<FormControl>
			<FormLabel>Адрес регистрации</FormLabel>
			<TextInput label={'Индекс'} onBlur={props.onChangeTextField('regIndex')} />
			<TextInput label={'Область'} onBlur={props.onChangeTextField('regRegion')} />
			<TextInput label={'Населенный пункт'} onBlur={props.onChangeTextField('regLocality')} />
		</FormControl>
	);
};
export default ContactDataForm;
