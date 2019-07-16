import DropdownSelect from '../../components/DropdownSelect';
import React from 'react';
import { connect, MapStateToProps } from 'react-redux';
import { enrollApplicationsFormSelector, fromTransaction, IRootState } from '$store';
import { disabledAddNewApplication, IApplication, IEnrollApplicationsForm, ISelectItem, ITransaction } from '$common';
import Delete from '@material-ui/icons/Delete';

import classes from './styles.module.css';
import {
	addPriemApplication,
	fetchPriemFilials,
	onChangeDirection,
	onChangeEducationForm,
	onChangeEducationLevel,
	onChangeFilial,
	onChangeInstitute,
	onChangePayForm,
	onChangeProfile,
	onDeleteApplication,
} from '$operations';
import Button from '../../components/Buttons/Button';
import { propOr } from 'ramda';

interface IOwnProps {
	onComplete: () => void;
}
interface IStateToProps extends IEnrollApplicationsForm {
	filials: ITransaction<ISelectItem>;
	institutes: ITransaction<ISelectItem>;
	educationLevels: ITransaction<ISelectItem>;
	directions: ITransaction<ISelectItem>;
	profiles: ITransaction<ISelectItem>;
	payForms: ITransaction<ISelectItem>;
	educationForms: ITransaction<ISelectItem>;
	disabledAddButton: boolean;
}
interface IDispatchToProps {
	fetchPriemFilials: () => void;
	onChangeFilial: (item: ISelectItem) => void;
	onChangeInstitute: (item: ISelectItem) => void;
	onChangeEducationLevel: (item: ISelectItem) => void;
	onChangeDirection: (item: ISelectItem) => void;
	onChangeProfile: (item: ISelectItem) => void;
	onChangeEducationForm: (item: ISelectItem) => void;
	onChangePayForm: (item: ISelectItem[]) => void;
	addPriemApplication: () => void;
	onDeleteApplication: (index: number) => void;
}
type IProps = IOwnProps & IStateToProps & IDispatchToProps;

class ApplicationsForm extends React.Component<IProps> {
	onDeleteApplication = (index: number) => () => {
		this.props.onDeleteApplication(index);
	};
	componentDidMount(): void {
		this.props.fetchPriemFilials();
	}
	render() {
		const name = 'applications.';
		const {
			disabledAddButton,
			filials,
			currentFilial,
			onChangeFilial,
			currentInstitute,
			onChangeInstitute,
			institutes,
			educationLevels,
			currentEducationLevel,
			directions,
			currentDirection,
			currentProfile,
			profiles,
			onChangePayForm,
			onChangeEducationForm,
			onChangeDirection,
			onChangeEducationLevel,
			onChangeProfile,
			currentEducationForm,
			educationForms,
			payForms,
			currentPayForms,
			applications,
			onComplete,
			addPriemApplication,
		} = this.props;

		return (
			<div className="flexColumn">
				{!disabledAddButton && (
					<>
						<DropdownSelect
							required
							value={currentFilial}
							onChange={onChangeFilial}
							name={`${name}filials`}
							options={filials.result}
							placeholder={`Выберите филиал`}
							title={'Филиал'}
							loading={filials.loading}
						/>

						<DropdownSelect
							required
							value={currentInstitute}
							onChange={onChangeInstitute}
							name={`${name}institutes`}
							options={institutes.result}
							placeholder={`Выберите институт`}
							title={'Институт'}
							loading={institutes.loading}
						/>

						{currentInstitute ? (
							<DropdownSelect
								required
								value={currentEducationLevel}
								onChange={onChangeEducationLevel}
								name={`${name}educationLevel`}
								options={educationLevels.result}
								placeholder={`Выберите уровень образования`}
								title={'Уровень образования'}
								loading={educationLevels.loading}
							/>
						) : null}

						{currentEducationLevel ? (
							<DropdownSelect
								required
								value={currentDirection}
								onChange={onChangeDirection}
								name={`${name}directions`}
								options={directions.result}
								placeholder={`Выберите направление подготовки`}
								title={'Направление подготовки'}
								loading={directions.loading}
							/>
						) : null}

						{currentDirection ? (
							<DropdownSelect
								required
								value={currentProfile}
								onChange={onChangeProfile}
								name={`${name}profiles`}
								options={profiles.result}
								placeholder={`Выберите профиль`}
								title={'Профиль'}
								loading={profiles.loading}
							/>
						) : null}

						{currentProfile ? (
							<DropdownSelect
								required
								value={currentEducationForm}
								onChange={onChangeEducationForm}
								name={`${name}educationForms`}
								options={educationForms.result}
								placeholder={`Выберите форма обучения`}
								title={'Форма обучения'}
								loading={educationForms.loading}
							/>
						) : null}

						{currentEducationForm ? (
							<DropdownSelect
								required
								value={currentPayForms}
								isMulti
								onChange={onChangePayForm}
								name={`${name}payForms`}
								options={payForms.result}
								placeholder={`Выберите форма финансирования`}
								title={'Форма финансирования'}
								loading={payForms.loading}
							/>
						) : null}
					</>
				)}

				{currentPayForms.length > 0 ? (
					<Button
						primary
						disabled={disabledAddButton}
						wrapperClassName={classes.addDocButtonWrapper}
						className={classes.addDocButton}
						onClick={addPriemApplication}>
						Добавить заявление
					</Button>
				) : null}
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
						<tbody>
							{applications.map((item: IApplication, index: number) => (
								<tr>
									<td>{index + 1}</td>
									<td>{item.filial.name}</td>
									<td>{item.institute.id ? item.institute.name : '-'}</td>
									<td>{item.direction.name}</td>
									<td>{item.profile.id ? item.profile.name : '-'}</td>
									<td>{item.educationForm.name}</td>
									<td>{item.payForm.name}</td>
									<td onClick={this.onDeleteApplication(index)} className={classes.pointer}>
										<Delete className={classes.deleteButton} />
									</td>
								</tr>
							))}
						</tbody>
					</table>
				) : null}
				{disabledAddButton && (
					<span className={classes.header}>
						По правилам приема можно подать заявления только на три направления подготовки
					</span>
				)}
				{applications.length ? (
					<Button primary onClick={onComplete}>
						{'Далее'}
					</Button>
				) : null}
			</div>
		);
	}
}
const mapStateToProps: MapStateToProps<IStateToProps, IOwnProps, IRootState> = state => {
	return {
		...enrollApplicationsFormSelector(state),
		filials: fromTransaction.fetchPriemFilials(state),
		institutes: fromTransaction.fetchPriemInstitutes(state),
		educationLevels: fromTransaction.fetchPriemEducationLevels(state),
		directions: fromTransaction.fetchPriemDirections(state),
		profiles: fromTransaction.fetchPriemProfiles(state),
		payForms: fromTransaction.fetchPriemPayForms(state),
		educationForms: fromTransaction.fetchPriemEducationForms(state),
		disabledAddButton: disabledAddNewApplication(enrollApplicationsFormSelector(state).applications),
	};
};

const mapDispatchToProps = {
	fetchPriemFilials,
	onChangeFilial,
	onChangeInstitute,
	onChangeEducationLevel,
	onChangeDirection,
	onChangeProfile,
	onChangeEducationForm,
	onChangePayForm,
	addPriemApplication,
	onDeleteApplication,
};
export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(ApplicationsForm);
