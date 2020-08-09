import React from 'react';
import { TextInput, Checkbox, Wrapper, IFormField } from '@black_bird/components';
import { IContactsForm, IDictionary, isEmpty } from '$common';
import { IFormProps } from '@black_bird/components';
import { always, cond, equals, identity, isVoid, ITransaction } from '@black_bird/utils';
import { DocumentForm } from '$components';

interface IProps {
	governmentDictionary: ITransaction<IDictionary[]>;
	form: IFormProps<IContactsForm>;
	// loading: boolean;
	// error: IServerError | null;
}

const ContactsFormView = (props: IProps) => {
	const isRegAddressEqualLive = props.form.values.isRegAddressEqualLive;
	const { form, governmentDictionary } = props;
	const { values, onChange } = form;

	const onChangeMobPhone = (field: IFormField<string>) => {
		onChange({
			...field,
			value: cond([
				[(value) => value.includes('+7'), identity],
				[(value) => value.includes('+'), (value) => value.replace(/\+|\-/gi, '+7')],
			])(field.value),
		});
	};

	return (
		<>
			<h3>Адрес регистрации</h3>
			<DocumentForm
				name="regDoc"
				onChange={onChange}
				document={values.regDoc}
				governmentTitle={'Страна'}
				dictionaryGovernment={governmentDictionary}
				fileTitle="Файл регистрации места жительства"
				endFields={
					<React.Fragment>
						<TextInput
							onChange={onChange}
							label={'Индекс'}
							type="number"
							placeholder={'Введите индекс'}
							required
							name="regIndex"
						/>
						<TextInput
							onChange={onChange}
							label={'Субъект РФ'}
							helperText={'республика, область, край'}
							placeholder={'Введите адрес'}
							name="regRegion"
						/>
						<TextInput
							onChange={onChange}
							label={'Населенный пункт'}
							placeholder={'Введите населенный пункт'}
							required
							name="regLocality"
						/>
						<TextInput
							onChange={onChange}
							label={'Улица'}
							placeholder={'Введите улицу'}
							required
							name="regStreet"
						/>
						<TextInput
							onChange={onChange}
							label={'Дом'}
							placeholder={'Введите дом'}
							name="regHome"
							required
						/>
						<TextInput onChange={onChange} label={'Корпус'} name="regBlock" />
						<TextInput onChange={onChange} label={'Квартира'} name="regFlat" />
						<Checkbox
							onChange={onChange}
							value={values.needHostel}
							label="Нуждаюсь в предоставлении общежития"
							name="needHostel"
						/>

						<Checkbox
							onChange={onChange}
							value={values.isRegAddressEqualLive}
							name="isRegAddressEqualLive"
							label="Фактический адрес проживания	совпадает с адресом регистрации"
						/>
					</React.Fragment>
				}
			/>

			{!isRegAddressEqualLive && (
				<Wrapper margin="huge">
					<h3>Адрес проживания</h3>
					<DocumentForm
						name="liveDoc"
						onChange={onChange}
						document={values.liveDoc}
						governmentTitle={'Страна'}
						dictionaryGovernment={governmentDictionary}
						fileTitle="Файл временного места жительства"
						endFields={
							<>
								<TextInput
									label={'Индекс'}
									onChange={onChange}
									placeholder={'Введите индекс'}
									name="liveIndex"
									required={!isRegAddressEqualLive}
								/>
								<TextInput
									onChange={onChange}
									label={'Субъект РФ'}
									helperText={'республика, область, край'}
									placeholder={'Введите адрес'}
									name="liveRegion"
								/>
								<TextInput
									onChange={onChange}
									label="Населенный пункт"
									placeholder="Введите населенный пункт"
									name="liveLocality"
									required={!isRegAddressEqualLive}
								/>
								<TextInput
									onChange={onChange}
									label="Улица"
									required={!isRegAddressEqualLive}
									name="liveStreet"
									placeholder="Введите улицу"
								/>
								<TextInput
									onChange={onChange}
									label="Дом"
									name="liveHome"
									placeholder="Введите дом"
									required={!isRegAddressEqualLive}
								/>
								<TextInput onChange={onChange} name="liveBlock" label="Корпус" />
								<TextInput onChange={onChange} name="liveFlat" label="Квартира" />
							</>
						}
					/>
				</Wrapper>
			)}

			<TextInput
				onChange={onChange}
				value={values.email}
				label="Электронная почта"
				name="email"
				helperText="Необходимо для подтверждения учетной записи"
				required
			/>
			{/*<DropdownSelect*/}
			{/*name="countyPhone"*/}
			{/*isCleanable={false}*/}
			{/*title="Страна оператора сотовой связи"*/}
			{/*options={governmentDictionary ? governmentDictionary.values : []}*/}
			{/*/>*/}
			<TextInput
				onChange={onChangeMobPhone}
				value={values.mobPhone}
				name="mobPhone"
				label="Мобильный телефон"
				type="tel"
				helperText="Поддерживаются только российские операторы сотовой связи"
				required
			/>
			<TextInput
				onChange={onChange}
				value={values.homePhone}
				name="homePhone"
				label="Домашний телефон"
			/>
		</>
	);
};

export default ContactsFormView;
