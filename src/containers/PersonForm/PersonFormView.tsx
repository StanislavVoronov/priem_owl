import React, { ChangeEvent } from 'react';
import { DropdownSelect, Checkbox, WebPhoto, DocumentForm, TextInput, FormControlLabel } from '$components';
import { EDictionaryNameList, IDocument, IEnrollPersonForm, ISelectItem, IStylable } from '$common';

import { DictionaryState } from '@mgutm-fcu/dictionary';
import { withStyles } from '@material-ui/core';
import styles from './styles';
import Button from '../../components/Buttons/Button';

interface IProps extends IEnrollPersonForm, IStylable {
	dictionaries: DictionaryState;
	updatePersonDocument: (data: IDocument) => void;
	onChangeBirthPlace: (event: ChangeEvent<HTMLInputElement>) => void;
	addPersonPhoto: (photo: File) => void;
	removePersonPhoto: () => void;
	onChangeGovernment: (value: ISelectItem) => void;
	onChangeCodeDepartment: (event: ChangeEvent<HTMLInputElement>) => void;
	onChangeApplyPersonDataStatus: () => void;
	submit: () => void;
}

class PersonForm extends React.PureComponent<IProps> {
	static defaultProps = {
		classes: {},
	};
	render() {
		const { dictionaries, classes, personDocument, isApplyPersonData } = this.props;
		const dictionaryGovernments = dictionaries[EDictionaryNameList.Governments];
		const dictionaryPersonDocTypes = dictionaries[EDictionaryNameList.PersonDocTypes];

		return (
			<div className="flexColumn">
				<WebPhoto addPhoto={this.props.addPersonPhoto} removePhoto={this.props.removePersonPhoto} />
				<DocumentForm
					document={personDocument}
					governmentTitle="Гражданство"
					dictionaryGovernment={dictionaryGovernments && dictionaryGovernments.values}
					docTitle="Файл документа, удостоверяющего личность"
					updateDocument={this.props.updatePersonDocument}
					dictionarySubTypes={dictionaryPersonDocTypes && dictionaryPersonDocTypes.values}
					subTitle={'Тип документа удостоверяющего личность'}
					extraFields={
						<React.Fragment>
							{personDocument.docSubType && personDocument.docSubType.id === 1 && (
								<TextInput
									label="Код подразделения"
									type="number"
									defaultValue={personDocument.codeDepartment}
									placeholder={'Введите код подразделения'}
									onChange={this.props.onChangeCodeDepartment}
								/>
							)}
							<TextInput
								label="Место рождения"
								required
								defaultValue={this.props.birthPlace}
								placeholder={'Введите место рождения'}
								onBlur={this.props.onChangeBirthPlace}
							/>
						</React.Fragment>
					}
				/>
				<FormControlLabel
					className={classes.checkFormControl}
					control={
						<Checkbox color="primary" checked={isApplyPersonData} onChange={this.props.onChangeApplyPersonDataStatus} />
					}
					label="Согласие на обработку персональных данных"
				/>
				<div style={{ marginTop: 24 }}>
					<Button onClick={this.props.submit}>Далее</Button>
				</div>
			</div>
		);
	}
}

export default withStyles(styles)(PersonForm);
