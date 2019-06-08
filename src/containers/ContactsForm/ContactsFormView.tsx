import React, { ChangeEvent } from 'react';
import { TextInput, H2, DropdownSelect, FormControlLabel, Checkbox, DocumentForm } from '$components';
import { EDictionaryNameList, IDocument, IStylable, IEnrollContactsForm, ISelectItem, IServerError } from '$common';

import { Formik, FieldProps } from 'formik';

import styles from './styles';
import { withStyles } from '@material-ui/core';
import { DictionaryState } from '@mgutm-fcu/dictionary';
import Button from '../../components/Buttons/Button';
import LoadingText from '../../components/LoadingText';

interface IProps extends IStylable {
	data: IEnrollContactsForm;
	disabled: boolean;
	updateContactsForm: (event: ChangeEvent<HTMLInputElement>) => void;
	updateRegDocument: (document: IDocument) => void;
	toggleNeedDormitoryStatus: () => void;
	toggleLiveAddressStatus: () => void;
	selectMobileGovernment: (item: ISelectItem) => void;
	dictionaries: DictionaryState;
	submit: () => void;
	loading: boolean;
	error: IServerError | null;
}

class ContactsFormView extends React.PureComponent<IProps> {
	static defaultProps = {
		disabled: false,
		classes: {},
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

	renderForm = ({ form }: FieldProps) => {
		const governmentDictionary = this.props.dictionaries[EDictionaryNameList.Governments];

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
							<FormControlLabel
								className={this.props.classes.checkFormControl}
								control={
									<Checkbox
										color="primary"
										checked={this.props.data.needDormitory}
										onChange={this.props.toggleNeedDormitoryStatus}
									/>
								}
								label="Нуждаюсь в предоставлении общежития"
							/>
						</React.Fragment>
					}
				/>
				<FormControlLabel
					className={this.props.classes.checkFormControl}
					control={
						<Checkbox
							color="primary"
							checked={this.props.data.isRegAddressEqualLive}
							onChange={this.props.toggleLiveAddressStatus}
						/>
					}
					label="Фактический адрес проживания	совпадает с адресом регистрации"
				/>
				{!this.props.data.isRegAddressEqualLive && (
					<div className="flexColumn">
						<H2>Адрес проживания</H2>
						<TextInput
							label={'Индекс'}
							placeholder={'Введите индекс'}
							name="liveIndex"
							required={this.props.data.isRegAddressEqualLive}
						/>
						<TextInput
							label="Область"
							placeholder="Введите область"
							name="liveRegion"
							required={this.props.data.isRegAddressEqualLive}
						/>
						<TextInput
							label="Населенный пункт"
							placeholder="Введите населенный пункт"
							name="liveLocality"
							required={this.props.data.isRegAddressEqualLive}
						/>
						<TextInput
							label="Улица"
							required={this.props.data.isRegAddressEqualLive}
							name="liveStreet"
							placeholder="Введите улицу"
						/>
						<TextInput
							label="Дом"
							name="liveHome"
							placeholder="Введите дом"
							required={this.props.data.isRegAddressEqualLive}
						/>
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
				{this.props.error && <H2 color="red">{this.props.error.message}</H2>}

				<div style={{ marginTop: 24 }}>
					<Button onClick={this.props.submit}>Далее</Button>
				</div>
			</form>
		);
	};
	render() {
		return (
			<Formik
				onSubmit={this.props.submit}
				validateOnBlur={false}
				validateOnChange={false}
				initialValues={{ ...this.props.data }}>
				{this.renderForm}
			</Formik>
		);
	}
}
export default withStyles(styles)(ContactsFormView);
