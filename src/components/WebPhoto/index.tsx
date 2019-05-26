import React from 'react';
// @ts-ignore
import WebCamera from 'react-webcam';
import Image from '../ImageEditor';
import AvatarEditor from 'react-avatar-editor';

import styles from './styles';
import Dialog from '@material-ui/core/Dialog';
import { Button } from '../Buttons';
import { withStyles } from '@material-ui/core';
interface IState {
	file: string | null;
	open: boolean;
	photo: File | null;
}
interface IProps {
	addPhoto: (file: File) => void;
	removePhoto: () => void;
	classes: any;
}

class WebPhoto extends React.Component<IProps, IState> {
	static defaultProps = {
		downloadPhoto: () => void 0,
		removePhoto: () => void 0,
		classes: {},
	};
	webCamera: any;
	state: IState = {
		file: null,
		open: false,
		photo: null,
	};
	setRef = (webCamera: any) => {
		this.webCamera = webCamera;
	};
	onDownload = () => {
		if (this.state.file) {
			const matches = this.state.file.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);

			if (!matches || matches.length !== 3) {
				throw new Error('Invalid base64 string');
			}

			const photo: File = new File([new Buffer(matches[2], 'base64')], 'photo', { type: matches[1] });
			this.setState({ open: false, photo });
			this.props.addPhoto(photo);
		}
	};
	capture = () => {
		this.setState({ file: this.webCamera.getScreenshot() });
	};
	toggleDialog = () => {
		this.setState({ open: !this.state.open });
	};
	removeFile = () => {
		this.setState({ photo: null, file: null });
		this.props.removePhoto();
	};
	render() {
		const { classes } = this.props;
		const videoConstraints = {
			height: 200,
			width: 200,
			facingMode: 'selfie',
		};

		return (
			<div className={classes.container}>
				{!this.state.photo && (
					<div className={classes.wrapper}>
						<div className={classes.addPhotoButtonWrapper}>
							<Button className={classes.addPhotoButton} onClick={this.toggleDialog}>
								Добавить фотографию
							</Button>
						</div>
						<label>Необходимо для пропуска в Университет, в случае поступления.</label>
					</div>
				)}
				<Dialog maxWidth="lg" open={this.state.open} onBackdropClick={this.toggleDialog}>
					<div className="flexRow">
						<WebCamera
							className={classes.webCamera}
							audio={false}
							ref={this.setRef}
							screenshotFormat="image/jpeg"
							videoConstraints={videoConstraints}
						/>
						{this.state.file && (
							<AvatarEditor
								image={this.state.file}
								width={475}
								height={475}
								color={[255, 255, 255, 0]} // RGBA
							/>
						)}
					</div>
					<div className={classes.actionWrapper}>
						<Button fullWidth primary className={classes.takePhotoButton} onClick={this.capture}>
							Сфотографировать
						</Button>
						{this.state.file && (
							<Button className={classes.downloadButton} fullWidth onClick={this.onDownload}>
								Загрузить
							</Button>
						)}
					</div>
				</Dialog>
				{this.state.photo && (
					<Image title="Личная фотография" hidden={true} file={this.state.photo} removeImage={this.removeFile} />
				)}
			</div>
		);
	}
}

export default withStyles(styles)(WebPhoto);
