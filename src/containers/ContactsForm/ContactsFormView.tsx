import React from 'react';
import { TextInput, Checkbox, Column, Wrapper } from '@black_bird/components';
import { IContactsForm, IDictionary } from '$common';
import { IFormProps } from '@black_bird/components';
import { ITransaction } from '@black_bird/utils';
import { DocumentForm, H2 } from '$components';

interface IProps {
	governmentDictionary: ITransaction<IDictionary>;
	form: IFormProps<IContactsForm>;
	// loading: boolean;
	// error: IServerError | null;
}

const ContactsFormView = (props: IProps) => {
	const isRegAddressEqualLive = props.form.values.isRegAddressEqualLive;
	const { form, governmentDictionary } = props;
	const { values, onChange } = form;

	console.log('governmentDictionary', governmentDictionary);

	return (
		<>
			<H2>Адрес регистрации</H2>
			<DocumentForm
				name="regDoc"
				onChange={onChange}
				document={values.regDoc}
				governmentTitle={'Страна'}
				dictionaryGovernment={governmentDictionary && governmentDictionary.result}
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
						<TextInput onChange={onChange} label={'Улица'} placeholder={'Введите улицу'} required name="regStreet" />
						<TextInput onChange={onChange} label={'Дом'} placeholder={'Введите дом'} name="regHome" required />
						<TextInput onChange={onChange} label={'Корпус'} name="regBlock" />
						<TextInput onChange={onChange} label={'Квартира'} name="regFlat" />
						<Checkbox
							onChange={onChange}
							value={values.needDormitory}
							label="Нуждаюсь в предоставлении общежития"
							name="needDormitory"
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
				<Wrapper margin = 'huge'>
					<H2>Адрес проживания</H2>
					<DocumentForm
						name="liveDoc"
						onChange={onChange}
						document={values.liveDoc}
						governmentTitle={'Страна'}
						dictionaryGovernment={governmentDictionary && governmentDictionary.result}
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
			<TextInput onChange={onChange} name="mobPhone" label="Мобильный телефон" required={true} />
			<TextInput onChange={onChange} name="homePhone" label="Домашний телефон" />
		</>
	);
};

export default ContactsFormView;
