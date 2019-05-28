import AccountVerificationView from './AccountVerificationView';
import * as React from 'react';
import { ChangeEvent } from 'react';
import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import { enrollAccountVerificationFormSelector, IRootState, onChangeVerificationCode } from '$store';
import { IAccountVerificationForm } from '$common';

interface IDispatchToProps {
	onChangeVerificationCode: (event: ChangeEvent<HTMLInputElement>) => void;
}
interface IOwnProps {
	submit: () => void;
}
type IProps = IAccountVerificationForm & IDispatchToProps & IOwnProps;
class AccountVerificationContainer extends React.Component<IProps> {
	render() {
		return <AccountVerificationView {...this.props} />;
	}
}
const mapStateToProps: MapStateToProps<IAccountVerificationForm, {}, IRootState> = state => {
	const { data } = enrollAccountVerificationFormSelector(state);

	return { ...data };
};
const mapDispatchToProps: MapDispatchToProps<IDispatchToProps, {}> = {
	onChangeVerificationCode,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(AccountVerificationContainer);
