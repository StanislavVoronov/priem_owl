import { EDictionaryNameList, IDocType, IDocument, inValidateDataForm, ISelectItem } from '$common';
import { IEducationDataForm } from '../models';
import styles from './styles.module.css';
import { DocDataForm, DropdownSelect, Button, FormControlLabel, Checkbox } from '$components';
import { DictionaryContext } from '../EnrollContainer';
import * as React from 'react';

interface IOwnProps {
	defaultData: IEducationDataForm;
	submit(data: IEducationDataForm): void;
}
type IProps = IOwnProps;

class EducationDataForm extends React.PureComponent<IProps, IEducationDataForm> {
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
		return (
			<DictionaryContext.Consumer>
				{dictionaries => {
					const coolnessTypeDictionary = dictionaries[EDictionaryNameList.CoolnessTypes];
					const educationTypeDictionary = dictionaries[EDictionaryNameList.EducationDocTypes];
					const { firstHighEducation, ...rest } = this.state;

					return (
						<div className={styles.flexColumn}>
							<FormControlLabel
								classes={{ root: styles.checkFormControl, label: styles.checkFormControlLabel }}
								control={
									<Checkbox value={firstHighEducation} color="primary" onChange={this.toggleFirstHighEducationStatus} />
								}
								label="Получение высшего образования впервые"
								labelPlacement="start"
							/>
							<DropdownSelect
								placeholder={'Выберите достижения'}
								onChange={this.onChangePersonCoolnessTypes}
								options={coolnessTypeDictionary && coolnessTypeDictionary.values}
								isMulti={true}
								title={'Индивидуальные достижения'}
							/>
							<DocDataForm
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
										labelPlacement="start"
									/>
								}
							/>
							<div className={styles.nextButtonContainer}>
								<Button variant="contained" color="primary" disabled={inValidateDataForm(rest)} onClick={this.submit}>
									{'Далее'}
								</Button>
							</div>
						</div>
					);
				}}
			</DictionaryContext.Consumer>
		);
	}
}

export default EducationDataForm;
