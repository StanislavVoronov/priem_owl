import React, { ChangeEvent } from 'react';
import { TextInput, H2, DropdownSelect, Checkbox, DocumentForm, PriemForm, LoadingText } from '$components';
import {
	EDictionaryNameList,
	IEnrollContactsForm,
	IServerError,
	DocumentFormSchema,
	EnrollPersonFormSchema,
	IStylable,
} from '$common';

import { FieldProps, FormikProps } from 'formik';

import styles from './styles';
import { withStyles } from '@material-ui/core';
import { DictionaryState } from '@mgutm-fcu/dictionary';
import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import {
	dictionaryStateSelector,
	submitEnrollContactsForm,
	enrollContactsFormSelector,
	IRootState,
	fromTransaction,
} from '$store';
import { createVerificationCode } from '$operations';

interface IStateToProps {
	data: IEnrollContactsForm;
	dictionaries: DictionaryState;
	loading: boolean;
	error: IServerError | null;
}
interface IDispatchToProps {
	onSubmit: (values: IEnrollContactsForm) => void;
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
	toggleStatus = (form: FormikProps<IEnrollContactsForm>) => (
		event: ChangeEvent<HTMLInputElement>,
		checked: boolean,
	) => {
		form.setFieldValue(event.target.name, checked);
	};
	// onChange = (event: any) => {
	// 	this.props.updateContactsForm(event);
	// };
	// onChangeMobPhone: React.ChangeEventHandler<HTMLInputElement> = event => {
	// 	const mobPhoneValue: string[] | null = inputValueAsString(event)
	// 		.replace(/\D/g, '')
	// 		.substring(`${this.props.mobileGovernment.phone_code}`.length)
	// 		.match(/(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
	// 	const phoneCode = `+${this.props.dta.mobileGovernment.phone_code}`;
	// 	const maskMobPhone =
	// 		phoneCode +
	// 		(mobPhoneValue
	// 			? !mobPhoneValue[2]
	// 				? mobPhoneValue[1]
	// 				: '(' +
	// 				  mobPhoneValue[1] +
	// 				  ') ' +
	// 				  mobPhoneValue[2] +
	// 				  (mobPhoneValue[3] ? `-${mobPhoneValue[3]}` : '') +
	// 				  (mobPhoneValue[4] ? +`-${mobPhoneValue[4]}` : '')
	// 			: '');
	//
	// 	this.onChange({ ...event, target: { ...event.target, value: maskMobPhone, name: event.target.name } });
	// };

	renderForm = (form: FormikProps<IEnrollContactsForm>) => {
		const governmentDictionary = this.props.dictionaries[EDictionaryNameList.Governments];

		const isRegAddressEqualLive = form.values.isRegAddressEqualLive;

		if (this.props.loading) {
			return <LoadingText>Проверка электронной почты</LoadingText>;
		}

		return (
			<form className="flexColumn">
				<H2>Адрес регистрации</H2>
				<DocumentForm
					document={form.values}
					docTitle="Файл регистрации места жительства"
					extraFields={
						<React.Fragment>
							<TextInput label={'Индекс'} type="number" placeholder={'Введите индекс'} required name="regIndex" />
							<TextInput label={'Область'} placeholder={'Введите область'} required name="regRegion" />
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
							required={isRegAddressEqualLive}
						/>
						<TextInput
							label="Область"
							placeholder="Введите область"
							name="liveRegion"
							required={isRegAddressEqualLive}
						/>
						<TextInput
							label="Населенный пункт"
							placeholder="Введите населенный пункт"
							name="liveLocality"
							required={isRegAddressEqualLive}
						/>
						<TextInput label="Улица" required={isRegAddressEqualLive} name="liveStreet" placeholder="Введите улицу" />
						<TextInput label="Дом" name="liveHome" placeholder="Введите дом" required={isRegAddressEqualLive} />
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
				<DropdownSelect
					name="countyPhone"
					isCleanable={false}
					title="Страна оператора сотовой связи"
					options={governmentDictionary ? governmentDictionary.values : []}
				/>
				<TextInput name="mobPhone" label="Мобильный телефон" required={true} />
				<TextInput name="homePhone" label="Домашний телефон" />
			</form>
		);
	};
	render() {
		return (
			<PriemForm
				buttonText="Далее"
				schema={{ ...DocumentFormSchema, ...EnrollPersonFormSchema }}
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
	const { loading, error } = fromTransaction.createVerificationCodeSelector(state);

	const data = enrollContactsFormSelector(state);

	return { data, dictionaries, loading, error };
};
const mapDispatchToProps: MapDispatchToProps<IDispatchToProps, IOwnProps> = (dispatch, ownProps) => ({
	onSubmit: (values: IEnrollContactsForm) => {
		dispatch(submitEnrollContactsForm(values));
		dispatch<any>(createVerificationCode()).then(ownProps.onComplete);
	},
});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(withStyles(styles)(EnrollContactsForm));
