import { EDictionaryNameList, IDocType, inValidateDataForm } from '../../../common';
import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { IEducationDataForm } from '../models';
import Button from '@material-ui/core/Button';
import styles from './styles.css';
import { ISelectItem, DocDataForm, DropdownSelect } from '../../../platform';
import { defaultEducationDataForm } from '../defaults';
import { DictionaryContext } from '../EnrollContainer';

interface IOwnProps {
	submit(data: IState): void;
}
type IProps = IOwnProps;

interface IState extends IEducationDataForm {}
class EducationDataForm extends React.PureComponent<IProps, IEducationDataForm> {
	state = defaultEducationDataForm;
	toggleFirstHighEducationStatus = () => {
		this.setState({ firstHighEducation: !this.state.firstHighEducation });
	};
	toggleHasEgeStatus = () => {
		this.setState({ hasEge: !this.state.hasEge });
	};

	onChangePersonCoolnessTypes = (items: ISelectItem[]) => {
		this.setState({ coolnessTypes: items });
	};
	downloadFile = (file: File | null) => {
		this.setState({ docFile: file });
	};
	onChangeTextField = (name: string) => (value: string) => {
		this.setState(state => ({ ...state, [name]: value }));
	};
	submit = () => {
		this.props.submit(this.state);
	};
	selectTypeEducation = (item: IDocType) => {
		this.setState({ docSubType: item, prevEducation: Number(item.id) });
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
								classes={{ root: 'checkFormControlLabel' }}
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
								title={'Предыдущее образование'}
								required
								docTitle={'Документ о предыдущем образовании'}
								file={this.state.docFile}
								selectDocType={this.selectTypeEducation}
								defaultSubType={this.state.docSubType}
								onDownloadFile={this.downloadFile}
								onChangeSeries={this.onChangeTextField('docSeries')}
								onChangeNumber={this.onChangeTextField('docNumber')}
								onChangeIssieBy={this.onChangeTextField('docIssieBy')}
								onChangeDate={this.onChangeTextField('docDate')}
								dictionaryTypes={educationTypeDictionary && educationTypeDictionary.values}
								subTitle={'Тип документа о предыдущем образовании'}
								extraFields={
									<FormControlLabel
										className={styles.checkFormControlLabel}
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
