import React from 'react';
import AvatarEditor from 'react-avatar-editor';
import { Slider, Fab } from './';
import RotateLeft from '@material-ui/icons/RotateLeft';
import Delete from '@material-ui/icons/Delete';

import RotateRight from '@material-ui/icons/RotateRight';
import { composeStyles, makeHorizontalSpace, makeVerticalSpace } from '../common';

interface IProps {
	source: string | File;
	removeImage?: () => void;
}
interface IState {
	rotate: number;
	scale: number;
	width: number;
	height: number;
}
class ImageEditor extends React.PureComponent<IProps, IState> {
	static defaultProps = {
		removeImage: () => void 0,
	};
	state = {
		scale: 0.5,
		rotate: 0,
		width: window.innerWidth / 3,
		height: window.innerHeight / 3,
	};
	setScale = (event: React.ChangeEvent<{}>, scale: number) => {
		this.setState(state => ({ ...state, scale: scale <= 0 ? state.scale : scale }));
	};
	setRotateLeft = () => {
		this.setState(state => ({ ...state, rotate: state.rotate - 90 }));
	};
	setRotateRight = () => {
		this.setState(state => ({ ...state, rotate: state.rotate + 90 }));
	};
	removeImage = () => {
		this.props.removeImage!();
	};

	render() {
		return (
			<div style={{ width: this.state.width, justifyContent: 'center', display: 'flex', flexDirection: 'column' }}>
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
				<div
					style={composeStyles(makeVerticalSpace('normal'), {
						display: 'flex',
						paddingLeft: 20,
						paddingRight: 20,
						flexDirection: 'row',
						justifyContent: 'space-between',
					})}>
					<Fab variant="extended" color="primary" onClick={this.setRotateLeft} size="medium">
						<RotateLeft />
					</Fab>
					<Fab style={{ backgroundColor: 'red' }} variant="extended" onClick={this.removeImage} size="small">
						<Delete style={{ color: 'white' }} />
					</Fab>
					<Fab variant="extended" color="primary" onClick={this.setRotateRight} size="medium">
						<RotateRight />
					</Fab>
				</div>
			</div>
		);
	}
}

export default ImageEditor;
