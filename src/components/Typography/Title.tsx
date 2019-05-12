import FormLabel from '@material-ui/core/FormLabel';
import React from 'react';

export const Title = (props: any) => {
	const { color = '#0094D6' } = props;

	return (
		<FormLabel
			style={{ color, fontSize: '1em', textAlign: 'center', fontWeight: 'bold', marginTop: 16, marginBottom: 8 }}>
			{props.children}
		</FormLabel>
	);
};
