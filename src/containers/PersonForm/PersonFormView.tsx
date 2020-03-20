import { IDictionary, IPersonForm } from '$common';
import { DocumentForm } from '$components';
import React from 'react';
import { IFormProps, TextInput, Checkbox } from '@black_bird/components';
import { ITransaction } from '@black_bird/utils';

interface IProps {
	personTypesDocsDictionary: ITransaction<IDictionary>;
	typesDocsDictionary: ITransaction<IDictionary>;
	governmentDictionary: ITransaction<IDictionary>;
	form: IFormProps<IPersonForm>;
}

export const PersonFormView = (props: IProps) => {
	const { values, onChange } = props.form;
	const { personTypesDocsDictionary, typesDocsDictionary, governmentDictionary } = props;
	const { document } = values;

	return (
		<DocumentForm
			document={document}
			onChange={onChange}
			governmentTitle="Гражданство"
			dictionaryGovernment={governmentDictionary.result}
			fileTitle="Файл документа, удостоверяющего личность"
			dictionarySubTypes={personTypesDocsDictionary.result}
			subTitle="Тип документа удостоверяющего личность"
			endFields={
				<React.Fragment>
					{document.subType && document.subType.id === 1 && (
						<TextInput
							onChange={onChange}
							required
							defaultValue={values.codeDepartment}
							name="codeDepartment"
							label="Код подразделения"
							type="number"
							placeholder="Введите код подразделения"
						/>
					)}
					<TextInput
						name="birthplace"
						defaultValue={values.birthplace}
						onChange={onChange}
						label="Место рождения"
						required
						placeholder="Введите место рождения"
					/>
					<Checkbox
						onChange={onChange}
						name="isApplyPersonData"
						value={values.isApplyPersonData}
						label={
							<a href="http://www.mgutm.ru/entrant_2012/files/zayavlenie_na_obrabotku_pd.pdf" target="_blank">
								Согласие на обработку персональных данных
							</a>
						}
					/>
				</React.Fragment>
			}
		/>
	);
};
