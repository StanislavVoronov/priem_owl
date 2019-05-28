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
};

export default styles;
