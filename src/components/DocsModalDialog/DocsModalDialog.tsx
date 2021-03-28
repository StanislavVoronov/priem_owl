import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { ImageEditor, ModalDialog } from '@black_bird/components';
import { noop } from '@black_bird/utils';
import { IRootState } from '$store';
import { Button, ChevronLeft, ChevronRight } from '$components';
import classes from './DocsModuleDialog.module.css';

interface IProps {
	onClose: () => void;
	onSubmit: (image: { file: File; name: string; id: number }) => void;
}
const DocsModalDialog = (props: IProps) => {
	const { onSubmit, onClose } = props;
	const [currentImage, setImage] = useState(0);
	const images = useSelector((state: IRootState) => state.images);

	const handleOnClickLeft = () => {
		setImage(currentImage - 1);
	};
	const handleOnClickRight = () => {
		setImage(currentImage + 1);
	};
	const handleOnSubmit = () => {
		onSubmit(images[currentImage]);
	};
	const image = images[currentImage];

	const file = new File([image.file], image.name, { type: 'image/jpeg' });

	return (
		<ModalDialog
			fullScreen
			actions={
				<div className={classes.buttons}>
					<Button variant="outlined" onClick={onClose}>
						Закрыть
					</Button>
					<Button onClick={handleOnSubmit}>Выбрать</Button>
				</div>
			}
			onClose={noop}
			open
			title="Выберите изображение">
			<div className={classes.content}>
				<div className={classes.icon}>
					{currentImage > 0 && <ChevronLeft fontSize="large" onClick={handleOnClickLeft} />}
				</div>
				<ImageEditor file={file} hideAttach hideEye />
				<div className={classes.icon}>
					{images.length > currentImage + 1 && (
						<ChevronRight fontSize="large" onClick={handleOnClickRight} />
					)}
				</div>
			</div>
		</ModalDialog>
	);
};

export default DocsModalDialog;
