import styles from './styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import * as React from 'react';

interface IProps {
	children?: string;
}
class LoadingText extends React.Component<IProps> {
	render() {
		return (
			<React.Fragment>
				<div style={styles.loading}>
					<CircularProgress />
					<h3>{this.props.children}</h3>
				</div>
			</React.Fragment>
		);
	}
}

export default LoadingText;
