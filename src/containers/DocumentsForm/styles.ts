const styles = {
	docFormContainer: {
		display: 'flex',
		flexDirection: 'column' as any,
		borderBottom: '2px solid #3f51b5',
	},
	addDocButton: {
		color: 'white',
		backgroundColor: '#64991e',
		'&:hover': {
			backgroundColor: '#507a18',
		},
	},
	addDocButtonContainer: {
		marginTop: 20,
		marginBottom: 20,
		display: 'flex',
		flexDirection: 'column' as any,
	},
	deleteDocButtonContainer: {
		paddingTop: 20,
		paddingBottom: 20,
		borderBottom: '2px solid #3f51b5',
	},
	deleteDocButton: {
		color: 'white',
		backgroundColor: '#cf2e2e',
		'&:hover': {
			backgroundColor: '#902020',
		},
	},
	addDocButtonWrapper: {
		marginTop: 20,
		marginBottom: 20,
	},
};

export default styles;
