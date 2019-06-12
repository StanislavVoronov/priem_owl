import * as React from 'react';
import MaterialButton from '@material-ui/core/Button';
import { noop } from '$common';

interface IProps {
	disabled: boolean;
	children: string;
	fullWidth: boolean;
	className?: string;
	onClick: () => void;
	primary: boolean;
	submit: boolean;
	wrapperClassName: any;
}
class Button extends React.Component<IProps> {
	static defaultProps = {
		disabled: false,
		onClick: noop,
		primary: true,
		fullWidth: false,
		submit: false,
		wrapperClassName: '',
	};
	render() {
		return (
			<div className={this.props.wrapperClassName}>
				<MaterialButton
					fullWidth={this.props.fullWidth}
					variant="contained"
					className={this.props.className}
					disabled={this.props.disabled}
					color={this.props.primary ? 'primary' : 'default'}
					onClick={this.props.onClick}>
					{this.props.children}
				</MaterialButton>
			</div>
		);
	}
}

export default Button;
