import React from 'react';
import { Autocomplete, RadioGroupButton, TextField, FormControl, Select, FormLabel } from '../platform/';
import { IState, EMarginSpaceType } from '../models';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';

interface IPersonDataState {
	firstName: string;
	lastName: string;
	middleName: string;
	gender: string;
	birthday: string;
}
class PersonDataForm extends React.PureComponent {
	state = {
		gender: '',
		birthday: '',
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
					<FormLabel>{props.title}</FormLabel>
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
