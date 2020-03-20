import React from 'react';
import { isEmptyArray, isNotEmptyArray, ITransaction, prop } from '@black_bird/utils';
import { IAdmDictionaryItem } from '$common';
import { ApplicationsTable } from './components';

import classes from './styles.module.css';

import { Button, Column, IFormField, Select } from '@black_bird/components';

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
	applications: any[];
	disabledAddButton: boolean;
	addPriemApplication: () => void;
	submitApplicationsForm: () => void;
	onDeleteApplication: (index: number) => void;
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
		addPriemApplication,
		applications,
		submitApplicationsForm,
		onDeleteApplication,
		disabledAddButton,
	} = props;

	const nextButtonDisabled = isEmptyArray(applications);

	return (
		<Column>
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
					value={educLevel}
					onChange={onChangeEducLevel}
					getOptionValue={getId}
					getOptionLabel={prop('NAME')}
					name="educLevel"
					options={educLevelDictionary.result}
					placeholder={`Выберите уровень образования`}
					title={'Уровень образования'}
					loading={educLevelDictionary.isFetching}
				/>
			)}

			{educLevel && (
				<Select
					isCleanable
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
					options={educFormDictionary.result}
					placeholder={`Выберите форму обучения`}
					title={'Форма обучения'}
					isMulti
					loading={educFormDictionary.isFetching}
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

			{disabledAddButton && <div className={classes.repeatAppText}>Заявление уже было добавлено ранее</div>}
			{disabledAddButton && (
				<span className={classes.header}>
					По правилам приема можно подать заявления только на три направления подготовки
				</span>
			)}
			{isNotEmptyArray(payForms) ? (
				<Button disabled={disabledAddButton} classes={{ root: classes.addDocButton }} onClick={addPriemApplication}>
					Добавить заявление
				</Button>
			) : null}



			<ApplicationsTable onDelete={onDeleteApplication} applications={applications} />

			<Button disabled={nextButtonDisabled} onClick={submitApplicationsForm}>
				{'Далее'}
			</Button>
		</Column>
	);
};

export default ApplicationsFormView;
