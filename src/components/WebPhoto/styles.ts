const styles = {
	container: { width: '50%' },
	wrapper: { marginTop: 24, marginBottom: 16 },
	actionWrapper: {
		display: 'flex',
		justifyContent: 'stretch',
		flexDirection: 'row' as any,
		marginTop: 16,
	},
	addPhotoButton: {
		backgroundColor: '#64991e',
		color: 'white',
		'&:hover': {
			backgroundColor: '#507a18',
		},
	},
	takePhotoButton: {
		borderRadius: 0,
	},
	downloadButton: {
		backgroundColor: '#64991e',
		borderRadius: 0,
		color: 'white',
		'&:hover': {
			backgroundColor: '#507a18',
		},
	},
	webCamera: { padding: 22 },
	addPhotoButtonWrapper: {
		marginBottom: 12,
	},
};

export default styles;
