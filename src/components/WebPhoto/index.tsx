import React from 'react';
// @ts-ignore
import WebCamera from 'react-webcam';
import Image from '../ImageEditor/';
import AvatarEditor from 'react-avatar-editor';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { Button } from '@material-ui/core';
interface IState {
	file: File | null;
	open: boolean;
	photo: File | null;
}
interface IProps {
	downloadPhoto: (file: File) => void;
	removePhoto: () => void;
}
class WebPhoto extends React.Component<IProps, IState> {
	static defaultProps = {
		downloadPhoto: () => void 0,
		removePhoto: () => void 0,
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
		this.setState({ photo: this.state.file, open: false });
		if (this.state.file) {
			this.props.downloadPhoto(this.state.file);
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
		const videoConstraints = {
			height: 200,
			width: 200,
			facingMode: 'selfie',
		};

		return (
			<div style={{ width: '50%' }}>
				{!this.state.photo && (
					<div style={{ marginTop: 24, display: 'flex', flex: 0, flexDirection: 'column', marginBottom: 8 }}>
						<div>
							<Button variant="contained" color="primary" onClick={this.toggleDialog}>
								Добавить фотографию
							</Button>
						</div>
						<div style={{ marginTop: 10 }}>
							<label style={{ textAlign: 'center' }}>
								Необходимо для пропуска в Университет, в случае поступления.
							</label>
						</div>
					</div>
				)}
				<Dialog maxWidth="lg" open={this.state.open} onBackdropClick={this.toggleDialog}>
					<div style={{ display: 'flex', flexDirection: 'row' }}>
						<WebCamera
							style={{ padding: 22 }}
							audio={false}
							ref={this.setRef}
							screenshotFormat="image/jpeg"
							videoConstraints={videoConstraints}
						/>{' '}
						{this.state.file && (
							<AvatarEditor
								image={this.state.file}
								width={475}
								height={475}
								color={[255, 255, 255, 0]} // RGBA
							/>
						)}
					</div>
					<div
						style={{
							display: 'flex',
							justifyContent: 'stretch',
							flexDirection: 'row',
							marginTop: 16,
						}}>
						<Button fullWidth color="primary" style={{ borderRadius: 0 }} variant="contained" onClick={this.capture}>
							Сфотографировать
						</Button>
						{this.state.file && (
							<Button
								fullWidth
								variant="contained"
								style={{ backgroundColor: 'green', borderRadius: 0, color: 'white' }}
								onClick={this.onDownload}>
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

export default WebPhoto;
