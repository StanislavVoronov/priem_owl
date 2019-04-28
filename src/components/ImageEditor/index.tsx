import React from 'react';
import AvatarEditor from 'react-avatar-editor';
import Slider from '@material-ui/lab/Slider';
import Fab from '@material-ui/core/Fab';
import RotateLeft from '@material-ui/icons/RotateLeft';
import Delete from '@material-ui/icons/Delete';
import classNames from 'classnames';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Visibility from '@material-ui/icons/Visibility';
import RotateRight from '@material-ui/icons/RotateRight';
import styles from './styles.module.css';
import { red } from '@material-ui/core/colors';

interface IProps {
	file: File;
	title: string;
	hidden: boolean;
	removeImage?: () => void;
}
interface IState {
	rotate: number;
	scale: number;
	width: number;
	height: number;
	hidden: boolean;
}

class ImageEditor extends React.PureComponent<IProps, IState> {
	public static defaultProps = {
		removeImage: () => void 0,
		hidden: false,
	};
	public state = {
		file: null,
		scale: 0.5,
		rotate: 0,
		hidden: this.props.hidden,
		width: window.innerWidth / 2.5,
		height: window.innerHeight / 2.5,
	};
	public setScale = (event: React.ChangeEvent<{}>, scale: number) => {
		this.setState(state => ({ ...state, scale: scale <= 0.5 ? state.scale : scale }));
	};
	public setRotateLeft = () => {
		this.setState(state => ({ ...state, rotate: state.rotate - 90 }));
	};
	public setRotateRight = () => {
		this.setState(state => ({ ...state, rotate: state.rotate + 90 }));
	};
	public removeImage = () => {
		this.props.removeImage!();
	};
	toggleImage = () => {
		this.setState({ hidden: !this.state.hidden });
	};

	public render() {
		return (
			<div className={styles.container}>
				<div style={{ marginBottom: 5 }}>{this.props.title}</div>
				{!this.state.hidden && (
					<React.Fragment>
						<AvatarEditor
							image={this.props.file}
							width={this.state.width}
							height={this.state.height}
							color={[255, 255, 255, 0]} // RGBA
							scale={this.state.scale}
							rotate={this.state.rotate}
						/>
						<p className={styles.sliderContainer}>
							<Slider
								classes={{ root: styles.slider }}
								value={this.state.scale}
								aria-labelledby="label"
								onChange={this.setScale}
							/>
						</p>
					</React.Fragment>
				)}
				<div className={styles.actionContainer}>
					{!this.state.hidden && (
						<Fab variant="extended" color="primary" onClick={this.setRotateLeft} size="medium">
							<RotateLeft />
						</Fab>
					)}
					<div className={styles.buttonContainer}>
						<Fab variant="extended" onClick={this.toggleImage} size="small">
							{this.state.hidden ? <Visibility /> : <VisibilityOff />}
						</Fab>
						<div className={styles.space} />
						<Fab variant="extended" onClick={this.removeImage} size="small" style={{ backgroundColor: 'red' }}>
							<Delete className={classNames(styles.deleteIcon)} titleAccess="Удалить изображение" />
						</Fab>
					</div>
					{!this.state.hidden && (
						<Fab variant="extended" color="primary" onClick={this.setRotateRight} size="medium">
							<RotateRight />
						</Fab>
					)}
				</div>
			</div>
		);
	}
}

export default ImageEditor;
