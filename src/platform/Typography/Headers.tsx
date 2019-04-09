import FormLabel from '@material-ui/core/FormLabel';
import React from 'react';
import { composeStyles, makeVerticalSpace } from '../../common';

export const H2 = (props: any) => {
	return (
		<FormLabel style={composeStyles(makeVerticalSpace('minor'), { color: '#0094D6', fontWeight: 'bold' })}>
			{props.children}
		</FormLabel>
	);
};
