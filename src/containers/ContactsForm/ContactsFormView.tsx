import React, { ChangeEvent } from 'react';
import { TextInput, H2, DropdownSelect, FormControlLabel, Checkbox, DocumentForm } from '$components';
import {
	EDictionaryNameList,
	IGovernmentSelectItem,
	inputValueAsString,
	IDocument,
	IStylable,
	IEnrollContactsForm,
	ISelectItem,
} from '$common';

import styles from './styles';
import { withStyles } from '@material-ui/core';
import { DictionaryState } from '@mgutm-fcu/dictionary';
import Button from '../../components/Buttons/Button';

interface IProps extends IStylable, IEnrollContactsForm {
	disabled: boolean;
	updateContactsForm: (event: ChangeEvent<HTMLInputElement>) => void;
	updateRegDocument: (document: IDocument) => void;
	toggleNeedDormitoryStatus: () => void;
	toggleLiveAddressStatus: () => void;
	selectMobileGovernment: (item: ISelectItem) => void;
	dictionaries: DictionaryState;
	submit: () => void;
}

class ContactsFormView extends React.PureComponent<IProps> {
	static defaultProps = {
		disabled: false,
		classes: {},
	};

	onChange: React.ChangeEventHandler<HTMLInputElement> = event => {
		this.props.updateContactsForm(event);
	};
	onChangeMobPhone: React.ChangeEventHandler<HTMLInputElement> = event => {
		const mobPhoneValue: string[] | null = inputValueAsString(event)
			.replace(/\D/g, '')
			.substring(`${this.props.mobileGovernment.phone_code}`.length)
			.match(/(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
		const phoneCode = `+${this.props.mobileGovernment.phone_code}`;
		const maskMobPhone =
			phoneCode +
			(mobPhoneValue
				? !mobPhoneValue[2]
					? mobPhoneValue[1]
					: '(' +
					  mobPhoneValue[1] +
					  ') ' +
					  mobPhoneValue[2] +
					  (mobPhoneValue[3] ? `-${mobPhoneValue[3]}` : '') +
					  (mobPhoneValue[4] ? +`-${mobPhoneValue[4]}` : '')
				: '');

		this.props.updateContactsForm({ ...event, target: { ...event.target, value: maskMobPhone } });
	};

	render() {
		const governmentDictionary = this.props.dictionaries[EDictionaryNameList.Governments];

		return (
			<form className="flexColumn">
				<H2>Адрес регистрации</H2>
				<DocumentForm
					document={this.props.regDocument}
					docTitle="Файл регистрации места жительства"
					updateDocument={this.props.updateRegDocument}
					extraFields={
						<React.Fragment>
							<TextInput
								label={'Индекс'}
								defaultValue={this.props.regIndex}
								type="number"
								placeholder={'Введите индекс'}
								required
								name="regIndex"
								onBlur={this.onChange}
							/>
							<TextInput
								label={'Область'}
								defaultValue={this.props.regRegion}
								placeholder={'Введите область'}
								required
								name="regRegion"
								onBlur={this.onChange}
							/>
							<TextInput
								label={'Населенный пункт'}
								defaultValue={this.props.regLocality}
								placeholder={'Введите населенный пункт'}
								required
								name="regLocality"
								onBlur={this.onChange}
							/>
							<TextInput
								label={'Улица'}
								defaultValue={this.props.regStreet}
								placeholder={'Введите улицу'}
								required
								name="regStreet"
								onBlur={this.onChange}
							/>
							<TextInput
								label={'Дом'}
								defaultValue={this.props.regHome}
								placeholder={'Введите дом'}
								name="regHome"
								required
								onBlur={this.onChange}
							/>
							<TextInput label={'Корпус'} defaultValue={this.props.regBlock} name="regBlock" onBlur={this.onChange} />
							<TextInput label={'Квартира'} defaultValue={this.props.regFlat} name="regFlat" onBlur={this.onChange} />
							<FormControlLabel
								className={this.props.classes.checkFormControl}
								control={
									<Checkbox
										color="primary"
										checked={this.props.needDormitory}
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
							checked={this.props.isRegAddressEqualLive}
							onChange={this.props.toggleLiveAddressStatus}
						/>
					}
					label="Фактический адрес проживания	совпадает с адресом регистрации"
				/>
				{!this.props.isRegAddressEqualLive && (
					<div className="flexColumn">
						<H2>Адрес проживания</H2>
						<TextInput
							label={'Индекс'}
							defaultValue={this.props.liveIndex}
							placeholder={'Введите индекс'}
							name="liveIndex"
							required={this.props.isRegAddressEqualLive}
							onBlur={this.onChange}
						/>
						<TextInput
							label={'ОбласonChangeSelectItemть'}
							defaultValue={this.props.liveRegion}
							placeholder={'Введите область'}
							name="liveRegion"
							required={this.props.isRegAddressEqualLive}
							onBlur={this.onChange}
						/>
						<TextInput
							label={'Населенный пункт'}
							defaultValue={this.props.liveLocality}
							placeholder={'Введите населенный пункт'}
							name="liveLocality"
							required={this.props.isRegAddressEqualLive}
							onBlur={this.onChange}
						/>
						<TextInput
							defaultValue={this.props.liveStreet}
							label={'Улица'}
							required={this.props.isRegAddressEqualLive}
							name="liveStreet"
							placeholder={'Введите улицу'}
							onBlur={this.onChange}
						/>
						<TextInput
							defaultValue={this.props.liveHome}
							label={'Дом'}
							name="liveHome"
							placeholder={'Введите дом'}
							required={this.props.isRegAddressEqualLive}
							onBlur={this.onChange}
						/>
						<TextInput defaultValue={this.props.liveBlock} name="liveBlock" label={'Корпус'} onBlur={this.onChange} />
						<TextInput defaultValue={this.props.liveFlat} name="liveFlat" label={'Квартира'} onBlur={this.onChange} />
					</div>
				)}
				<TextInput
					disabled={this.props.disabled}
					label={'Электронная почта'}
					defaultValue={this.props.email}
					name="email"
					helperText={'Необходимо для подтверждения учетной записи'}
					required
					onBlur={this.onChange}
				/>
				<DropdownSelect
					isCleanable={false}
					defaultValue={this.props.mobileGovernment}
					onChange={this.props.selectMobileGovernment}
					title={'Страна оператора сотовой связи'}
					options={governmentDictionary ? governmentDictionary.values : []}
				/>
				<TextInput
					value={this.props.mobPhone}
					defaultValue={this.props.mobPhone}
					helperText={'Формат: 999 999-99-99'}
					label={'Мобильный телефон'}
					required={true}
					onChange={this.onChangeMobPhone}
				/>
				<TextInput
					name="homePhone"
					label={'Домашний телефон'}
					defaultValue={this.props.homePhone}
					onBlur={this.onChange}
				/>
				<div style={{ marginTop: 24 }}>
					<Button onClick={this.props.submit}>Далее</Button>
				</div>
			</form>
		);
	}
}
export default withStyles(styles)(ContactsFormView);
