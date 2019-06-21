import styles from './styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import * as React from 'react';

interface IProps {
	children?: string;
}
class LoadingText extends React.Component<IProps> {
	render() {
		return (
			<div style={styles.loading}>
				<CircularProgress />
				<span style={styles.text}>{this.props.children}</span>
			</div>
		);
	}
}

export default LoadingText;
