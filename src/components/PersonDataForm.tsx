import React from 'react';
import { Autocomplete, RadioGroupButton, TextField, DocDataForm, Select, FormControl, FormLabel } from '../platform/';
import { IState, EMarginSpaceType } from '../models';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

interface IPersonDataState {
	firstName: string;
	lastName: string;
	middleName: string;
	gender: string;
	birthday: string;
	personDocSeries: string;
	personDocNumber: string;
	personDocDate: string;
	personDocIssued: string;
	personDocCodeDepartment: string;
}
class PersonDataForm extends React.PureComponent {
	state = {
		gender: '',
		birthday: '',
		personDocSeries: '',
		personDocNumber: '',
		personDocDate: '',
		personDocIssued: '',
		personDocCodeDepartment: '',
	};
	onChangePersonSeries = (event: any) => {
		this.setState(() => ({ personDocSeries: event.target.value }));
	};
	onChangePersonNumber = (event: any) => {
		this.setState(() => ({ personDocNumber: event.target.value }));
	};
	onChangePersonDate = (event: any) => {
		this.setState(() => ({ personDocDate: event.target.value }));
	};
	onChangePersonIssued = (event: any) => {
		this.setState(() => ({ personDocIssued: event.target.value }));
	};
	onChangePersonCodeDepartment = (event: any) => {
		this.setState(() => ({ personDocCodeDepartment: event.target.value }));
	};
	onChangeGender = (_: any, gender: string) => {
		this.setState(() => ({ gender }));
	};
	onChangeBirthday = (event: any) => {
		this.setState(() => ({ birthday: event.target.value }));
	};
	public render() {
		return (
			<div>
				<Autocomplete suggestions={[]} label={'Фамилия'} margin={EMarginSpaceType.Dense} />
				<Autocomplete suggestions={[]} label={'Имя'} margin={EMarginSpaceType.Dense} />
				<RadioGroupButton
					title="Пол"
					values={[{ value: '2', label: 'Муж.' }, { value: '1', label: 'Жен.' }]}
					currentValue={this.state.gender}
					onChange={this.onChangeGender}
				/>
				<TextField
					label="Дата рождения"
					type="date"
					onChange={this.onChangeBirthday}
					defaultValue={new Date().toDateString()}
					InputLabelProps={{
						shrink: true,
					}}
				/>
				<FormControl>
					<FormLabel>{'Гражданство'}</FormLabel>
					<Select
						className="basic-single"
						classNamePrefix="select"
						defaultValue={undefined}
						isClearable={true}
						isSearchable={true}
						name="color"
						options={[]}
					/>
				</FormControl>
				<FormControl>
					<FormLabel>{'Тип документа удостоверяющего личность'}</FormLabel>
					<Select
						className="basic-single"
						classNamePrefix="select"
						defaultValue={undefined}
						isClearable={true}
						isSearchable={true}
						name="color"
						options={[]}
					/>
				</FormControl>
				<DocDataForm
					requireSeries={false}
					series={this.state.personDocSeries}
					number={this.state.personDocNumber}
					date={this.state.personDocDate}
					issued={this.state.personDocIssued}
					onChangeSeries={this.onChangePersonSeries}
					onChangeNumber={this.onChangePersonNumber}
					onChangeDate={this.onChangePersonDate}
					onChangeIssued={this.onChangePersonIssued}
				/>
				<TextField label="Код подразделения" onChange={this.onChangePersonCodeDepartment} />
			</div>
		);
	}
}

const mapStateToProps = (_: IState) => {
	return {};
};

const mapDispatchToProps = (_: Dispatch) => {
	return {};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(PersonDataForm);
