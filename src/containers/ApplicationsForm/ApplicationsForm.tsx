import DropdownSelect from '../../components/DropdownSelect';
import React from 'react';
import { connect, MapStateToProps } from 'react-redux';
import { enrollApplicationsFormSelector, fromTransaction, IRootState } from '$store';
import { disabledAddNewApplication, IApplication, IEnrollApplicationsForm, ISelectItem, ITransaction } from '$common';
import classes from './styles.module.css';
import {
	addPriemApplication,
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
	onChangeFilial: (item: ISelectItem) => void;
	onChangeInstitute: (item: ISelectItem) => void;
	onChangeEducationLevel: (item: ISelectItem) => void;
	onChangeDirection: (item: ISelectItem) => void;
	onChangeProfile: (item: ISelectItem) => void;
	onChangeEducationForm: (item: ISelectItem) => void;
	onChangePayForm: (item: ISelectItem) => void;
	addPriemApplication: () => void;
	onDeleteApplication: (index: number) => void;
}
type IProps = IOwnProps & IStateToProps & IDispatchToProps;

class ApplicationsForm extends React.Component<IProps> {
	onDeleteApplication = (index: number) => () => {
		this.props.onDeleteApplication(index);
	};
	render() {
		const name = 'applications.';

		return (
			<div className="flexColumn">
				<DropdownSelect
					required
					value={this.props.currentFilial}
					onChange={this.props.onChangeFilial}
					name={`${name}filials`}
					options={this.props.filials.result}
					placeholder={`Выберите филиал`}
					title={'Филиал'}
					loading={this.props.filials.loading}
				/>

				{!this.props.institutes.loading && this.props.institutes.result.length ? (
					<DropdownSelect
						required
						value={this.props.currentInstitute}
						onChange={this.props.onChangeInstitute}
						name={`${name}institutes`}
						options={this.props.institutes.result}
						placeholder={`Выберите институт`}
						title={'Институт'}
					/>
				) : null}

				{!this.props.educationLevels.loading && this.props.educationLevels.result.length ? (
					<DropdownSelect
						required
						value={this.props.currentEducationLevel}
						onChange={this.props.onChangeEducationLevel}
						name={`${name}educationLevel`}
						options={this.props.educationLevels.result}
						placeholder={`Выберите уровень образования`}
						title={'Уровень образования'}
					/>
				) : null}

				{!this.props.directions.loading && this.props.directions.result.length ? (
					<DropdownSelect
						required
						value={this.props.currentDirection}
						onChange={this.props.onChangeDirection}
						name={`${name}directions`}
						options={this.props.directions.result}
						placeholder={`Выберите направление подготовки`}
						title={'Направление подготовки'}
					/>
				) : null}

				{!this.props.profiles.loading &&
				this.props.profiles.result.length &&
				this.props.currentFilial &&
				this.props.currentFilial.id === 1 ? (
					<DropdownSelect
						required
						value={this.props.currentProfile}
						onChange={this.props.onChangeProfile}
						name={`${name}profiles`}
						options={this.props.profiles.result}
						placeholder={`Выберите профиль`}
						title={'Профиль'}
					/>
				) : null}

				{!this.props.educationForms.loading && this.props.educationForms.result.length ? (
					<DropdownSelect
						required
						value={this.props.currentEducationForm}
						onChange={this.props.onChangeEducationForm}
						name={`${name}educationForms`}
						options={this.props.educationForms.result}
						placeholder={`Выберите форма обучения`}
						title={'Форма обучения'}
					/>
				) : null}

				{!this.props.payForms.loading && this.props.payForms.result.length ? (
					<DropdownSelect
						required
						value={this.props.currentPayForm}
						onChange={this.props.onChangePayForm}
						name={`${name}payForms`}
						options={this.props.payForms.result}
						placeholder={`Выберите форма финансирования`}
						title={'Форма финансирования'}
					/>
				) : null}

				{this.props.currentPayForm && (
					<Button
						primary
						wrapperClassName={classes.addDocButtonWrapper}
						className={classes.addDocButton}
						onClick={this.props.addPriemApplication}>
						Добавить заявление
					</Button>
				)}
				{this.props.applications.length ? (
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
						</thead>
						<tbody>
							{this.props.applications.map((item: IApplication, index: number) => (
								<tr>
									<td>{index + 1}</td>
									<td>{item.filial.name}</td>
									<td>{item.institute.id ? item.institute.name : '-'}</td>
									<td>{item.direction.name}</td>
									<td>{item.profile.id ? item.profile.name : '-'}</td>
									<td>{item.educationForm.name}</td>
									<td>{item.payForm.name}</td>
									<td>
										<Button className={classes.deleteDocButton} primary onClick={this.onDeleteApplication(index)}>
											{'Удалить'}
										</Button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				) : null}

				{this.props.applications.length ? (
					<Button primary onClick={this.props.onComplete}>
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
