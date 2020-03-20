import React from 'react';
import classes from '../styles.module.css';
import Application from './Application';
import { IAdmGroup } from '$store';

interface IProps {
	applications: IAdmGroup[];
	onDelete: (index: number) => void;
}

const ApplicationsTable = (props: IProps) => {
	const { applications, onDelete } = props;

	const renderApplication = (item: IAdmGroup, index: number) => {
		return (
			<Application
				key={`${index}-${item.admGroup.ID}-${item.profile.ID}`}
				onDelete={onDelete}
				item={item}
				num={index}
			/>
		);
	};

	return (
		<>
			{applications.length ? (
				<table className={classes.table}>
					<thead>
						<th align="center">
							<td>Приоритет</td>
						</th>
						<th align="center">
							<td>Филиал</td>
						</th>
						<th align="center">
							<td>Институт</td>
						</th>
						<th align="center">
							<td className={classes.td}>Направление подготовки</td>
						</th>
						<th align="center">
							<td>Профиль</td>
						</th>
						<th align="center">
							<td>Форма обучения</td>
						</th>
						<th align="center">
							<td>Форма финансирования</td>
						</th>
						<th>
							<td>{''}</td>
						</th>
					</thead>
					<tbody>{applications.map(renderApplication)}</tbody>
				</table>
			) : null}
		</>
	);
};

export default ApplicationsTable;
