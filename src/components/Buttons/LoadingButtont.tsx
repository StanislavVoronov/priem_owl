import * as React from 'react';
import { Button } from '$components';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green } from '@material-ui/core/colors';
import withStyles from '@material-ui/core/styles/withStyles';

interface IProps {
	margin: number;
	loading: boolean;
	disabled: boolean;
	onClick: () => void;
	classes: {
		buttonWrapper: string;
		container: string;
		buttonProgress: string;
	};
	children: string;
}
const styles = {
	container: { display: 'flex', justifyContent: 'center' },
	buttonWrapper: {
		position: 'relative' as any,
	},
	buttonProgress: {
		color: green[500],
		position: 'absolute' as any,
		top: '50%',
		left: '50%',
		marginTop: -12,
		marginLeft: -12,
	},
};
class LoadingButton extends React.Component<IProps> {
	static defaultProps = {
		margin: 20,
		disabled: false,
		loading: false,
		classes: { buttonWrapper: '', buttonProgress: '', container: '' },
	};
	render() {
		const { loading, onClick, classes, children } = this.props;

		return (
			<div className={classes.container} style={{ margin: this.props.margin }}>
				<div className={classes.buttonWrapper}>
					<Button variant="contained" color="primary" disabled={loading || this.props.disabled} onClick={onClick}>
						{children}
					</Button>
					{loading && <CircularProgress size={24} className={classes.buttonProgress} />}
				</div>
			</div>
		);
	}
}

export default withStyles(styles)(LoadingButton);
