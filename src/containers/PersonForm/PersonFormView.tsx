import { IDictionary, IPersonForm } from '$common';
import { DocumentForm } from '$components';
import React from 'react';
import { IFormProps, TextInput, Checkbox } from '@black_bird/components';
import { ITransaction } from '@black_bird/utils';

interface IProps {
	personTypesDocsDictionary: ITransaction<IDictionary[]>;
	typesDocsDictionary: ITransaction<IDictionary[]>;
	governmentDictionary: ITransaction<IDictionary[]>;
	form: IFormProps<IPersonForm>;
}

export const PersonFormView = (props: IProps) => {
	const { values, onChange } = props.form;
	const { personTypesDocsDictionary, governmentDictionary } = props;
	const { document } = values;

	return (
		<DocumentForm
			document={document}
			onChange={onChange}
			governmentTitle="Гражданство"
			dictionaryGovernment={governmentDictionary}
			fileTitle="Файл документа, удостоверяющего личность"
			dictionarySubTypes={personTypesDocsDictionary}
			subTitle="Тип документа удостоверяющего личность"
			endFields={
				<React.Fragment>
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
							<a
								href="http://mgutm.ru/wp-content/uploads/doc/entrant/electronic-form/soglasie_na_obrabotku_pd.pdf"
								target="_blank">
								Согласие на обработку персональных данных
							</a>
						}
					/>
				</React.Fragment>
			}
		/>
	);
};
