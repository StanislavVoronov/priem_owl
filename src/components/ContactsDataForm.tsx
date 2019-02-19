import React from 'react';
import { TextInput, H2, DropdownSelect, FormControlLabel, Checkbox, DocDataForm } from '../platform';
import { composeStyles, IContactDataState, IDataChanged, makeVerticalSpace, Styles } from '../common/';
import { IDictionary } from '@mgutm-fcu/dictionary';
const styles = {
	checkFormControlLabel: { justifyContent: 'flex-end', marginLeft: 0 },
};

interface IContactDataForm extends IDataChanged, IContactDataState {
	dictionaryGovernments: IDictionary[];
}
const ContactsDataForm = (props: IContactDataForm) => {
	let maskMobPhone = props.mobPhone;
	if (props.mobCountry.phone_code) {
		const mobPhoneValue: string[] | null = props.mobPhone
			.replace(/\D/g, '')
			.substring(`${props.mobCountry.phone_code}`.length)
			.match(/(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
		const phoneCode = props.mobCountry ? `+${props.mobCountry.phone_code}` : '';
		maskMobPhone =
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
	}

	//TODO Нуждаюсь в предоставлении общежития, Фактический адрес проживания добавить
	return (
		<div style={composeStyles(Styles.flexColumn)}>
			<div style={composeStyles(Styles.flexColumn, makeVerticalSpace('small'))}>
				<H2>Адрес регистрации</H2>
				<TextInput
					label={'Индекс'}
					type="number"
					placeholder={'Введите индекс'}
					required
					onBlur={props.onChangeData('regIndex')}
				/>
				<TextInput
					label={'Область'}
					placeholder={'Введите область'}
					required
					onBlur={props.onChangeData('regRegion')}
				/>
				<TextInput
					label={'Населенный пункт'}
					placeholder={'Введите населенный пункт'}
					required
					onBlur={props.onChangeData('regLocality')}
				/>
				<TextInput label={'Улица'} placeholder={'Введите улицу'} required onBlur={props.onChangeData('regStreet')} />
				<TextInput label={'Дом'} placeholder={'Введите дом'} required onBlur={props.onChangeData('regHome')} />
				<TextInput label={'Корпус'} onBlur={props.onChangeData('regBlock')} />
				<TextInput label={'Квартира'} onBlur={props.onChangeData('regFlat')} />
			</div>
			<FormControlLabel
				style={styles.checkFormControlLabel}
				control={
					<Checkbox
						color="primary"
						checked={props.isRegAddressEqualLive}
						onChange={(event, checked) => props.onChangeData('isRegAddressEqualLive')(checked)}
					/>
				}
				label="Фактический адрес проживания	совпадает с адресом регистрации"
				labelPlacement="start"
			/>
			{/*<DocDataForm onChangeData={props.onChangeData} docFile={props.docFile} isNeedData={false} />*/}
			{!props.isRegAddressEqualLive && (
				<div style={composeStyles(Styles.flexColumn, makeVerticalSpace('small'))}>
					<H2>Адрес проживания</H2>
					<TextInput
						label={'Индекс'}
						placeholder={'Введите индекс'}
						required
						onBlur={props.onChangeData('liveIndex')}
					/>
					<TextInput
						label={'Область'}
						placeholder={'Введите область'}
						required
						onBlur={props.onChangeData('liveRegion')}
					/>
					<TextInput
						label={'Населенный пункт'}
						placeholder={'Введите населенный пункт'}
						required
						onBlur={props.onChangeData('liveLocality')}
					/>
					<TextInput label={'Улица'} required placeholder={'Введите улицу'} onBlur={props.onChangeData('liveStreet')} />
					<TextInput label={'Дом'} placeholder={'Введите дом'} required onBlur={props.onChangeData('liveHome')} />
					<TextInput label={'Корпус'} onBlur={props.onChangeData('liveBlock')} />
					<TextInput label={'Квартира'} onBlur={props.onChangeData('liveFlat')} />
				</div>
			)}
			<FormControlLabel
				style={styles.checkFormControlLabel}
				control={
					<Checkbox
						color="primary"
						checked={props.needDormitory}
						onChange={(event, checked) => props.onChangeData('needDormitory')(checked)}
					/>
				}
				label="Нуждаюсь в предоставлении общежития"
				labelPlacement="start"
			/>
			<DropdownSelect
				isClearable={false}
				defaultValue={props.dictionaryGovernments.length && props.mobCountry}
				onChangeSelect={props.onChangeData('mobCountry')}
				title={'Страна оператора сотовой связи'}
				options={props.dictionaryGovernments}
			/>
			<TextInput
				value={maskMobPhone}
				placeholder={'555-555-55-55'}
				label={'Мобильный телефон'}
				required
				onChange={props.onChangeData('mobPhone')}
			/>
			<TextInput
				label={'Электронная почта'}
				placeholder={'Введите электронную почту'}
				required
				onBlur={props.onChangeData('email')}
			/>
			<TextInput label={'Домашний телефон'} onBlur={props.onChangeData('mobPhone')} />
		</div>
	);
};
export default ContactsDataForm;
