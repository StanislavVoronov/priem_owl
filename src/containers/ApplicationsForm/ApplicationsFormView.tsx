import React from 'react';
import { ITransaction, prop } from '@black_bird/utils';
import { IDictionary, IAdmDictionaryItem } from '$common';

import { IFormField, Select } from '@black_bird/components';

interface IProps {
	filials: ITransaction<IAdmDictionaryItem>;
	filial: IAdmDictionaryItem | null;
	onChangeFilial: (item: IFormField<IAdmDictionaryItem>) => void;
	// instituteDictionary: ITransaction<IDictionary>;
	// educLevelDictionary: ITransaction<IDictionary>;
	// directionDictionary: ITransaction<IDictionary>;
	// profileDictionary: ITransaction<IDictionary>;
	// payFormDictionary: ITransaction<IDictionary>;
	// educFormDictionary: ITransaction<IDictionary>;
	// disabledAddButton: boolean;
	// onChangeInstitute: (item: ISelectItem) => void;
	// onChangeEducationLevel: (item: ISelectItem) => void;
	// onChangeDirection: (item: ISelectItem) => void;
	// onChangeProfile: (item: ISelectItem) => void;
	// onChangeEducationForm: (item: ISelectItem) => void;
	// onChangePayForm: (item: ISelectItem[]) => void;
	// addPriemApplication: () => void;
	// onDeleteApplication: (index: number) => void;
}

