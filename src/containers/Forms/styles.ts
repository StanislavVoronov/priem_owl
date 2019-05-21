const styles = {
	addDocButton: {
		color: 'white',
		backgroundColor: '#64991e',
		'&:hover': {
			backgroundColor: '#507a18',
		},
	},
	addDocButtonContainer: {
		marginTop: 20,
		marginBottom: 30,
	},
	deleteDocButtonContainer: {
		marginTop: 20,
		marginBottom: 20,
	},
	deleteDocButton: {
		color: 'white',
		backgroundColor: '#cf2e2e',
		'&:hover': {
			backgroundColor: '#902020',
		},
	},
	docFormContainer: {
		display: 'flex',
		flexDirection: 'column' as any,
		borderBottom: '2px solid #3f51b5',
	},
	checkFormControl: {
		marginTop: 10,
		marginBottom: 4,
		fontSize: '1em',
	},
	fileContainer: {
		display: 'flex',
		flexDirection: 'column' as any,
		marginTop: 16,
		width: '100%',
		height: '100%',
		marginBottom: 8,
	},
	dropZone: {
		display: 'flex',
		height: '100%',
		padding: 20,
		flexDirection: 'column' as any,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 10,
		borderColor: '#388e3c',
		borderStyle: 'solid',
		borderWidth: 3,
		flexWrap: 'wrap' as any,
	},
	docDataForm: {
		display: 'flex',
		flexDirection: 'row' as any,
		flexWrap: 'wrap' as any,
	},
	dataContainer: {
		display: 'flex',
		paddingRight: 40,
		flexDirection: 'column' as any,
		width: '50%',
	},
	documentContainer: {
		display: 'flex',
		width: '40%',
		alignItems: 'center',
		flexDirection: 'column' as any,
	},
};

export default styles;
