import React from 'react';
import { TextInput, H2, DropdownSelect, FormControlLabel, Checkbox, DocDataForm } from '../../../platform';
import {
	composeStyles,
	EDictionaryNameList,
	GlobalStyles,
	ISelectItem,
	makeVerticalSpace,
	inValidateDataForm,
} from '../../../common';
import { AppContext } from '../App';
import { IContactDataForm } from '../models';
import Button from '@material-ui/core/Button';
const styles = {
	checkFormControlLabel: { justifyContent: 'flex-end', marginLeft: 0 },
};

interface IOwnProps {
	submit(data: any): void;
}
type IProps = IOwnProps;
interface IState extends IContactDataForm {}
class ContactsDataForm extends React.PureComponent<IProps, IState> {
	state: IState = {
		isRegAddressEqualLive: true,
		needDormitory: false,
		regIndex: '',
		regRegion: '',
		regLocality: '',
		regStreet: '',
		regHome: '',
		regBlock: '',
		regFlat: '',
		liveIndex: '',
		liveLocality: '',
		liveRegion: '',
		liveStreet: '',
		liveBlock: '',
		liveHome: '',
		liveFlat: '',
		homePhone: '',
		phoneCode: '7',
		mobPhone: '+7',
		email: '',
		regDocFile: null,
	};
	onChangeTextField = (name: string) => (value: string) => {
		this.setState(state => ({ ...state, [name]: value }));
	};
	toggleLiveAddressStatus = () => {
		this.setState(state => ({ ...state, isRegAddressEqualLive: !state.isRegAddressEqualLive }));
	};
	toggleNeedDormitoryStatus = () => {
		this.setState(state => ({ ...state, needDormitory: !state.needDormitory }));
	};
	onChangeSelectItem = (item: ISelectItem) => {
		const phoneNumber = this.state.mobPhone.substr(this.state.phoneCode.length + 1);
		const maskedMobPhone = `+${item.phone_code}${phoneNumber}`;
		this.setState({ mobPhone: maskedMobPhone, phoneCode: item.phone_code });
	};
	onChangeMobPhone = (value: string) => {
		const mobPhoneValue: string[] | null = value
			.replace(/\D/g, '')
			.substring(`${this.state.phoneCode}`.length)
			.match(/(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
		const phoneCode = `+${this.state.phoneCode}`;
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
		console.log('value', value);
		this.setState(state => ({ ...state, mobPhone: maskMobPhone }));
	};
	onDownloadFile = (doc: File) => {
		this.setState(state => ({
			...state,
			regDocFile: doc,
		}));
	};
	submit = () => {
		this.props.submit(this.state);
	};

	render() {
		const { needDormitory, isRegAddressEqualLive } = this.state;
		console.log('contactData', {
			regIndex: this.state.regIndex,
			regRegion: this.state.regRegion,
			regLocality: this.state.regLocality,
			regHome: this.state.regHome,
			docFile: this.state.regDocFile,
			mobPhone: this.state.mobPhone.length > 16,
		});
		return (
			<AppContext.Consumer>
				{context => {
					const governmentDictionary = context[EDictionaryNameList.Governments];

					const defaultGovernmentValue =
						governmentDictionary && governmentDictionary.values && governmentDictionary.values[0];
					return (
						<div style={composeStyles(GlobalStyles.flexColumn)}>
							<div style={composeStyles(GlobalStyles.flexColumn, makeVerticalSpace('small'))}>
								<H2>Адрес регистрации</H2>
								<DocDataForm
									hideDataFields
									docTitle="Файл  регистрации места жительства"
									file={this.state.regDocFile}
									onDownloadFile={this.onDownloadFile}
								/>
								<TextInput
									label={'Индекс'}
									type="number"
									placeholder={'Введите индекс'}
									required={true}
									onBlur={this.onChangeTextField('regIndex')}
								/>
								<TextInput
									label={'Область'}
									placeholder={'Введите область'}
									required={true}
									onBlur={this.onChangeTextField('regRegion')}
								/>
								<TextInput
									label={'Населенный пункт'}
									placeholder={'Введите населенный пункт'}
									required={true}
									onBlur={this.onChangeTextField('regLocality')}
								/>
								<TextInput
									label={'Улица'}
									placeholder={'Введите улицу'}
									required={true}
									onBlur={this.onChangeTextField('regStreet')}
								/>
								<TextInput
									label={'Дом'}
									placeholder={'Введите дом'}
									required={true}
									onBlur={this.onChangeTextField('regHome')}
								/>
								<TextInput label={'Корпус'} onBlur={this.onChangeTextField('regBlock')} />
								<TextInput label={'Квартира'} onBlur={this.onChangeTextField('regFlat')} />
							</div>
							<FormControlLabel
								style={styles.checkFormControlLabel}
								control={
									<Checkbox
										color="primary"
										checked={this.state.isRegAddressEqualLive}
										onChange={this.toggleLiveAddressStatus}
									/>
								}
								label="Фактический адрес проживания	совпадает с адресом регистрации"
								labelPlacement="start"
							/>
							{!isRegAddressEqualLive && (
								<div style={composeStyles(GlobalStyles.flexColumn, makeVerticalSpace('small'))}>
									<H2>Адрес проживания</H2>
									<TextInput
										label={'Индекс'}
										placeholder={'Введите индекс'}
										required={true}
										onBlur={this.onChangeTextField('liveIndex')}
									/>
									<TextInput
										label={'Область'}
										placeholder={'Введите область'}
										required={true}
										onBlur={this.onChangeTextField('liveRegion')}
									/>
									<TextInput
										label={'Населенный пункт'}
										placeholder={'Введите населенный пункт'}
										required={true}
										onBlur={this.onChangeTextField('liveLocality')}
									/>
									<TextInput
										label={'Улица'}
										required={true}
										placeholder={'Введите улицу'}
										onBlur={this.onChangeTextField('liveStreet')}
									/>
									<TextInput
										label={'Дом'}
										placeholder={'Введите дом'}
										required={true}
										onBlur={this.onChangeTextField('liveHome')}
									/>
									<TextInput label={'Корпус'} onBlur={this.onChangeTextField('liveBlock')} />
									<TextInput label={'Квартира'} onBlur={this.onChangeTextField('liveFlat')} />
								</div>
							)}
							<FormControlLabel
								style={styles.checkFormControlLabel}
								control={<Checkbox color="primary" checked={needDormitory} onChange={this.toggleNeedDormitoryStatus} />}
								label="Нуждаюсь в предоставлении общежития"
								labelPlacement="start"
							/>
							<TextInput label={'Электронная почта'} required onBlur={this.onChangeTextField('email')} />
							{defaultGovernmentValue && (
								<DropdownSelect
									isClearable={false}
									defaultValue={defaultGovernmentValue}
									onChangeSelect={this.onChangeSelectItem}
									title={'Страна оператора сотовой связи'}
									options={governmentDictionary.values}
								/>
							)}
							<TextInput
								value={this.state.mobPhone}
								defaultValue={this.state.mobPhone}
								helperText={'Формат: 999 999-99-99'}
								label={'Мобильный телефон'}
								required={true}
								onChange={this.onChangeMobPhone}
							/>
							<TextInput label={'Домашний телефон'} onBlur={this.onChangeTextField('homePhone')} />
							<div style={GlobalStyles.buttonNext}>
								<Button
									variant="contained"
									color="primary"
									disabled={
										inValidateDataForm({
											regIndex: this.state.regIndex,
											regRegion: this.state.regRegion,
											regLocality: this.state.regLocality,
											regHome: this.state.regHome,
											docFile: this.state.regDocFile,
											mobPhone: this.state.mobPhone,
										}) ||
										this.state.mobPhone.length <= 16 ||
										!this.state.email.includes('@')
									}
									onClick={this.submit}>
									{'Далее'}
								</Button>
							</div>
						</div>
					);
				}}
			</AppContext.Consumer>
		);
	}
}
export default ContactsDataForm;
