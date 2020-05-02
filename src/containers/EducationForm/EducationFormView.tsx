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
			<a
				target="_blank"
				href="https://monitoring.mgutm.ru/dev/priem/%D0%9E%D0%91%D0%AF%D0%97%D0%90%D0%A2%D0%95%D0%9B%D0%AC%D0%A1%D0%A2%D0%92%D0%9E.pdf">
				Отсутствует документ о предыдущем образовании
			</a>
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
							label="Получение среднего специального/высшего образования впервые"
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
