import React, { useState } from 'react';
import { isEmptyArray, isNotEmptyArray, ITransaction, prop } from '@black_bird/utils';
import { IAdmDictionaryItem, IDictionary, SPO_FILIAL_ID } from '$common';
import { ApplicationsTable } from './components';

import classes from './styles.module.css';

import { Button, Column, IFormField, Select, TextInput, Wrapper } from '@black_bird/components';
import { IAdmGroup, IAdmTransactionList } from '$store';
import classNames from 'classnames';
import { ExpandLessIcon, ExpandMoreIcon, ExpansionPanel } from '$components';

interface IProps {
	filialDictionary: IAdmTransactionList;
	instituteDictionary: IAdmTransactionList;
	filial: IAdmDictionaryItem | null;
	institute: IAdmDictionaryItem | null;

	onChangeFilial: (item: IFormField<IAdmDictionaryItem>) => void;
	onChangeInst: (item: IFormField<IAdmDictionaryItem>) => void;
	onChangeEducLevel: (item: IFormField<IAdmDictionaryItem>) => void;
	educLevel: IAdmDictionaryItem | null;
	educLevelDictionary: ITransaction<IAdmDictionaryItem[]>;

	onChangeDirection: (item: IFormField<IAdmDictionaryItem>) => void;
	direction: IAdmDictionaryItem | null;
	directionDictionary: IAdmTransactionList;

	onChangeProfiles: (item: IFormField<IAdmDictionaryItem[]>) => void;
	profiles: IAdmDictionaryItem[];
	profileDictionary: IAdmTransactionList;

	onChangeEducForms: (item: IFormField<IAdmDictionaryItem[]>) => void;
	educForms: IAdmDictionaryItem[];
	educFormDictionary: IAdmTransactionList;

	onChangePayForms: (item: IFormField<IAdmDictionaryItem[]>) => void;
	payForms: IAdmDictionaryItem[];
	payFormDictionary: IAdmTransactionList;
	applications: IAdmGroup[];
	disabledAddButton: boolean;
	addPriemApplication: () => void;
	submitApplicationsForm: () => void;
	onDeleteApplication: (index: number) => void;
	admTypesDictionary: ITransaction<IDictionary[]>;
	onChangeAdmType: (field: IFormField<IDictionary>) => void;
}

const getId: any = prop('ID');

const ApplicationsFormView = (props: IProps) => {
	const [display, changeDisplay] = useState(false);
	const onToggle = () => {
		changeDisplay(!display);
	};
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
		admTypesDictionary,
		onChangeAdmType,
	} = props;

	const nextButtonDisabled = isEmptyArray(applications);
	const countExceeded = direction
		? new Set([direction.ID, ...applications.map((item) => item.dir.ID)]).size > 3
		: false;

	const spoVisiable = filial?.ID === SPO_FILIAL_ID;

	console.log('educLevel', educLevel);

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
					error={educLevelDictionary.exception?.comment}
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
					error={instituteDictionary.exception?.comment}
					getOptionLabel={prop('NAME')}
					name="inst"
					options={instituteDictionary.result}
					placeholder={`Выберите институт`}
					title={'Институт'}
					loading={instituteDictionary.isFetching}
				/>
			)}

			{spoVisiable && (
				<Select
					isCleanable
					required
					value={institute}
					onChange={onChangeAdmType}
					getOptionValue={getId}
					error={admTypesDictionary.exception?.comment}
					getOptionLabel={prop('name')}
					name="admType"
					options={admTypesDictionary.result}
					placeholder={`Выберите значение`}
					title={'Класс'}
					loading={admTypesDictionary.isFetching}
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
					error={directionDictionary.exception?.comment}
					placeholder={`Выберите направление подготовки`}
					title={'Направление подготовки'}
					loading={directionDictionary.isFetching}
				/>
			)}
			{countExceeded && (
				<span className={classes.warningText}>
					По правилам приема возможно подать заявления только на три различных направления
					подготовки
				</span>
			)}

			{!countExceeded && direction && (
				<Select
					required
					value={profiles}
					onChange={onChangeProfiles}
					getOptionValue={getId}
					getOptionLabel={prop('NAME')}
					name="profile"
					error={profileDictionary.exception?.message}
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
					error={educFormDictionary.exception?.message}
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
					error={payFormDictionary.exception?.message}
					options={payFormDictionary.result}
					placeholder={`Выберите форму финансироавания`}
					title={'Форма финансирования'}
					isMulti
					loading={payFormDictionary.isFetching}
				/>
			)}

			{disabledAddButton && (
				<div className={classes.repeatAppText}>Заявление уже было добавлено ранее</div>
			)}

			<Wrapper margin="normal" className={classes.buttonWrapper}>
				<Button
					disabled={disabledAddButton || isEmptyArray(payForms)}
					classes={{ root: classes.addDocButton }}
					onClick={addPriemApplication}>
					Добавить заявление
				</Button>

				<Button disabled={nextButtonDisabled} onClick={submitApplicationsForm}>
					Следующий шаг
				</Button>
			</Wrapper>

			{isNotEmptyArray(applications) ? (
				<>
					<div className={classNames(classes.headerPanel)}>
						<div className={classes.appHeader}>Список заявлений</div>
						{display ? (
							<ExpandLessIcon
								titleAccess="Свернуть"
								className={classes.expansionIcon}
								fontSize="small"
								onClick={onToggle}
							/>
						) : (
							<ExpandMoreIcon
								titleAccess="Развернуть"
								className={classes.expansionIcon}
								fontSize="small"
								onClick={onToggle}
							/>
						)}
					</div>
					{display ? (
						<ApplicationsTable onDelete={onDeleteApplication} applications={applications} />
					) : null}
				</>
			) : null}
		</Column>
	);
};

export default ApplicationsFormView;
