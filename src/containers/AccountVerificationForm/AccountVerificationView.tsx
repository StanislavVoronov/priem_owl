import TextInput from '../../components/Inputs/TextInput';
import React, { ChangeEvent } from 'react';
import Button from '../../components/Buttons/Button';

interface IProps {
	verificationCode: string;
	submit: () => void;
	onChangeVerificationCode: (event: ChangeEvent<HTMLInputElement>) => void;
}
class AccountVerificationView extends React.Component<IProps> {
	render() {
		return (
			<form className="flexColumn" noValidate={true}>
				<TextInput
					required
					label="Код подтверждения"
					defaultValue={this.props.verificationCode}
					type="date"
					helperText={'Код подтверждения, отправленный на электронную почту'}
					onBlur={this.props.onChangeVerificationCode}
				/>
				<div style={{ marginTop: 24 }}>
					<Button onClick={this.props.submit}>Подтвердить</Button>
				</div>
			</form>
		);
	}
}

export default AccountVerificationView;