const ApplicationsFormView = (props: IProps) => {
	const { filials, onChangeFilial, filial } = props;
	console.log('filials', filials, filial);

	return (
		<div className="flexColumn">
			{/*{!disabledAddButton && (*/}
			<Select
				required
				onChange={onChangeFilial}
				getOptionValue={prop('ID')}
				getOptionLabel={prop('NAME')}
				name="filial"
				options={filials.result}
				placeholder={`Выберите филиал`}
				title={'Филиал'}
			/>
			{/*	<DropdownSelect*/}
			{/*		required*/}
			{/*		value={currentInstitute}*/}
			{/*		onChange={onChangeInstitute}*/}
			{/*		name={`${name}institutes`}*/}
			{/*		options={institutes.result}*/}
			{/*		placeholder={`Выберите институт`}*/}
			{/*		title={'Институт'}*/}
			{/*		loading={institutes.loading}*/}
			{/*	/>*/}
			{/*	{currentInstitute ? (*/}
			{/*		<DropdownSelect*/}
			{/*			required*/}
			{/*			value={currentEducationLevel}*/}
			{/*			onChange={onChangeEducationLevel}*/}
			{/*			name={`${name}educationLevel`}*/}
			{/*			options={educationLevels.result}*/}
			{/*			placeholder={`Выберите уровень образования`}*/}
			{/*			title={'Уровень образования'}*/}
			{/*			loading={educationLevels.loading}*/}
			{/*		/>*/}
			{/*	) : null}*/}
			{/*	{currentEducationLevel ? (*/}
			{/*		<DropdownSelect*/}
			{/*			required*/}
			{/*			value={currentDirection}*/}
			{/*			onChange={onChangeDirection}*/}
			{/*			name={`${name}directions`}*/}
			{/*			options={directions.result}*/}
			{/*			placeholder={`Выберите направление подготовки`}*/}
			{/*			title={'Направление подготовки'}*/}
			{/*			loading={directions.loading}*/}
			{/*		/>*/}
			{/*	) : null}*/}
			{/*	{currentDirection ? (*/}
			{/*		<DropdownSelect*/}
			{/*			required*/}
			{/*			value={currentProfile}*/}
			{/*			onChange={onChangeProfile}*/}
			{/*			name={`${name}profiles`}*/}
			{/*			options={profiles.result}*/}
			{/*			placeholder={`Выберите профиль`}*/}
			{/*			title={'Профиль'}*/}
			{/*			loading={profiles.loading}*/}
			{/*		/>*/}
			{/*	) : null}*/}
			{/*	{currentProfile ? (*/}
			{/*		<DropdownSelect*/}
			{/*			required*/}
			{/*			value={currentEducationForm}*/}
			{/*			onChange={onChangeEducationForm}*/}
			{/*			name={`${name}educationForms`}*/}
			{/*			options={educationForms.result}*/}
			{/*			placeholder={`Выберите форма обучения`}*/}
			{/*			title={'Форма обучения'}*/}
			{/*			loading={educationForms.loading}*/}
			{/*		/>*/}
			{/*	) : null}*/}
			{/*	{currentEducationForm ? (*/}
			{/*		<DropdownSelect*/}
			{/*			required*/}
			{/*			value={currentPayForms}*/}
			{/*			isMulti*/}
			{/*			onChange={onChangePayForm}*/}
			{/*			name={`${name}payForms`}*/}
			{/*			options={payForms.result}*/}
			{/*			placeholder={`Выберите форма финансирования`}*/}
			{/*			title={'Форма финансирования'}*/}
			{/*			loading={payForms.loading}*/}
			{/*		/>*/}
			{/*	) : null}*/}
			{/*</>*/}
			{/*)}*/}
			{/*{currentPayForms.length > 0 ? (*/}
			{/*	<Button*/}
			{/*		primary*/}
			{/*		disabled={disabledAddButton}*/}
			{/*		wrapperClassName={classes.addDocButtonWrapper}*/}
			{/*		className={classes.addDocButton}*/}
			{/*		onClick={addPriemApplication}>*/}
			{/*		Добавить заявление*/}
			{/*	</Button>*/}

			{/*{applications.length ? (*/}
			{/*	<table className={classes.table}>*/}
			{/*		<thead>*/}
			{/*			<th align="center">*/}
			{/*				<td>Приоритет</td>*/}
			{/*			</th>*/}
			{/*			<th align="center">*/}
			{/*				<td>Филиал</td>*/}
			{/*			</th>*/}
			{/*			<th align="center">*/}
			{/*				<td>Институт</td>*/}
			{/*			</th>*/}
			{/*			<th align="center">*/}
			{/*				<td className={classes.td}>Направление подготовки</td>*/}
			{/*			</th>*/}
			{/*			<th align="center">*/}
			{/*				<td>Профиль</td>*/}
			{/*			</th>*/}
			{/*			<th align="center">*/}
			{/*				<td>Форма обучения</td>*/}
			{/*			</th>*/}
			{/*			<th align="center">*/}
			{/*				<td>Форма финансирования</td>*/}
			{/*			</th>*/}
			{/*			<th>*/}
			{/*				<td>{''}</td>*/}
			{/*			</th>*/}
			{/*		</thead>*/}
			{/*		<tbody>*/}
			{/*			{applications.map((item: IApplication, index: number) => (*/}
			{/*				<tr>*/}
			{/*					<td>{index + 1}</td>*/}
			{/*					<td>{item.filial.name}</td>*/}
			{/*					<td>{item.institute.id ? item.institute.name : '-'}</td>*/}
			{/*					<td>{item.direction.name}</td>*/}
			{/*					<td>{item.profile.id ? item.profile.name : '-'}</td>*/}
			{/*					<td>{item.educationForm.name}</td>*/}
			{/*					<td>{item.payForm.name}</td>*/}
			{/*					<td onClick={this.onDeleteApplication(index)} className={classes.pointer}>*/}
			{/*						<Delete className={classes.deleteButton} />*/}
			{/*					</td>*/}
			{/*				</tr>*/}
			{/*			))}*/}
			{/*		</tbody>*/}
			{/*	</table>*/}
			{/*) : null}*/}
			{/*{disabledAddButton && (*/}
			{/*	<span className={classes.header}>*/}
			{/*		По правилам приема можно подать заявления только на три направления подготовки*/}
			{/*	</span>*/}
			{/*)}*/}
			{/*{applications.length ? (*/}
			{/*	<Button primary onClick={onComplete}>*/}
			{/*		{'Далее'}*/}
			{/*	</Button>*/}
			{/*) : null}*/}
		</div>
	);
};

export default ApplicationsFormView;
