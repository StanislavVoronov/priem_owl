import TextInput from '../../components/Inputs/TextInput';
import React, { ChangeEvent } from 'react';
import Button from '../../components/Buttons/Button';
import { Formik } from 'formik';

interface IProps {
	verificationCode: string;
	submit: () => void;
	onChangeVerificationCode: (event: any) => void;
}
class AccountVerificationView extends React.Component<IProps> {
	render() {
		return (
			<Formik onSubmit={this.props.submit} initialValues={{ verificationAccountCode: '' }}>
				{() => (
					<>
						<TextInput
							name="verificationAccountCode"
							required
							label="Код подтверждения"
							helperText={'Код подтверждения, отправленный на электронную почту'}
						/>
						<div style={{ marginTop: 24 }}>
							<Button onClick={this.props.submit}>Подтвердить</Button>
						</div>
					</>
				)}
			</Formik>
		);
	}
}

export default AccountVerificationView;
