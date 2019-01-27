import { composeStyles, ISelectChanged, ITextFieldChanged, Styles } from '../common';
import React from 'react';
import { DocDataForm, DropdownSelect } from '../platform';
import { IDictionary } from '@mgutm-fcu/dictionary';

interface IEducationDataFormProps extends ISelectChanged, ITextFieldChanged {
	dictionaryPreviousEducation: IDictionary[];
	dictionaryLevelEducation: IDictionary[];
	dictionaryCoolnessTypes: IDictionary[];
}
//TODO добавить Получение высшего образования впервые, Имею результаты ЕГЭ
const EducationDataForm = (props: IEducationDataFormProps) => {
	return (
		<div style={composeStyles(Styles.flexColumn)}>
			<DropdownSelect
				placeholder={'Выберите предыдущее образование'}
				onChangeSelect={props.onChangeSelect('prevEduc')}
				options={props.dictionaryPreviousEducation}
				title={'Предыдущее образование'}
			/>
			<DropdownSelect
				placeholder={'Выберите уровень образования'}
				onChangeSelect={props.onChangeSelect('levelEduc')}
				options={props.dictionaryLevelEducation}
				title={'Уровень образования'}
			/>
			<DropdownSelect
				placeholder={'Выберите достижения'}
				onChangeSelect={props.onChangeSelect('coolnessTypes')}
				options={props.dictionaryCoolnessTypes}
				isMulti={true}
				title={'Индивидуальные достижения'}
			/>
			<DocDataForm onChangeTextField={props.onChangeTextField} />
		</div>
	);
};

export default EducationDataForm;
