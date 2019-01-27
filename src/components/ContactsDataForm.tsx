import React from 'react';
import { TextInput, H2, FormLabel, DropdownSelect } from '../platform';
import { composeStyles, ISelectChanged, ISelectItem, ITextFieldChanged, makeSpace, Styles } from '../common/';
import { IDictionary } from '@mgutm-fcu/dictionary';

interface IContactDataForm extends ITextFieldChanged, ISelectChanged {
	mobPhone: string;
	mobCountry: ISelectItem;
	needDormitory: boolean;
	isRegAddressEqualLive: boolean;
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
			<div style={composeStyles(Styles.flexColumn, makeSpace('v-small'))}>
				<H2>Адрес регистрации</H2>
				<TextInput
					label={'Индекс'}
					placeholder={'Введите индекс'}
					required
					onBlur={props.onChangeTextField('regIndex')}
				/>
				<TextInput
					label={'Область'}
					placeholder={'Введите область'}
					required
					onBlur={props.onChangeTextField('regRegion')}
				/>
				<TextInput
					label={'Населенный пункт'}
					placeholder={'Введите населенный пункт'}
					required
					onBlur={props.onChangeTextField('regLocality')}
				/>
				<TextInput
					label={'Улица'}
					placeholder={'Введите улицу'}
					required
					onBlur={props.onChangeTextField('regStreet')}
				/>
				<TextInput label={'Дом'} placeholder={'Введите дом'} required onBlur={props.onChangeTextField('regHome')} />
				<TextInput label={'Корпус'} onBlur={props.onChangeTextField('regBlock')} />
				<TextInput label={'Квартира'} onBlur={props.onChangeTextField('regFlat')} />
			</div>
			<div style={composeStyles(Styles.flexColumn, makeSpace('v-small'))}>
				<H2>Адрес проживания</H2>
				<TextInput
					label={'Индекс'}
					placeholder={'Введите индекс'}
					required
					onBlur={props.onChangeTextField('liveIndex')}
				/>
				<TextInput
					label={'Область'}
					placeholder={'Введите область'}
					required
					onBlur={props.onChangeTextField('liveRegion')}
				/>
				<TextInput
					label={'Населенный пункт'}
					placeholder={'Введите населенный пункт'}
					required
					onBlur={props.onChangeTextField('liveLocality')}
				/>
				<TextInput
					label={'Улица'}
					required
					placeholder={'Введите улицу'}
					onBlur={props.onChangeTextField('liveStreet')}
				/>
				<TextInput label={'Дом'} placeholder={'Введите дом'} required onBlur={props.onChangeTextField('liveHome')} />
				<TextInput label={'Корпус'} onBlur={props.onChangeTextField('liveBlock')} />
				<TextInput label={'Квартира'} onBlur={props.onChangeTextField('liveFlat')} />
			</div>

			<DropdownSelect
				isClearable={false}
				defaultValue={props.dictionaryGovernments.length && props.mobCountry}
				onChangeSelect={props.onChangeSelect('mobCountry')}
				title={'Страна оператора сотовой связи'}
				options={props.dictionaryGovernments}
			/>
			<TextInput
				value={maskMobPhone}
				placeholder={'555-555-55-55'}
				label={'Мобильный телефон'}
				required
				onChange={props.onChangeTextField('mobPhone')}
			/>
			<TextInput
				label={'Электронная почта'}
				placeholder={'Введите электронную почту'}
				required
				onBlur={props.onChangeTextField('email')}
			/>
			<TextInput label={'Домашний телефон'} onBlur={props.onChangeTextField('mobPhone')} />
		</div>
	);
};
export default ContactsDataForm;
