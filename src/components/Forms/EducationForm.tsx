import * as React from 'react';
import {
	EDictionaryNameList,
	IDocument,
	IEducationForm,
	validateDataForm,
	ISelectItem,
	validateDocument,
	IContactsForm,
	IStylable,
} from '$common';

import styles from './styles';
import { DocumentForm, DropdownSelect, FormControlLabel, Checkbox, LoadingButton } from '$components';
import { IDictionaryState } from '@mgutm-fcu/dictionary';
import { withStyles } from '@material-ui/core';

interface IProps extends IStylable {
	dictionaries: IDictionaryState;
	data: IEducationForm;
	updateForm: (data: Partial<IEducationForm>) => void;
}

class EducationForm extends React.PureComponent<IProps> {
	static defaultProps = {
		classes: {},
	};

	toggleFirstHighEducationStatus = (_: any, checked: boolean) => {
		this.props.updateForm({ firstHighEducation: checked });
	};
	toggleHasEgeStatus = (_: any, checked: boolean) => {
		this.props.updateForm({ hasEge: checked });
	};

	onChangePersonCoolnessTypes = (items: ISelectItem[]) => {
		this.props.updateForm({ coolnessTypes: items });
	};
	updateDocument = (document: IDocument) => {
		this.props.updateForm({ document });
	};

	render() {
		const { dictionaries, classes, data } = this.props;
		const coolnessTypeDictionary = dictionaries[EDictionaryNameList.CoolnessTypes];
		const educationTypeDictionary = dictionaries[EDictionaryNameList.EducationDocTypes];

		return (
			<div className="flexColumn">
				<FormControlLabel
					className={classes.checkFormControl}
					control={
						<Checkbox
							checked={data.firstHighEducation}
							color="primary"
							onChange={this.toggleFirstHighEducationStatus}
						/>
					}
					label="Получение высшего образования впервые"
				/>
				<DropdownSelect
					defaultValue={data.coolnessTypes}
					placeholder={'Выберите достижения'}
					onChange={this.onChangePersonCoolnessTypes}
					options={coolnessTypeDictionary && coolnessTypeDictionary.values}
					isMulti={true}
					title={'Индивидуальные достижения'}
				/>
				<DocumentForm
					document={data.document}
					title={'Предыдущее образование'}
					docTitle={'Документ о предыдущем образовании'}
					updateDocument={this.updateDocument}
					dictionarySubTypes={educationTypeDictionary && educationTypeDictionary.values}
					subTitle={'Тип документа о предыдущем образовании'}
					extraFields={
						<FormControlLabel
							className={classes.checkFormControl}
							control={<Checkbox color="primary" checked={data.hasEge} onChange={this.toggleHasEgeStatus} />}
							label="Имею результаты ЕГЭ"
						/>
					}
				/>
			</div>
		);
	}
}

export default withStyles(styles)(EducationForm);
