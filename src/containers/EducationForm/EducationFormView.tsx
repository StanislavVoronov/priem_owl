import * as React from 'react';
import { EDictionaryNameList, IDocument, IEnrollEducationForm, ISelectItem, IStylable } from '$common';

import styles from './styles';
import { DocumentForm, DropdownSelect, FormControlLabel, Checkbox } from '$components';
import { DictionaryState } from '@mgutm-fcu/dictionary';
import { withStyles } from '@material-ui/core';
import Button from '../../components/Buttons/Button';

interface IProps extends IStylable, IEnrollEducationForm {
	dictionaries: DictionaryState;
	updateEducationDocument: (document: IDocument) => void;
	selectPersonCoolnessTypes: (coolnessTypes: ISelectItem[]) => void;
	toggleHasEgeStatus: () => void;
	toggleFirstHighEducationStatus: () => void;
	submit: () => void;
}

class EducationFormView extends React.PureComponent<IProps> {
	static defaultProps = {
		classes: {},
	};

	render() {
		const { dictionaries, classes, firstHighEducation, coolnessTypes, educationDocument, hasEge } = this.props;
		const coolnessTypeDictionary = dictionaries[EDictionaryNameList.CoolnessTypes];
		const educationTypeDictionary = dictionaries[EDictionaryNameList.EducationDocTypes];

		return (
			<div className="flexColumn">
				<FormControlLabel
					className={classes.checkFormControl}
					control={
						<Checkbox
							checked={firstHighEducation}
							color="primary"
							onChange={this.props.toggleFirstHighEducationStatus}
						/>
					}
					label="Получение высшего образования впервые"
				/>
				<DropdownSelect
					defaultValue={coolnessTypes}
					placeholder={'Выберите достижения'}
					onChange={this.props.selectPersonCoolnessTypes}
					options={coolnessTypeDictionary && coolnessTypeDictionary.values}
					isMulti={true}
					title={'Индивидуальные достижения'}
				/>
				<DocumentForm
					document={educationDocument}
					title={'Предыдущее образование'}
					docTitle={'Документ о предыдущем образовании'}
					updateDocument={this.props.updateEducationDocument}
					dictionarySubTypes={educationTypeDictionary && educationTypeDictionary.values}
					subTitle={'Тип документа о предыдущем образовании'}
					extraFields={
						<FormControlLabel
							className={classes.checkFormControl}
							control={<Checkbox color="primary" checked={hasEge} onChange={this.props.toggleHasEgeStatus} />}
							label="Имею результаты ЕГЭ"
						/>
					}
				/>
				<div style={{ marginTop: 24 }}>
					<Button onClick={this.props.submit}>Далее</Button>
				</div>
			</div>
		);
	}
}

export default withStyles(styles)(EducationFormView);
