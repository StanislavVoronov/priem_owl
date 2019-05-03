import * as React from 'react';
import {
	EDictionaryNameList,
	IDocument,
	IEducationForm,
	validateDataForm,
	ISelectItem,
	validateDocument,
} from '$common';

import styles from './styles.module.css';
import { DocumentForm, DropdownSelect, FormControlLabel, Checkbox, LoadingButton } from '$components';
import { IDictionaryState } from '@mgutm-fcu/dictionary';

interface IProps {
	dictionaries: IDictionaryState;
	defaultData: IEducationForm;
	submit(data: IEducationForm): void;
}

class EducationForm extends React.PureComponent<IProps, IEducationForm> {
	state = this.props.defaultData;
	toggleFirstHighEducationStatus = () => {
		this.setState({ firstHighEducation: !this.state.firstHighEducation });
	};
	toggleHasEgeStatus = () => {
		this.setState({ hasEge: !this.state.hasEge });
	};

	onChangePersonCoolnessTypes = (items: ISelectItem[]) => {
		this.setState({ coolnessTypes: items });
	};
	updateDocument = (document: IDocument) => {
		this.setState({ document });
	};
	submit = () => {
		this.props.submit(this.state);
	};

	render() {
		const { dictionaries } = this.props;
		const coolnessTypeDictionary = dictionaries[EDictionaryNameList.CoolnessTypes];
		const educationTypeDictionary = dictionaries[EDictionaryNameList.EducationDocTypes];
		const invalidForm = !(validateDataForm(this.state) && validateDocument(this.state.document));

		return (
			<div className="flexColumn">
				<FormControlLabel
					classes={{ root: styles.checkFormControl, label: styles.checkFormControlLabel }}
					control={
						<Checkbox
							value={this.state.firstHighEducation}
							color="primary"
							onChange={this.toggleFirstHighEducationStatus}
						/>
					}
					label="Получение высшего образования впервые"
				/>
				<DropdownSelect
					placeholder={'Выберите достижения'}
					onChange={this.onChangePersonCoolnessTypes}
					options={coolnessTypeDictionary && coolnessTypeDictionary.values}
					isMulti={true}
					title={'Индивидуальные достижения'}
				/>
				<DocumentForm
					document={this.state.document}
					title={'Предыдущее образование'}
					docTitle={'Документ о предыдущем образовании'}
					updateDocument={this.updateDocument}
					dictionaryTypes={educationTypeDictionary && educationTypeDictionary.values}
					subTitle={'Тип документа о предыдущем образовании'}
					extraFields={
						<FormControlLabel
							classes={{ root: styles.checkFormControl, label: styles.checkFormControlLabel }}
							control={<Checkbox color="primary" onChange={this.toggleHasEgeStatus} />}
							label="Имею результаты ЕГЭ"
						/>
					}
				/>
				<LoadingButton disabled={invalidForm} onClick={this.submit}>
					Подтвердить
				</LoadingButton>
			</div>
		);
	}
}

export default EducationForm;
