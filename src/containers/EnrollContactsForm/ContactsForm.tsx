import React, { ChangeEvent } from 'react';
import { TextInput, H2, Checkbox, DocumentForm, PriemForm } from '$components';
import { IContactsForm, IServerError, DocumentFormSchema, IStylable, EnrollContactsFormSchema } from '$common';

import { FormikProps } from 'formik';

import styles from './styles';
import { withStyles } from '@material-ui/core';
import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import {
	dictionaryStateSelector,
	submitEnrollContactsForm,
	contactsFormSelector,
	IRootState,
	fromTransaction,
} from '$store';

interface IStateToProps {
	data: IContactsForm;
	dictionaries: any; // FIXME change interface
	loading: boolean;
	error: IServerError | null;
}
interface IDispatchToProps {
	onSubmit: (values: IContactsForm) => void;
}
interface IOwnProps {
	onComplete: () => void;
	disabled?: boolean;
}
type IProps = IDispatchToProps & IStateToProps & IOwnProps & IStylable;

class EnrollContactsForm extends React.PureComponent<IProps> {
	static defaultProps = {
		disabled: false,
		classes: {},
	};
	toggleStatus = (form: FormikProps<IContactsForm>) => (event: ChangeEvent<HTMLInputElement>, checked: boolean) => {
		form.setFieldValue(event.target.name, checked);
	};

	renderForm = (form: FormikProps<IContactsForm>) => {
		const isRegAddressEqualLive = form.values.isRegAddressEqualLive;

		return (
			<form className="flexColumn">
				<H2>Адрес регистрации</H2>
				<DocumentForm
					document={form.values}
					docTitle="Файл регистрации места жительства"
					extraFields={
						<React.Fragment>
							<TextInput label={'Индекс'} type="number" placeholder={'Введите индекс'} required name="regIndex" />
							<TextInput
								label={'Субъект РФ'}
								helperText={'республика, область, край'}
								placeholder={'Введите адрес'}
								name="regRegion"
							/>
							<TextInput
								label={'Населенный пункт'}
								placeholder={'Введите населенный пункт'}
								required
								name="regLocality"
							/>
							<TextInput label={'Улица'} placeholder={'Введите улицу'} required name="regStreet" />
							<TextInput label={'Дом'} placeholder={'Введите дом'} name="regHome" required />
							<TextInput label={'Корпус'} name="regBlock" />
							<TextInput label={'Квартира'} name="regFlat" />
							<Checkbox label="Нуждаюсь в предоставлении общежития" name="needDormitory" />
						</React.Fragment>
					}
				/>

				<Checkbox name="isRegAddressEqualLive" label="Фактический адрес проживания	совпадает с адресом регистрации" />

				{!isRegAddressEqualLive && (
					<div className="flexColumn">
						<H2>Адрес проживания</H2>
						<TextInput
							label={'Индекс'}
							placeholder={'Введите индекс'}
							name="liveIndex"
							required={!isRegAddressEqualLive}
						/>
						<TextInput
							label={'Субъект РФ'}
							helperText={'республика, область, край'}
							placeholder={'Введите адрес'}
							name="liveRegion"
						/>
						<TextInput
							label="Населенный пункт"
							placeholder="Введите населенный пункт"
							name="liveLocality"
							required={!isRegAddressEqualLive}
						/>
						<TextInput label="Улица" required={!isRegAddressEqualLive} name="liveStreet" placeholder="Введите улицу" />
						<TextInput label="Дом" name="liveHome" placeholder="Введите дом" required={!isRegAddressEqualLive} />
						<TextInput name="liveBlock" label="Корпус" />
						<TextInput name="liveFlat" label="Квартира" />
					</div>
				)}
				<TextInput
					label="Электронная почта"
					name="email"
					helperText="Необходимо для подтверждения учетной записи"
					required
				/>
				{/*<DropdownSelect*/}
				{/*name="countyPhone"*/}
				{/*isCleanable={false}*/}
				{/*title="Страна оператора сотовой связи"*/}
				{/*options={governmentDictionary ? governmentDictionary.values : []}*/}
				{/*/>*/}
				<TextInput name="mobPhone" label="Мобильный телефон" required={true} />
				<TextInput name="homePhone" label="Домашний телефон" />
			</form>
		);
	};
	render() {
		return (
			<PriemForm
				buttonText="Далее"
				loading={this.props.loading}
				loadingText="Проверка данных"
				schema={{ ...DocumentFormSchema, ...EnrollContactsFormSchema }}
				error={this.props.error}
				renderForm={this.renderForm}
				onSubmit={this.props.onSubmit}
				initialValues={{ ...this.props.data }}
			/>
		);
	}
}

const mapStateToProps: MapStateToProps<IStateToProps, IOwnProps, IRootState> = state => {
	const dictionaries = dictionaryStateSelector(state);
	const { loading, error } = fromTransaction.createVerificationCode(state);

	const data = contactsFormSelector(state);

	return { data, dictionaries, loading, error };
};
const mapDispatchToProps: MapDispatchToProps<IDispatchToProps, IOwnProps> = (dispatch, ownProps) => ({
	onSubmit: (values: IContactsForm) => {
		dispatch(submitEnrollContactsForm(values));
		ownProps.onComplete();
	},
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(EnrollContactsForm));
