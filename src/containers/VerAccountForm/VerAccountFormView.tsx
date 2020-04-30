import * as React from 'react';
import { IFormField, TextInput, Button } from '@black_bird/components';

interface IProps {
	onChange: (data: IFormField) => void;
	value: string;
	email: string;
}
const VerificationAccountFormView = (props: IProps) => {
	const { onChange, value, email } = props;

	return (
		<TextInput
			name="verAccountCode"
			onChange={onChange}
			helperText={`Код подтверждения отправлен на ${email}`}
			value={value}
			required
			placeholder={'Введите код подтверждения, направленый на электронную почту'}
			label="Код подтверждения"
		/>
	);
};

export default VerificationAccountFormView;
