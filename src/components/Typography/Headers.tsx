import FormLabel from '@material-ui/core/FormLabel';
import React from 'react';

interface IProps {
	color: string;
}
export const H2 = (props: any) => {
	const { color = '#0094D6' } = props;

	return <FormLabel style={{ color, fontWeight: 'bold', marginTop: 16, marginBottom: 8 }}>{props.children}</FormLabel>;
};
