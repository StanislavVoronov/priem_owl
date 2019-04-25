import React from 'react';
import { TextInput, H2, DropdownSelect, FormControlLabel, Checkbox, DocDataForm } from '../../../platform';
import { EDictionaryNameList, makeVerticalSpace, inValidateDataForm, IGovernmentSelectItem } from '../../../common';
import { IContactDataForm } from '../models';
import Button from '@material-ui/core/Button';
import styles from './styles.css';
import { defaultContactsDataForm } from '../defaults';
import { DictionaryContext } from '../EnrollContainer';

interface IOwnProps {
	submit(data: any): void;
}
type IProps = IOwnProps;
interface IState extends IContactDataForm {
	phoneGovernment: IGovernmentSelectItem;
}
class ContactsDataForm extends React.PureComponent<IProps, IState> {
	state: IState = defaultContactsDataForm;

	onChangeTextField = (name: string) => (value: string) => {
		this.setState(state => ({ ...state, [name]: value }));
	};
	toggleLiveAddressStatus = () => {
		this.setState(state => ({ ...state, isRegAddressEqualLive: !state.isRegAddressEqualLive }));
	};
	toggleNeedDormitoryStatus = () => {
		this.setState(state => ({ ...state, needDormitory: !state.needDormitory }));
	};
	onChangeSelectItem = (item: IGovernmentSelectItem) => {
		const phoneNumber = this.state.mobPhone.substr(this.state.phoneGovernment.phone_code.length + 1);
		const maskedMobPhone = `+${item.phone_code}${phoneNumber}`;
		this.setState({ mobPhone: maskedMobPhone, phoneGovernment: item });
	};
	onChangeMobPhone = (value: string) => {
		const mobPhoneValue: string[] | null = value
			.replace(/\D/g, '')
			.substring(`${this.state.phoneGovernment.phone_code}`.length)
			.match(/(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
		const phoneCode = `+${this.state.phoneGovernment.phone_code}`;
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
		this.setState(state => ({ ...state, mobPhone: maskMobPhone }));
	};
	onDownloadFile = (doc: File) => {
		this.setState({
			docFile: doc,
		});
	};
	submit = () => {
		this.props.submit(this.state);
	};

	render() {
		return (
			<DictionaryContext.Consumer>
				{dictionaries => {
					const { needDormitory, isRegAddressEqualLive } = this.state;
					const governmentDictionary = dictionaries[EDictionaryNameList.Governments];

					const defaultGovernmentValue =
						governmentDictionary && governmentDictionary.values && governmentDictionary.values[0];

					return (
						<div className={styles.flexColumn}>
							<H2>Адрес регистрации</H2>
							<DocDataForm
								hasNumber={false}
								needInfo={false}
								docTitle="Файл  регистрации места жительства"
								file={this.state.docFile}
								onDownloadFile={this.onDownloadFile}
								extraFields={
									<React.Fragment>
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
									</React.Fragment>
								}
							/>
							<FormControlLabel
								className={styles.checkFormControlLabel}
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
								<div className="flexColumn" style={makeVerticalSpace('normal')}>
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
								className={styles.checkFormControlLabel}
								control={<Checkbox color="primary" checked={needDormitory} onChange={this.toggleNeedDormitoryStatus} />}
								label="Нуждаюсь в предоставлении общежития"
								labelPlacement="start"
							/>
							<TextInput label={'Электронная почта'} required onBlur={this.onChangeTextField('email')} />
							{defaultGovernmentValue && (
								<DropdownSelect
									isClearable={false}
									defaultValue={defaultGovernmentValue}
									onChange={this.onChangeSelectItem}
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
							<div className={styles.nextButtonContainer}>
								<Button
									variant="contained"
									color="primary"
									disabled={
										inValidateDataForm({
											regIndex: this.state.regIndex,
											regRegion: this.state.regRegion,
											regLocality: this.state.regLocality,
											regHome: this.state.regHome,
											docFile: this.state.docFile,
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
			</DictionaryContext.Consumer>
		);
	}
}
export default ContactsDataForm;
