import { composeStyles, EDictionaryNameList, ISelectItem, GlobalStyles, validateDataForm } from '../../../common';
import React from 'react';
import { DocDataForm, DropdownSelect } from '../../../platform';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { AppContext } from '../../../App';
import { IEducationDataForm } from '../models';
import Button from '@material-ui/core/Button';

interface IOwnProps {
	submit(data: IState): void;
}
type IProps = IOwnProps;
const styles = {
	checkFormControlLabel: { justifyContent: 'flex-end', marginLeft: 0 },
};
interface IState extends IEducationDataForm {}
class EducationDataForm extends React.PureComponent<IProps> {
	state = {
		firstHighEducation: true,
		coolnessTypes: [],
		prevEducation: null,
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
	onChangePreviousEducation = (item: ISelectItem) => {
		this.setState({ prevEducation: item });
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

	render() {
		return (
			<AppContext.Consumer>
				{context => {
					const coolnessTypeDictionary = context[EDictionaryNameList.CoolnessTypes];
					const previousEducationDictionary = context[EDictionaryNameList.PreviousEducation];
					const educationTypeDictionary = context[EDictionaryNameList.EducationDocTypes];
					const { hasEge, firstHighEducation, ...rest } = this.state;
					return (
						<div style={composeStyles(GlobalStyles.flexColumn)}>
							<FormControlLabel
								style={styles.checkFormControlLabel}
								control={<Checkbox color="primary" onChange={this.toggleFirstHighEducationStatus} />}
								label="Получение высшего образования впервые"
								labelPlacement="start"
							/>
							<DropdownSelect
								verticalSpace={'minor'}
								required
								placeholder={'Выберите предыдущее образование'}
								onChangeSelect={this.onChangePreviousEducation}
								options={previousEducationDictionary && previousEducationDictionary.values}
								title={'Предыдущее образование'}
							/>
							<DropdownSelect
								placeholder={'Выберите достижения'}
								onChangeSelect={this.onChangePersonCoolnessTypes}
								options={coolnessTypeDictionary && coolnessTypeDictionary.values}
								isMulti={true}
								title={'Индивидуальные достижения'}
							/>
							<DocDataForm
								file={this.state.docFile}
								docTitle="Файл документа о предыдущем образовании"
								required
								onDownloadFile={this.downloadFile}
								onChangeSeries={this.onChangeTextField('docSeries')}
								onChangeNumber={this.onChangeTextField('docNumber')}
								onChangeIssieBy={this.onChangeTextField('docIssieBy')}
								onChangeDate={this.onChangeTextField('docDate')}
								dictionarySubTypes={educationTypeDictionary && educationTypeDictionary.values}
								subTitle={'Тип документа о предыдущем образовании'}
							/>
							<FormControlLabel
								style={styles.checkFormControlLabel}
								control={<Checkbox color="primary" onChange={this.toggleHasEgeStatus} />}
								label="Имею результаты ЕГЭ"
								labelPlacement="start"
							/>
							<div style={GlobalStyles.buttonNext}>
								<Button variant="contained" color="primary" disabled={!validateDataForm(rest)} onClick={this.submit}>
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
