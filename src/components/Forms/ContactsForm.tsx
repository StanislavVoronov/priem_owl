import React from 'react';
import { TextInput, H2, DropdownSelect, FormControlLabel, Checkbox, DocumentForm, LoadingButton } from '$components';
import {
	EDictionaryNameList,
	IGovernmentSelectItem,
	inputValueAsString,
	IDocument,
	IContactsForm,
	IStylable,
} from '$common';

import styles from './styles';
import { IDictionaryState } from '@mgutm-fcu/dictionary';
import { withStyles } from '@material-ui/core';

interface IProps extends IStylable {
	disabled: boolean;
	dictionaries: IDictionaryState;
	defaultData: IContactsForm;
	updateForm: (data: IContactsForm) => void;
	invalidData: Partial<IContactsForm>;
}

class ContactsForm extends React.PureComponent<IProps, IContactsForm> {
	static defaultProps = {
		disabled: false,
		classes: {},
	};
	state = this.props.defaultData;

	onChange = (field: keyof IContactsForm): React.ChangeEventHandler<HTMLInputElement> => event => {
		this.setState({ ...this.state, [field]: inputValueAsString(event) }, this.updateForm);
	};
	updateForm = () => {
		this.props.updateForm(this.state);
	};
	toggleLiveAddressStatus = (_: any, checked: boolean) => {
		this.setState({ isRegAddressEqualLive: checked }, this.updateForm);
	};
	toggleNeedDormitoryStatus = (_: any, checked: boolean) => {
		this.setState({ needDormitory: checked }, this.updateForm);
	};
	onChangeSelectItem = (item: IGovernmentSelectItem) => {
		const phoneNumber = this.props.defaultData.mobPhone.substr(
			this.props.defaultData.phoneGovernment.phone_code.length + 1,
		);
		const maskedMobPhone = `+${item.phone_code}${phoneNumber}`;
		this.setState({ mobPhone: maskedMobPhone, phoneGovernment: item }, this.updateForm);
	};
	onChangeMobPhone: React.ChangeEventHandler<HTMLInputElement> = event => {
		const mobPhoneValue: string[] | null = inputValueAsString(event)
			.replace(/\D/g, '')
			.substring(`${this.props.defaultData.phoneGovernment.phone_code}`.length)
			.match(/(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
		const phoneCode = `+${this.props.defaultData.phoneGovernment.phone_code}`;
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

		this.setState({ mobPhone: maskMobPhone }, this.updateForm);
	};
	updateDocument = (document: IDocument) => {
		this.setState({ document }, this.updateForm);
	};
	render() {
		const governmentDictionary = this.props.dictionaries[EDictionaryNameList.Governments];

		return (
			<div className="flexColumn">
				<H2>Адрес регистрации</H2>
				<DocumentForm
					document={this.props.defaultData.document}
					docTitle="Файл регистрации места жительства"
					updateDocument={this.updateDocument}
					extraFields={
						<React.Fragment>
							<TextInput
								label={'Индекс'}
								defaultValue={this.props.defaultData.regIndex}
								type="number"
								placeholder={'Введите индекс'}
								required={true}
								onBlur={this.onChange('regIndex')}
							/>
							<TextInput
								label={'Область'}
								defaultValue={this.props.defaultData.regRegion}
								placeholder={'Введите область'}
								required={true}
								onBlur={this.onChange('regRegion')}
							/>
							<TextInput
								label={'Населенный пункт'}
								defaultValue={this.props.defaultData.regLocality}
								placeholder={'Введите населенный пункт'}
								required={true}
								onBlur={this.onChange('regLocality')}
							/>
							<TextInput
								label={'Улица'}
								defaultValue={this.props.defaultData.regStreet}
								placeholder={'Введите улицу'}
								required={true}
								onBlur={this.onChange('regStreet')}
							/>
							<TextInput
								label={'Дом'}
								defaultValue={this.props.defaultData.regHome}
								placeholder={'Введите дом'}
								required={true}
								onBlur={this.onChange('regHome')}
							/>
							<TextInput
								label={'Корпус'}
								defaultValue={this.props.defaultData.regBlock}
								onBlur={this.onChange('regBlock')}
							/>
							<TextInput
								label={'Квартира'}
								defaultValue={this.props.defaultData.regFlat}
								onBlur={this.onChange('regFlat')}
							/>
						</React.Fragment>
					}
				/>
				<FormControlLabel
					className={this.props.classes.checkFormControl}
					control={<Checkbox color="primary" onChange={this.toggleNeedDormitoryStatus} />}
					label="Нуждаюсь в предоставлении общежития"
				/>
				<FormControlLabel
					className={this.props.classes.checkFormControl}
					control={
						<Checkbox
							color="primary"
							checked={this.props.defaultData.isRegAddressEqualLive}
							onChange={this.toggleLiveAddressStatus}
						/>
					}
					label="Фактический адрес проживания	совпадает с адресом регистрации"
				/>
				{!this.props.defaultData.isRegAddressEqualLive && (
					<div className="flexColumn">
						<H2>Адрес проживания</H2>
						<TextInput
							label={'Индекс'}
							defaultValue={this.props.defaultData.liveIndex}
							placeholder={'Введите индекс'}
							required={true}
							onBlur={this.onChange('liveIndex')}
						/>
						<TextInput
							label={'Область'}
							defaultValue={this.props.defaultData.liveRegion}
							placeholder={'Введите область'}
							required={true}
							onBlur={this.onChange('liveRegion')}
						/>
						<TextInput
							label={'Населенный пункт'}
							defaultValue={this.props.defaultData.liveLocality}
							placeholder={'Введите населенный пункт'}
							required={true}
							onBlur={this.onChange('liveLocality')}
						/>
						<TextInput
							defaultValue={this.props.defaultData.liveStreet}
							label={'Улица'}
							required={true}
							placeholder={'Введите улицу'}
							onBlur={this.onChange('liveStreet')}
						/>
						<TextInput
							defaultValue={this.props.defaultData.liveHome}
							label={'Дом'}
							placeholder={'Введите дом'}
							required
							onBlur={this.onChange('liveHome')}
						/>
						<TextInput
							defaultValue={this.props.defaultData.liveBlock}
							label={'Корпус'}
							onBlur={this.onChange('liveBlock')}
						/>
						<TextInput
							defaultValue={this.props.defaultData.liveFlat}
							label={'Квартира'}
							onBlur={this.onChange('liveFlat')}
						/>
					</div>
				)}

				<TextInput
					disabled={this.props.disabled}
					label={'Электронная почта'}
					defaultValue={this.props.defaultData.email}
					hasError={!!this.props.invalidData.email}
					helperText={this.props.invalidData.email}
					required
					onBlur={this.onChange('email')}
				/>
				<DropdownSelect
					isCleanable={false}
					defaultValue={this.props.defaultData.phoneGovernment}
					onChange={this.onChangeSelectItem}
					title={'Страна оператора сотовой связи'}
					options={governmentDictionary ? governmentDictionary.values : []}
				/>
				<TextInput
					value={this.props.defaultData.mobPhone}
					defaultValue={this.props.defaultData.mobPhone}
					helperText={'Формат: 999 999-99-99'}
					label={'Мобильный телефон'}
					required={true}
					onChange={this.onChangeMobPhone}
				/>
				<TextInput
					label={'Домашний телефон'}
					defaultValue={this.props.defaultData.homePhone}
					onBlur={this.onChange('homePhone')}
				/>
			</div>
		);
	}
}
export default withStyles(styles)(ContactsForm);
