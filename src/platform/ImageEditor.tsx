import React from 'react';
import AvatarEditor from 'react-avatar-editor';
import { Slider, Fab } from './';
import RotateLeft from '@material-ui/icons/RotateLeft';
import Delete from '@material-ui/icons/Delete';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Visibility from '@material-ui/icons/Visibility';
import RotateRight from '@material-ui/icons/RotateRight';
import { composeStyles, makeHorizontalSpace, makeVerticalSpace } from '../common';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';

interface IProps {
	source: string | File;
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
	};
	public state = {
		file: null,
		scale: 0.5,
		rotate: 0,
		hidden: false,
		width: window.innerWidth / 3,
		height: window.innerHeight / 3,
	};
	public setScale = (event: React.ChangeEvent<{}>, scale: number) => {
		this.setState(state => ({ ...state, scale: scale <= 0 ? state.scale : scale }));
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
			<div style={{ width: this.state.width, justifyContent: 'center', display: 'flex', flexDirection: 'column' }}>
				<FormLabel style={{ fontSize: '0.75em' }}>Название файла</FormLabel>
				<div style={{ marginTop: 6, marginBottom: 12 }}>{this.props.source && this.props.source['name']}</div>
				{!this.state.hidden && (
					<React.Fragment>
						<AvatarEditor
							image={this.props.source}
							width={this.state.width}
							height={this.state.height}
							color={[255, 255, 255, 0]} // RGBA
							scale={this.state.scale}
							rotate={this.state.rotate}
						/>
						<p
							style={{
								height: 20,
							}}>
							<Slider
								style={{ marginLeft: 30, marginRight: 30 }}
								value={this.state.scale}
								aria-labelledby="label"
								onChange={this.setScale}
							/>
						</p>
					</React.Fragment>
				)}
				<div
					style={composeStyles(makeVerticalSpace('normal'), {
						display: 'flex',
						paddingLeft: 20,
						paddingRight: 20,
						flexDirection: 'row',
						justifyContent: 'space-between',
					})}>
					{!this.state.hidden && (
						<Fab variant="extended" color="primary" onClick={this.setRotateLeft} size="medium">
							<RotateLeft />
						</Fab>
					)}
					<div style={{ display: 'flex' }}>
						<Fab variant="extended" onClick={this.toggleImage} size="small">
							<VisibilityOff />
						</Fab>
						<div style={{ marginLeft: 15, marginRight: 15 }} />
						<Fab style={{ backgroundColor: 'red' }} variant="extended" onClick={this.removeImage} size="small">
							<Delete style={{ color: 'white' }} />
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
