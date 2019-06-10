import * as React from 'react';
import { DocumentFormSchema, EDictionaryNameList, IEnrollEducationForm, pipe } from '$common';

import { DocumentForm, Checkbox, PriemForm } from '$components';
import { DictionaryState } from '@mgutm-fcu/dictionary';

import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import { dictionaryStateSelector, enrollEducationFormSelector, IRootState, submitEnrollEducationForm } from '$store';

interface IStateToProps {
	data: IEnrollEducationForm;
	dictionaries: DictionaryState;
}
interface IOwnProps {
	onComplete: () => void;
}
interface IDispatchToProps {
	onSubmit: (values: IEnrollEducationForm) => void;
}
type IProps = IStateToProps & IDispatchToProps & IOwnProps;

const EducationForm = (props: IProps) => {
	const renderForm = () => {
		const { dictionaries, data } = props;
		const educationTypeDictionary = dictionaries[EDictionaryNameList.EducationDocTypes];

		return (
			<>
				<Checkbox name="firstHighEducation" label="Получение высшего образования впервые" />

				<DocumentForm
					document={data}
					title={'Предыдущее образование'}
					docTitle={'Документ о предыдущем образовании'}
					dictionarySubTypes={educationTypeDictionary && educationTypeDictionary.values}
					subTitle={'Тип документа о предыдущем образовании'}
					extraFields={<Checkbox name="hasEge" label="Имею результаты ЕГЭ" />}
				/>
			</>
		);
	};

	return (
		<PriemForm
			schema={DocumentFormSchema}
			buttonText="Далее"
			renderForm={renderForm}
			onSubmit={pipe(
				props.onSubmit,
				props.onComplete,
			)}
			initialValues={props.data}
		/>
	);
};

const mapStateToProps: MapStateToProps<IStateToProps, IOwnProps, IRootState> = state => {
	const dictionaries = dictionaryStateSelector(state);

	const data = enrollEducationFormSelector(state);

	return { data, dictionaries };
};
const mapDispatchToProps: MapDispatchToProps<IDispatchToProps, IOwnProps> = {
	onSubmit: submitEnrollEducationForm,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(EducationForm);
