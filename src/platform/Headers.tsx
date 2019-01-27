import FormLabel from '@material-ui/core/FormLabel';
import React from 'react';
import { composeStyles, makeSpace } from '../common';

export const H2 = (props: any) => {
	return (
		<FormLabel style={composeStyles(makeSpace('v-little'), { color: '#0094D6', fontWeight: 'bold' })}>
			{props.children}
		</FormLabel>
	);
};
