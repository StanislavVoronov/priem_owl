import React, { ReactText } from 'react';
import { TextInput, H2, DropdownSelect, FormControlLabel, Checkbox, Button, DocDataForm } from '$components';
import { EDictionaryNameList, inValidateDataForm, IGovernmentSelectItem, inputValueAsString, IDocument } from '$common';
import { IContactDataForm } from '../models';
import styles from './styles.module.css';
import { DictionaryContext } from '../EnrollContainer';

interface IOwnProps {
	defaultData: IContactDataForm;
	submit(data: any): void;
}
type IProps = IOwnProps;
interface IState extends IContactDataForm {
	phoneGovernment: IGovernmentSelectItem;
}
class ContactsDataForm extends React.PureComponent<IProps, IState> {
	state: IState = this.props.defaultData;

	toggleLiveAddressStatus = () => {
		this.setState(state => ({ ...state, isRegAddressEqualLive: !state.isRegAddressEqualLive }));
	};
	toggleNeedDormitoryStatus = () => {
		this.setState(state => ({ ...state, needDormitory: !state.needDormitory }));
	};
	onChangeSelectItem = (item: IGovernmentSelectItem) => {
		const phoneNumber =
			typeof this.state.mobPhone === 'string' &&
			this.state.mobPhone.substr(this.state.phoneGovernment.phone_code.length + 1);
		const maskedMobPhone = `+${item.phone_code}${phoneNumber}`;
		this.setState({ mobPhone: maskedMobPhone, phoneGovernment: item });
	};
	onChangeMobPhone: React.ChangeEventHandler<HTMLInputElement> = event => {
		const mobPhoneValue: string[] | null = inputValueAsString(event)
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
	updateDocument = (document: IDocument) => {
		this.setState({
			document,
		});
	};
	submit = () => {
		this.props.submit(this.state);
	};
	onChangeRegIndex: React.ChangeEventHandler<HTMLInputElement> = event => {
		this.setState({ regIndex: inputValueAsString(event) });
	};
	onChangeRegRegion: React.ChangeEventHandler<HTMLInputElement> = event => {
		this.setState({ regRegion: inputValueAsString(event) });
	};
	onChangeRegLocality: React.ChangeEventHandler<HTMLInputElement> = event => {
		this.setState({ regLocality: inputValueAsString(event) });
	};
	onChangeRegStreet: React.ChangeEventHandler<HTMLInputElement> = event => {
		this.setState({ regStreet: inputValueAsString(event) });
	};
	onChangeRegHome: React.ChangeEventHandler<HTMLInputElement> = event => {
		this.setState({ regHome: inputValueAsString(event) });
	};
	onChangeRegBlock: React.ChangeEventHandler<HTMLInputElement> = event => {
		this.setState({ regBlock: inputValueAsString(event) });
	};
	onChangeRegFlat: React.ChangeEventHandler<HTMLInputElement> = event => {
		this.setState({ regFlat: inputValueAsString(event) });
	};
	onChangeLiveIndex: React.ChangeEventHandler<HTMLInputElement> = event => {
		this.setState({ liveIndex: inputValueAsString(event) });
	};
	onChangeLiveRegion: React.ChangeEventHandler<HTMLInputElement> = event => {
		this.setState({ liveRegion: inputValueAsString(event) });
	};
	onChangeLiveLocality: React.ChangeEventHandler<HTMLInputElement> = event => {
		this.setState({ liveLocality: inputValueAsString(event) });
	};
	onChangeLiveStreet: React.ChangeEventHandler<HTMLInputElement> = event => {
		this.setState({ liveStreet: inputValueAsString(event) });
	};
	onChangeLiveHome: React.ChangeEventHandler<HTMLInputElement> = event => {
		this.setState({ liveHome: inputValueAsString(event) });
	};
	onChangeLiveBlock: React.ChangeEventHandler<HTMLInputElement> = event => {
		this.setState({ liveBlock: inputValueAsString(event) });
	};
	onChangeLiveFlat: React.ChangeEventHandler<HTMLInputElement> = event => {
		this.setState({ liveFlat: inputValueAsString(event) });
	};
	onChangeEmail: React.ChangeEventHandler<HTMLInputElement> = event => {
		this.setState({ email: inputValueAsString(event) });
	};
	onChangeHomePhone: React.ChangeEventHandler<HTMLInputElement> = event => {
		this.setState({ homePhone: inputValueAsString(event) });
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
								document={this.state.document}
								docTitle="Файл  регистрации места жительства"
								updateDocument={this.updateDocument}
								extraFields={
									<React.Fragment>
										<TextInput
											label={'Индекс'}
											type="number"
											placeholder={'Введите индекс'}
											required={true}
											onBlur={this.onChangeRegIndex}
										/>
										<TextInput
											label={'Область'}
											placeholder={'Введите область'}
											required={true}
											onBlur={this.onChangeRegRegion}
										/>
										<TextInput
											label={'Населенный пункт'}
											placeholder={'Введите населенный пункт'}
											required={true}
											onBlur={this.onChangeRegLocality}
										/>
										<TextInput
											label={'Улица'}
											placeholder={'Введите улицу'}
											required={true}
											onBlur={this.onChangeRegStreet}
										/>
										<TextInput
											label={'Дом'}
											placeholder={'Введите дом'}
											required={true}
											onBlur={this.onChangeRegHome}
										/>
										<TextInput label={'Корпус'} onBlur={this.onChangeRegBlock} />
										<TextInput label={'Квартира'} onBlur={this.onChangeRegFlat} />
									</React.Fragment>
								}
							/>
							<FormControlLabel
								classes={{ root: styles.checkFormControl, label: styles.checkFormControlLabel }}
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
								<div className="flexColumn">
									<H2>Адрес проживания</H2>
									<TextInput
										label={'Индекс'}
										placeholder={'Введите индекс'}
										required={true}
										onBlur={this.onChangeLiveIndex}
									/>
									<TextInput
										label={'Область'}
										placeholder={'Введите область'}
										required={true}
										onBlur={this.onChangeLiveRegion}
									/>
									<TextInput
										label={'Населенный пункт'}
										placeholder={'Введите населенный пункт'}
										required={true}
										onBlur={this.onChangeLiveLocality}
									/>
									<TextInput
										label={'Улица'}
										required={true}
										placeholder={'Введите улицу'}
										onBlur={this.onChangeLiveStreet}
									/>
									<TextInput label={'Дом'} placeholder={'Введите дом'} required onBlur={this.onChangeLiveHome} />
									<TextInput label={'Корпус'} onBlur={this.onChangeLiveBlock} />
									<TextInput label={'Квартира'} onBlur={this.onChangeLiveFlat} />
								</div>
							)}
							<FormControlLabel
								classes={{ root: styles.checkFormControl, label: styles.checkFormControlLabel }}
								control={<Checkbox color="primary" checked={needDormitory} onChange={this.toggleNeedDormitoryStatus} />}
								label="Нуждаюсь в предоставлении общежития"
								labelPlacement="start"
							/>
							<TextInput label={'Электронная почта'} required onBlur={this.onChangeEmail} />
							{defaultGovernmentValue && (
								<DropdownSelect
									isCleanable={false}
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
							<TextInput label={'Домашний телефон'} onBlur={this.onChangeHomePhone} />
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
											docFile: this.state.document.docFile,
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
