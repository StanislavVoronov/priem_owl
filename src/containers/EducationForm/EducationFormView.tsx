import * as React from 'react';
import { IDictionary, IEducationForm } from '$common';
import { DocumentForm } from '$components';
import { ITransaction } from '@black_bird/utils';
import { IFormProps, Select, Checkbox, IFormField } from '@black_bird/components';
import { useCallback } from 'react';

interface IProps {
	form: IFormProps<IEducationForm>;
	governmentDictionary: ITransaction<IDictionary[]>;
	prevEducDictionary: ITransaction<IDictionary[]>;
	educTypeDocDictionary: ITransaction<IDictionary[]>;
	onChangeFirstHighEduc: (status: boolean) => void;
}

const EducationFormView = (props: IProps) => {
	const onChangeFirstHigh = useCallback((data: IFormField) => {
		 props.onChangeFirstHighEduc(data.value);
		 props.form.onChange(data);
	}, []);

	const { governmentDictionary, prevEducDictionary, form, educTypeDocDictionary } = props;
	const { onChange, values } = form;

	return (
		<>
			<DocumentForm
				document={values.document}
				onChange={onChange}
				fileTitle="Файл документа о предыдущем образовании"
				subTitle="Документ о предыдущем образовании"
				dictionarySubTypes={educTypeDocDictionary}
				governmentTitle="Государство"
				dictionaryGovernment={governmentDictionary}
				startFields={
					<>
						<Checkbox
							value={values.firstHighEducation}
							onChange={onChangeFirstHigh}
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
