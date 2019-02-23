import { composeStyles, IDataChanged, IDocDataForm, ISelectChanged, ITextFieldChanged, Styles } from '../../../common';
import React from 'react';
import { DocDataForm, DropdownSelect } from '../../../platform';
import { IDictionary } from '@mgutm-fcu/dictionary';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

interface IEducationDataFormProps extends ISelectChanged, IDataChanged, IDocDataForm {
	dictionaryPreviousEducation: IDictionary[];
	dictionaryLevelEducation: IDictionary[];
	dictionaryCoolnessTypes: IDictionary[];
}

const EducationDataForm = (props: IEducationDataFormProps) => {
	return (
		<div style={composeStyles(Styles.flexColumn)}>
			<FormControlLabel
				style={{ justifyContent: 'flex-end', marginLeft: 0 }}
				control={
					<Checkbox
						color="primary"
						onChange={(event, checked) => props.onChangeData('isFirstHighEducation')(checked)}
					/>
				}
				label="Получение высшего образования впервые"
				labelPlacement="start"
			/>
			<DropdownSelect
				placeholder={'Выберите предыдущее образование'}
				onChangeSelect={props.onChangeSelect('prevEduc')}
				options={props.dictionaryPreviousEducation}
				title={'Предыдущее образование'}
			/>
			{/*<DocDataForm*/}
			{/*docFile={props.docFile}*/}
			{/*subTitle={'Выберите уровень образования'}*/}
			{/*dictionarySubTypes={props.dictionaryLevelEducation}*/}
			{/*onChangeData={props.onChangeData}*/}
			{/*/>*/}
			<DropdownSelect
				placeholder={'Выберите достижения'}
				onChangeSelect={props.onChangeSelect('coolnessTypes')}
				options={props.dictionaryCoolnessTypes}
				isMulti={true}
				title={'Индивидуальные достижения'}
			/>
			<FormControlLabel
				style={{ justifyContent: 'flex-end', marginLeft: 0 }}
				control={<Checkbox color="primary" onChange={(event, checked) => props.onChangeData('hasEge')(checked)} />}
				label="Имею результатам ЕГЭ"
				labelPlacement="start"
			/>
		</div>
	);
};

export default EducationDataForm;
