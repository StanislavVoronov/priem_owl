import * as React from 'react';
import { ChangeEvent } from 'react';
import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import { enrollAccountVerificationFormSelector, IRootState } from '$store';
import { EnrollVerificationFormSchema, IAccountVerificationForm, IServerError } from '$common';
import { updatePersonInformation } from '$operations';
import { PriemForm, TextInput } from '$components';

interface IMapStateToProps {
	data: IAccountVerificationForm;
	error: IServerError | null;
	loading: boolean;
}

interface IDispatchToProps {
	onSubmit: (event: ChangeEvent<HTMLInputElement>) => void;
}
interface IOwnProps {
	onComplete: () => void;
}
type IProps = IMapStateToProps & IDispatchToProps & IOwnProps;
class AccountVerificationContainer extends React.Component<IProps> {
	renderForm = () => {
		return (
			<>
				<TextInput
					name="verificationAccountCode"
					required
					label="Код подтверждения"
					helperText={'Код подтверждения, отправленный на электронную почту'}
				/>
			</>
		);
	};
	render() {
		return (
			<PriemForm
				loading={this.props.loading}
				loadingText="Формирование личного дела"
				renderForm={this.renderForm}
				error={this.props.error}
				schema={EnrollVerificationFormSchema}
				onSubmit={this.props.onSubmit}
				buttonText="Подтвердить"
				initialValues={this.props.data}
			/>
		);
	}
}
const mapStateToProps: MapStateToProps<IMapStateToProps, {}, IRootState> = state => {
	const data = enrollAccountVerificationFormSelector(state);

	return { data, loading: false, error: null };
};
const mapDispatchToProps: MapDispatchToProps<IDispatchToProps, IOwnProps> = (dispatch, ownProps) => {
	return {
		onSubmit: () => {
			dispatch<any>(updatePersonInformation())
				.then(ownProps.onComplete)
				.catch((error: any) => console.log('errorAccountVerification', error));
		},
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(AccountVerificationContainer);
