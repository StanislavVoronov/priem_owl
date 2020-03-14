import * as React from 'react';
import classes from './styles.module.css';
import { IFormField, TextInput, Button } from '@black_bird/components';

interface IProps {
	onChange: (data: IFormField) => void;
	value: string;
}
const VerificationAccountFormView = (props: IProps) => {
	const { onChange, value } = props;

	return <TextInput name="verAccountCode" onChange={onChange} value={value} required label="Код подтверждения" />;
};

export default VerificationAccountFormView;
