import * as React from 'react';
import { IDictionary, IEducationForm } from '$common';
import { DocumentForm } from '$components';
import { ITransaction } from '@black_bird/utils';
import { IFormProps, Select, Checkbox } from '@black_bird/components';

interface IProps {
	form: IFormProps<IEducationForm>;
	governmentDictionary: ITransaction<IDictionary>;
	prevEducDictionary: ITransaction<IDictionary>;
	educTypeDocDictionary: ITransaction<IDictionary>;
}

const EducationFormView = (props: IProps) => {
	const { governmentDictionary, prevEducDictionary, form, educTypeDocDictionary } = props;
	const { onChange, values } = form;

	return (
		<>
			<DocumentForm
				document={values.document}
				onChange={onChange}
				fileTitle="Файл документа о предыдущем образовании"
				title={'Предыдущее образование'}
				subTitle="Документ о предыдущем образовании"
				dictionarySubTypes={educTypeDocDictionary.result}
				governmentTitle="Государство"
				dictionaryGovernment={governmentDictionary.result}
				startFields={
					<>
						<Checkbox
							value={values.firstHighEducation}
							onChange={onChange}
							name="firstHighEducation"
							label="Получение высшего образования впервые"
						/>
						<Select
							onChange={onChange}
							value={values.prevEducation}
							required
							name="prevEducation"
							options={prevEducDictionary.result}
							placeholder="Выберите предыдущее образование"
							title="Предыдущее образование"
						/>
					</>
				}
			/>
		</>
	);
};

export default EducationFormView;
