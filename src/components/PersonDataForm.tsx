import React from 'react';
import { Autocomplete, RadioGroupButton, TextField, DocDataForm, Select, FormControl, FormLabel } from '../platform/';
import { EMarginSpaceType, ITextFieldChange } from '../models';

interface IPersonDataFormProps {
	onChangeGender: (gender: number) => void;
	gender?: string;
	dictionaryGorverments: any[];
	dictionaryPersonDocTypes: any[];
	dictionaryFirstNames: any[];
}
const styles = {
	spaceSelector: {
		marginTop: 16,
		marginBottom: 8,
	},
	spaceTextField: {
		marginTop: 12,
		marginBottom: 6,
	},
};
type IProps = ITextFieldChange & IPersonDataFormProps;
const PersonDataForm = (props: IProps) => {
	return (
		<div style={{ display: 'flex', flexDirection: 'column' }}>
			<TextField
				InputLabelProps={{
					shrink: true,
				}}
				style={styles.spaceTextField}
				label="Фамилия"
				onChange={props.onChangeTextField('lastName')}
			/>
			<Autocomplete
				field="name"
				label={'Имя'}
				onChange={props.onChangeTextField('firstName')}
				placeholder={'Введите имя'}
				style={styles.spaceTextField}
				suggestions={props.dictionaryFirstNames}
			/>
			<Autocomplete
				field="name"
				label={'Отчество'}
				onChange={props.onChangeTextField('middle')}
				placeholder={'Введите отчество'}
				style={styles.spaceTextField}
				suggestions={props.dictionaryFirstNames}
			/>
			<RadioGroupButton
				title="Пол"
				currentValue={props.gender || ''}
				values={[{ value: '2', label: 'Муж.' }, { value: '1', label: 'Жен.' }]}
				onChange={props.onChangeGender}
			/>
			<TextField
				label="Дата рождения"
				style={styles.spaceTextField}
				type="date"
				onChange={props.onChangeTextField('birthday')}
				defaultValue={new Date().toISOString()}
				InputLabelProps={{
					shrink: true,
				}}
			/>
			<FormControl style={styles.spaceSelector}>
				<FormLabel
					style={{
						marginBottom: 8,
						position: 'absolute',
						top: 0,
						left: 0,
						transform: 'translate(0, 1.5px)  scale(0.75)',
					}}>
					{'Гражданство'}
				</FormLabel>
				<Select
					className="basic-single"
					classNamePrefix="select"
					defaultValue={undefined}
					placeholder={'Выберите гражданство'}
					isClearable={true}
					isSearchable={true}
					getOptionLabel={(item: any) => item.name}
					getOptionValue={(item: any) => item.id}
					options={props.dictionaryGorverments}
				/>
			</FormControl>
			<FormControl style={styles.spaceSelector}>
				<FormLabel style={{ marginBottom: 8, transform: 'translate(0, 1.5px)  scale(0.75)' }}>
					{'Тип документа удостоверяющего личность'}
				</FormLabel>
				<Select
					className="basic-single"
					classNamePrefix="select"
					placeholder={'Выберите документ, удостоверающий личность'}
					defaultValue={undefined}
					isClearable={true}
					isSearchable={true}
					getOptionLabel={(item: any) => item.name}
					getOptionValue={(item: any) => item.id}
					options={props.dictionaryPersonDocTypes}
				/>
			</FormControl>
			<DocDataForm requireSeries={false} onChangeTextField={props.onChangeTextField} />
			<TextField
				InputLabelProps={{
					shrink: true,
				}}
				label="Код подразделения"
				style={styles.spaceTextField}
				onChange={props.onChangeTextField('personDocCodeDepartment')}
			/>
		</div>
	);
};

export default PersonDataForm;
