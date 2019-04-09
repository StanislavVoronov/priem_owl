import { EDictionaryNameList, inValidateDataForm } from '../../../common';
import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { AppContext } from '../App';
import { IEducationDataForm } from '../models';
import Button from '@material-ui/core/Button';
import '../styles/common.css';
import { ISelectItem, DocDataForm, DropdownSelect } from '../../../platform';

interface IOwnProps {
	submit(data: IState): void;
}
type IProps = IOwnProps;

interface IState extends IEducationDataForm {}
class EducationDataForm extends React.PureComponent<IProps> {
	state = {
		firstHighEducation: true,
		coolnessTypes: [],
		prevEducation: 0,
		docSubType: null,
		docType: { id: 2, name: '' },
		hasEge: false,
		docFile: null,
		docNumber: '',
		docSeries: '',
		docIssieBy: '',
		docDate: '',
	};
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
	selectTypeEducation = (item: ISelectItem) => {
		this.setState({ docSubType: item, prevEducation: Number(item.id) });
	};
	render() {
		return (
			<AppContext.Consumer>
				{context => {
					const coolnessTypeDictionary = context[EDictionaryNameList.CoolnessTypes];
					const educationTypeDictionary = context[EDictionaryNameList.EducationDocTypes];
					const { firstHighEducation, coolnessTypes, ...rest } = this.state;
					return (
						<div className="flexColumn">
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
								onChangeSelect={this.onChangePersonCoolnessTypes}
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
								onDownloadFile={this.downloadFile}
								onChangeSeries={this.onChangeTextField('docSeries')}
								onChangeNumber={this.onChangeTextField('docNumber')}
								onChangeIssieBy={this.onChangeTextField('docIssieBy')}
								onChangeDate={this.onChangeTextField('docDate')}
								dictionaryTypes={educationTypeDictionary && educationTypeDictionary.values}
								subTitle={'Тип документа о предыдущем образовании'}
								extraFields={
									<FormControlLabel
										classes={{ root: 'checkFormControlLabel' }}
										control={<Checkbox color="primary" onChange={this.toggleHasEgeStatus} />}
										label="Имею результаты ЕГЭ"
										labelPlacement="start"
									/>
								}
							/>
							<div className="nextButtonContainer">
								<Button variant="contained" color="primary" disabled={inValidateDataForm(rest)} onClick={this.submit}>
									{'Далее'}
								</Button>
							</div>
						</div>
					);
				}}
			</AppContext.Consumer>
		);
	}
}

export default EducationDataForm;
