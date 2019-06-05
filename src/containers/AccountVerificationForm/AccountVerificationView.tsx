import TextInput from '../../components/Inputs/TextInput';
import React, { ChangeEvent } from 'react';
import Button from '../../components/Buttons/Button';

interface IProps {
	verificationCode: string;
	submit: () => void;
	onChangeVerificationCode: (event: any) => void;
}
class AccountVerificationView extends React.Component<IProps> {
	render() {
		return (
			<form className="flexColumn" noValidate={true}>
				<TextInput
					name="verificationAccountCode"
					required
					label="Код подтверждения"
					helperText={'Код подтверждения, отправленный на электронную почту'}
				/>
				<div style={{ marginTop: 24 }}>
					<Button onClick={this.props.submit}>Подтвердить</Button>
				</div>
			</form>
		);
	}
}

export default AccountVerificationView;
