import React from 'react';
import { IDocData, IDocDataItem } from '../models';
import Button from '@material-ui/core/Button';
import classNames from 'classnames';
import { DocDataForm, ISelectItem, TextInput } from '../../../platform';
import { EDictionaryNameList, inValidateDataForm, IDocSelectItem } from '../../../common';
import styles from '../styles/common.css';
import withStyles from '@material-ui/core/styles/withStyles';
import { IDictionary } from '@mgutm-fcu/dictionary';

interface IOwnProps {
	dictionaries: Record<string, IDictionary>;
	submit(data: IDocDataItem[]): void;
	classes: Record<string, string>;
}
interface IDocDataForm extends IDocData {
	hideDataFields: boolean;
}
interface IState {
	documents: IDocDataForm[];
}
const defaultDocFile = {
	docFile: null,
	hideDataFields: false,
	docType: null,
};
type IProps = IOwnProps;

const localStyles = () => ({
	addDocButton: {
		color: 'white',
		backgroundColor: 'green',
	},
	deleteDocButton: {
		color: 'white',
		backgroundColor: 'red',
		marginVertical: 20,
	},
	addDocButtonContainer: {
		marginTop: 20,
		marginBottom: 30,
	},
	deleteDocButtonContainer: {
		marginVertical: 20,
	},
	formContainer: {
		borderBottom: '2px solid #3f51b5',
	},
});

class DocumentsDataForm extends React.PureComponent<IProps, IState> {
	static defaultProps = {
		classes: {},
	};
	state = {
		documents: [],
	};
	addDoc = () => {
		this.setState({ documents: [...this.state.documents, { ...defaultDocFile }] });
	};
	onDownloadFile = (index: number) => (file: File | null) => {
		const documents: IDocDataForm[] = [...this.state.documents];
		documents[index].docFile = file;

		this.setState({ documents });
	};
	onChangeTextField = (index: number, name: string) => (value: string) => {
		const documents: IDocDataForm[] = [...this.state.documents];
		documents[index][name] = value;
		this.setState({ documents });
	};
	selectDocType = (index: number) => (type: IDocSelectItem) => {
		const documents: IDocDataForm[] = [...this.state.documents];

		documents[index].hideDataFields = type.need_info !== 1;

		if (type.id > 2) {
			documents[index] = {
				...documents[index],
				docType: type,
				docIssieBy: '',
				docDate: '',
				docSeries: '',
				docNumber: '',
			};
		} else {
			documents[index].docType = type;
		}

		this.setState({ documents });
	};
	selectDocSubType = (index: number) => (type: ISelectItem) => {
		const documents: IDocDataForm[] = [...this.state.documents];
		documents[index].docSubType = type;
		this.setState({ documents });
	};
	deleteDoc = (index: number) => () => {
		const documents: IDocDataForm[] = this.state.documents.filter((item, key) => key !== index);

		this.setState({ documents });
	};
	submit = () => {
		this.props.submit(this.state.documents);
	};
	render() {
		const dictionaryDocTypes = this.props.dictionaries[EDictionaryNameList.DocTypes];
		const isDisabledAddButton = this.state.documents.map(inValidateDataForm).includes(true);

		return (
			<div className={styles.flexColumn}>
				<div>
					{this.state.documents.map((item: IDocDataForm, index) => {
						const docType = item.docType && item.docType.id;

						const dictionarySubDocTypes =
							docType === 1
								? this.props.dictionaries[EDictionaryNameList.PersonDocTypes].values
								: docType === 2
								? this.props.dictionaries[EDictionaryNameList.EducationDocTypes].values
								: undefined;

						return (
							<div className={classNames(styles.flexColumn, this.props.classes.formContainer)}>
								<DocDataForm
									hideDataFields={item.hideDataFields}
									docTitle="Файл документа"
									file={item.docFile}
									title="Тип документа"
									selectDocSubType={this.selectDocSubType(index)}
									selectDocType={this.selectDocType(index)}
									dictionaryTypes={dictionaryDocTypes && dictionaryDocTypes.values}
									onDownloadFile={this.onDownloadFile(index)}
									onChangeSeries={this.onChangeTextField(index, 'docSeries')}
									onChangeNumber={this.onChangeTextField(index, 'docNumber')}
									onChangeIssieBy={this.onChangeTextField(index, 'docIssieBy')}
									onChangeDate={this.onChangeTextField(index, 'docDate')}
									subTitle={'Название документа'}
									dictionarySubTypes={docType && dictionarySubDocTypes}
									extraFields={
										item.docType && item.docType.id === 1 && item.docSubType && item.docSubType.id === 1 ? (
											<TextInput
												label="Код подразделения"
												type="number"
												placeholder={'Введите код подразделения'}
												onChange={this.onChangeTextField(index, 'codeDepartment')}
											/>
										) : null
									}
								/>
								<div className={this.props.classes.deleteDocButtonContainer}>
									<Button
										className={this.props.classes.deleteDocButton}
										variant="contained"
										onClick={this.deleteDoc(index)}>
										{'Удалить документ'}
									</Button>
								</div>
							</div>
						);
					})}
				</div>
				<div className={this.props.classes.addDocButtonContainer}>
					<Button
						disabled={isDisabledAddButton}
						className={this.props.classes.addDocButton}
						variant="contained"
						onClick={this.addDoc}>
						{'Добавить новый документ'}
					</Button>
				</div>
				<div className={styles.nextButtonContainer}>
					<Button variant="contained" color="primary" disabled={isDisabledAddButton} onClick={this.submit}>
						{'Далее'}
					</Button>
				</div>
			</div>
		);
	}
}

export default withStyles(localStyles)(DocumentsDataForm);
