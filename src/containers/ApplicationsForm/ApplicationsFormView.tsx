import React from 'react';
import { isNotEmptyArray, ITransaction, prop } from '@black_bird/utils';
import { IDictionary, IAdmDictionaryItem } from '$common';

import { IFormField, Select } from '@black_bird/components';

interface IProps {
	filialDictionary: ITransaction<IAdmDictionaryItem>;
	instituteDictionary: ITransaction<IAdmDictionaryItem>;
	filial: IAdmDictionaryItem | null;
	institute: IAdmDictionaryItem | null;

	onChangeFilial: (item: IFormField<IAdmDictionaryItem>) => void;
	onChangeInst: (item: IFormField<IAdmDictionaryItem>) => void;
	onChangeEducLevel: (item: IFormField<IAdmDictionaryItem>) => void;
	educLevel: IAdmDictionaryItem | null;
	educLevelDictionary: ITransaction<IAdmDictionaryItem>;

	onChangeDirection: (item: IFormField<IAdmDictionaryItem>) => void;
	direction: IAdmDictionaryItem | null;
	directionDictionary: ITransaction<IAdmDictionaryItem>;

	onChangeProfiles: (item: IFormField<IAdmDictionaryItem[]>) => void;
	profiles: IAdmDictionaryItem[];
	profileDictionary: ITransaction<IAdmDictionaryItem>;

	onChangeEducForms: (item: IFormField<IAdmDictionaryItem[]>) => void;
	educForms: IAdmDictionaryItem[];
	educFormDictionary: ITransaction<IAdmDictionaryItem>;

	onChangePayForms: (item: IFormField<IAdmDictionaryItem[]>) => void;
	payForms: IAdmDictionaryItem[];
	payFormDictionary: ITransaction<IAdmDictionaryItem>;
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

const getId: any = prop('ID');

const ApplicationsFormView = (props: IProps) => {
	const {
		filialDictionary,
		institute,
		onChangeDirection,
		profileDictionary,
		profiles,
		onChangeProfiles,
		direction,
		directionDictionary,
		instituteDictionary,
		onChangeFilial,
		educLevel,
		educFormDictionary,
		educLevelDictionary,
		onChangeEducLevel,
		onChangeInst,
		filial,
		educForms,
		payFormDictionary,
		payForms,
		onChangeEducForms,
		onChangePayForms,
	} = props;

	return (
		<div className="flexColumn">
			{/*{!disabledAddButton && (*/}
			<Select
				required
				value={filial}
				onChange={onChangeFilial}
				getOptionValue={getId}
				getOptionLabel={prop('NAME')}
				name="filial"
				options={filialDictionary.result}
				placeholder={`Выберите филиал`}
				title={'Филиал'}
				loading={filialDictionary.isFetching}
			/>

			{filial && (
				<Select
					required
					value={institute}
					onChange={onChangeInst}
					getOptionValue={getId}
					getOptionLabel={prop('NAME')}
					name="inst"
					options={instituteDictionary.result}
					placeholder={`Выберите институт`}
					title={'Институт'}
					loading={instituteDictionary.isFetching}
				/>
			)}

			{institute && (
				<Select
					required
					value={educLevel}
					onChange={onChangeEducLevel}
					getOptionValue={getId}
					getOptionLabel={prop('NAME')}
					name="inst"
					options={educLevelDictionary.result}
					placeholder={`Выберите уровень образования`}
					title={'Уровень образования'}
					loading={educLevelDictionary.isFetching}
				/>
			)}

			{educLevel && (
				<Select
					required
					value={direction}
					onChange={onChangeDirection}
					getOptionValue={getId}
					getOptionLabel={prop('NAME')}
					name="direction"
					options={directionDictionary.result}
					placeholder={`Выберите направление подготовки`}
					title={'Направление подготовки'}
					loading={directionDictionary.isFetching}
				/>
			)}

			{direction && (
				<Select
					required
					value={profiles}
					onChange={onChangeProfiles}
					getOptionValue={getId}
					getOptionLabel={prop('NAME')}
					name="profile"
					options={profileDictionary.result}
					placeholder={`Выберите профиль`}
					title={'Профиль'}
					isMulti
					loading={profileDictionary.isFetching}
				/>
			)}

			{isNotEmptyArray(profiles) && (
				<Select
					required
					value={educForms}
					onChange={onChangeEducForms}
					getOptionValue={getId}
					getOptionLabel={prop('NAME')}
					name="educForm"
					options={educLevelDictionary.result}
					placeholder={`Выберите форму обучения`}
					title={'Форма обучения'}
					isMulti
					loading={educLevelDictionary.isFetching}
				/>
			)}

			{isNotEmptyArray(educForms) && (
				<Select
					required
					value={payForms}
					onChange={onChangePayForms}
					getOptionValue={getId}
					getOptionLabel={prop('NAME')}
					name="payForm"
					options={payFormDictionary.result}
					placeholder={`Выберите форму финансироавания`}
					title={'Форма финансирования'}
					isMulti
					loading={payFormDictionary.isFetching}
				/>
			)}

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
