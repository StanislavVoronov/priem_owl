import React, { ChangeEvent } from 'react';
import deburr from 'lodash/deburr';
import Autosuggest, { SuggestionSelectedEventData } from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core';
import styles from './styles';
import { Field, FieldProps, FormikHandlers, FormikProps } from 'formik';
import { noop } from 'lodash';
import { has, propEq, prop } from '$common';

function renderInputComponent(inputProps: any) {
	return (
		<TextField
			{...inputProps}
			InputLabelProps={{
				FormLabelClasses: inputProps.styles,
				shrink: true,
			}}
			margin="normal"
			fullWidth={true}
		/>
	);
}

function renderSuggestion(suggestion: string, { query, isHighlighted }: { query: string; isHighlighted: boolean }) {
	const matches = match(suggestion, query);
	const parts = parse(suggestion, matches);

	return (
		<MenuItem selected={isHighlighted} component="div">
			<div>
				{parts.map((part: any, index: number) => {
					return part.highlight ? (
						<span key={String(index)} style={{ fontWeight: 'bold' }}>
							{part.text}
						</span>
					) : (
						<strong key={String(index)} style={{ fontWeight: 300 }}>
							{part.text}
						</strong>
					);
				})}
			</div>
		</MenuItem>
	);
}

function getSuggestions(value: string, suggestions: string[]) {
	const inputValue = deburr(value.trim()).toLowerCase();
	const inputLength = inputValue.length;
	let count = 0;

	return inputLength === 0
		? []
		: suggestions.filter(suggestion => {
				const keep = count < 5 && suggestion.slice(0, inputLength).toLowerCase() === inputValue;

				if (keep) {
					count += 1;
				}

				return keep;
		  });
}

function getSuggestionValue(suggestion: string) {
	return suggestion;
}

interface IAutoCompleteProps {
	suggestions: string[];
	required?: boolean;
	disabled: boolean;
	classes: any;
	label: string;
	placeholder: string;
	helperText?: string;
	name: string;
	maxLength?: number;
	validate: (value: string) => string | void;
	onSelect: (value: string) => void;
}

interface IAutoCompleteState {
	suggestions: string[];
}

const renderSuggestionsContainer = (options: any) => {
	return (
		<Paper {...options.containerProps} square={true}>
			{options.children}
		</Paper>
	);
};

class Autocomplete extends React.PureComponent<IAutoCompleteProps, IAutoCompleteState> {
	static defaultProps = {
		suggestions: [],
		classes: {},
		required: false,
		validate: noop,
		disabled: false,
		onSelect: noop,
	};
	state = {
		suggestions: [],
	};

	handleSuggestionsFetchRequested = ({ value }: { value: string }) => {
		this.setState({
			suggestions: getSuggestions(value, this.props.suggestions),
		});
	};

	handleSuggestionsClearRequested = () => {
		this.setState({
			suggestions: [],
		});
	};

	onSelectSuggestion = (form: FormikProps<any>) => (
		formEvent: React.FormEvent<HTMLInputElement>,
		data: SuggestionSelectedEventData<string>,
	) => {
		form.setFieldValue(this.props.name, data.suggestion);
		this.props.onSelect(data.suggestion);
		form.validateField(this.props.name);
	};
	onBlur = ({ field, form }: FieldProps) => () => {
		form.validateField(field.name);
	};
	renderAutoSuggest = (props: FieldProps) => {
		const { form, field } = props;
		const touched = has(field.name);

		const autosuggestProps = {
			renderInputComponent,
			suggestions: this.state.suggestions,
			onSuggestionsFetchRequested: this.handleSuggestionsFetchRequested,
			onSuggestionsClearRequested: this.handleSuggestionsClearRequested,
			getSuggestionValue,
			renderSuggestion,
		};
		const { ...inputProps } = this.props;

		return (
			<div>
				<Autosuggest
					{...autosuggestProps}
					inputProps={{
						name: this.props.name,
						maxLength: this.props.maxLength,
						required: inputProps.required,
						styles: this.props.classes,
						label: inputProps.label,
						placeholder: inputProps.placeholder,
						value: field.value,
						onBlur: this.onBlur(props),
						onChange: field.onChange,
						error: touched && !propEq(field.name, void 0, form.errors),
						helperText: (touched && prop(field.name, form.errors)) || this.props.helperText,
						disabled: this.props.disabled,
					}}
					// @ts-ignore
					theme={{
						container: this.props.classes.container,
						suggestionsContainerOpen: this.props.classes.suggestionsContainerOpen,
						suggestionsList: this.props.classes.suggestionsList,
						suggestion: this.props.classes.suggestionContainer,
					}}
					focusInputOnSuggestionClick={false}
					renderSuggestionsContainer={renderSuggestionsContainer}
					onSuggestionSelected={this.onSelectSuggestion(form)}
				/>
			</div>
		);
	};
	render() {
		return <Field name={this.props.name} validate={this.props.validate} render={this.renderAutoSuggest} />;
	}
}

export default withStyles(styles)(Autocomplete);
