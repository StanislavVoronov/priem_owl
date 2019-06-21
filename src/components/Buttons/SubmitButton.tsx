import * as React from 'react';
import MaterialButton from '@material-ui/core/Button';
import { noop } from '$common';

interface IProps {
	children: string;
	fullWidth: boolean;
	className?: string;
	primary: boolean;
	disabled: boolean;
}
class SubmitButton extends React.Component<IProps> {
	static defaultProps = {
		primary: true,
		fullWidth: false,
		disabled: false,
	};
	render() {
		return (
			<MaterialButton
				type="submit"
				fullWidth={this.props.fullWidth}
				disabled={this.props.disabled}
				variant="contained"
				className={this.props.className}
				color={this.props.primary ? 'primary' : 'default'}>
				{this.props.children}
			</MaterialButton>
		);
	}
}

export default SubmitButton;
