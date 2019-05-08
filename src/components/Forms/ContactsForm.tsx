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
	data: IContactsForm;
	updateForm: (data: Partial<IContactsForm>) => void;
	invalidData: Partial<IContactsForm>;
}

class ContactsForm extends React.PureComponent<IProps> {
	static defaultProps = {
		disabled: false,
		classes: {},
	};

	onChange = (field: keyof IContactsForm): React.ChangeEventHandler<HTMLInputElement> => event => {
		this.props.updateForm({ [field]: inputValueAsString(event) });
	};

	toggleLiveAddressStatus = (_: any, checked: boolean) => {
		this.props.updateForm({ isRegAddressEqualLive: checked });
	};
	toggleNeedDormitoryStatus = (_: any, checked: boolean) => {
		this.props.updateForm({ needDormitory: checked });
	};
	onChangeSelectItem = (item: IGovernmentSelectItem) => {
		const phoneNumber = this.props.data.mobPhone.substr(this.props.data.phoneGovernment.phone_code.length + 1);
		const maskedMobPhone = `+${item.phone_code}${phoneNumber}`;
		this.props.updateForm({ mobPhone: maskedMobPhone, phoneGovernment: item });
	};
	onChangeMobPhone: React.ChangeEventHandler<HTMLInputElement> = event => {
		const mobPhoneValue: string[] | null = inputValueAsString(event)
			.replace(/\D/g, '')
			.substring(`${this.props.data.phoneGovernment.phone_code}`.length)
			.match(/(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
		const phoneCode = `+${this.props.data.phoneGovernment.phone_code}`;
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

		this.props.updateForm({ mobPhone: maskMobPhone });
	};
	updateDocument = (document: IDocument) => {
		this.props.updateForm({ document });
	};
	render() {
		const governmentDictionary = this.props.dictionaries[EDictionaryNameList.Governments];

		return (
			<div className="flexColumn">
				<H2>Адрес регистрации</H2>
				<DocumentForm
					document={this.props.data.document}
					docTitle="Файл регистрации места жительства"
					updateDocument={this.updateDocument}
					extraFields={
						<React.Fragment>
							<TextInput
								label={'Индекс'}
								defaultValue={this.props.data.regIndex}
								type="number"
								placeholder={'Введите индекс'}
								required={true}
								onBlur={this.onChange('regIndex')}
							/>
							<TextInput
								label={'Область'}
								defaultValue={this.props.data.regRegion}
								placeholder={'Введите область'}
								required={true}
								onBlur={this.onChange('regRegion')}
							/>
							<TextInput
								label={'Населенный пункт'}
								defaultValue={this.props.data.regLocality}
								placeholder={'Введите населенный пункт'}
								required={true}
								onBlur={this.onChange('regLocality')}
							/>
							<TextInput
								label={'Улица'}
								defaultValue={this.props.data.regStreet}
								placeholder={'Введите улицу'}
								required={true}
								onBlur={this.onChange('regStreet')}
							/>
							<TextInput
								label={'Дом'}
								defaultValue={this.props.data.regHome}
								placeholder={'Введите дом'}
								required={true}
								onBlur={this.onChange('regHome')}
							/>
							<TextInput label={'Корпус'} defaultValue={this.props.data.regBlock} onBlur={this.onChange('regBlock')} />
							<TextInput label={'Квартира'} defaultValue={this.props.data.regFlat} onBlur={this.onChange('regFlat')} />
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
							checked={this.props.data.isRegAddressEqualLive}
							onChange={this.toggleLiveAddressStatus}
						/>
					}
					label="Фактический адрес проживания	совпадает с адресом регистрации"
				/>
				{!this.props.data.isRegAddressEqualLive && (
					<div className="flexColumn">
						<H2>Адрес проживания</H2>
						<TextInput
							label={'Индекс'}
							defaultValue={this.props.data.liveIndex}
							placeholder={'Введите индекс'}
							required={true}
							onBlur={this.onChange('liveIndex')}
						/>
						<TextInput
							label={'Область'}
							defaultValue={this.props.data.liveRegion}
							placeholder={'Введите область'}
							required={true}
							onBlur={this.onChange('liveRegion')}
						/>
						<TextInput
							label={'Населенный пункт'}
							defaultValue={this.props.data.liveLocality}
							placeholder={'Введите населенный пункт'}
							required={true}
							onBlur={this.onChange('liveLocality')}
						/>
						<TextInput
							defaultValue={this.props.data.liveStreet}
							label={'Улица'}
							required={true}
							placeholder={'Введите улицу'}
							onBlur={this.onChange('liveStreet')}
						/>
						<TextInput
							defaultValue={this.props.data.liveHome}
							label={'Дом'}
							placeholder={'Введите дом'}
							required
							onBlur={this.onChange('liveHome')}
						/>
						<TextInput defaultValue={this.props.data.liveBlock} label={'Корпус'} onBlur={this.onChange('liveBlock')} />
						<TextInput defaultValue={this.props.data.liveFlat} label={'Квартира'} onBlur={this.onChange('liveFlat')} />
					</div>
				)}

				<TextInput
					disabled={this.props.disabled}
					label={'Электронная почта'}
					defaultValue={this.props.data.email}
					hasError={!!this.props.invalidData.email}
					helperText={this.props.invalidData.email}
					required
					onBlur={this.onChange('email')}
				/>
				<DropdownSelect
					isCleanable={false}
					defaultValue={this.props.data.phoneGovernment}
					onChange={this.onChangeSelectItem}
					title={'Страна оператора сотовой связи'}
					options={governmentDictionary ? governmentDictionary.values : []}
				/>
				<TextInput
					value={this.props.data.mobPhone}
					defaultValue={this.props.data.mobPhone}
					helperText={'Формат: 999 999-99-99'}
					label={'Мобильный телефон'}
					required={true}
					onChange={this.onChangeMobPhone}
				/>
				<TextInput
					label={'Домашний телефон'}
					defaultValue={this.props.data.homePhone}
					onBlur={this.onChange('homePhone')}
				/>
			</div>
		);
	}
}
export default withStyles(styles)(ContactsForm);
