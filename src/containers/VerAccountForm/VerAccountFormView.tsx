import * as React from 'react';
import { ITransaction, prop, TransactionStatus } from '@black_bird/utils';
import { IFormField, Select, TextInput } from '@black_bird/components';
import { IClassifier, VerificationMethod } from '$common';

interface IProps {
	onChange: (data: IFormField) => void;
	values: { verAccountCode: string; verMethod: IClassifier<VerificationMethod> };
	email: string;
	mobPhone: string;
	onChangeVerMethod: (value: IFormField<IClassifier<VerificationMethod>>) => void;
	verMethod: IClassifier<VerificationMethod>;
	verMethodTrn: ITransaction<any>;
}

const VerificationAccountFormView = (props: IProps) => {
	const { onChange, values, mobPhone, verMethodTrn, email, onChangeVerMethod, verMethod } = props;

	const options = [
		{ code: VerificationMethod.Phone, value: mobPhone },
		{ code: VerificationMethod.Phone, value: email },
	];

	return (
		<>
			<Select
				onChange={onChangeVerMethod}
				value={verMethod}
				required
				name="verMethod"
				title={`Способ подтверждения личного дела - ${
					verMethod.code === VerificationMethod.Phone ? 'мобильный телефон' : 'элемтронная почта'
				}`}
				options={options}
				getOptionValue={prop('code') as (data: any) => string}
				getOptionLabel={prop('value')}
			/>

			{verMethod && (
				<TextInput
					name="verAccountCode"
					onChange={onChange}
					helperText={`Код подтверждения отправлен на ${
						verMethod.code === VerificationMethod.Phone ? 'мобильный телефон ' : 'элетронную почту '
					} ${verMethod.code === VerificationMethod.Phone ? mobPhone : email}`}
					value={values.verAccountCode}
					required
					disabled={verMethodTrn.status !== TransactionStatus.COMPLETED}
					placeholder={'Введите код подтверждения для завершения регистрации личного дела'}
					label="Код подтверждения"
				/>
			)}
		</>
	);
};

export default VerificationAccountFormView;
