import React from 'react';
import Delete from '@material-ui/icons/Delete';
import classes from '../styles.module.css';
import { IAdmGroup } from '$store';

interface IProps {
	item: IAdmGroup;
	onDelete: (index: number) => void;
	num: number;
}
const Application = (props: IProps) => {
	const { num, item, onDelete } = props;

	const onClick = () => {
		props.onDelete(props.num);
	};

	return (
		<tr>
			<td>{num + 1}</td>
			<td>{item.filial.NAME}</td>
			<td>{item.inst.NAME}</td>
			<td>{item.dir.NAME}</td>
			<td>{item.profile ? item.profile.NAME : '-'}</td>
			<td>{item.educForm.NAME}</td>
			<td>{item.payForm.NAME}</td>
			<td onClick={onClick} className={classes.pointer}>
				<Delete className={classes.deleteButton} />
			</td>
		</tr>
	);
};

export default Application;
