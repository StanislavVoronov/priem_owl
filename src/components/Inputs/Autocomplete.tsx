import React, { ReactText } from 'react';
import deburr from 'lodash/deburr';
import Autosuggest, { SuggestionSelectedEventData } from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import TextField, { BaseTextFieldProps } from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import { IHasError, IHelperText } from '../models';
import { Omit, withStyles } from '@material-ui/core';
import styles from './styles';

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
	defaultValue: ReactText;
	disabled: boolean;
	classes: any;
	label: string;
	placeholder: string;
	onChange: (value: string, index?: number) => void;
	helperText?: string;
	error?: boolean;
	name?: string;
	maxLength?: number;
}

interface IAutoCompleteState {
	value: ReactText;
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
	public defaultProps = {
		suggestions: [],
		classes: {},
		defaultValue: '',
		disabled: false,
		name: '',
		label: '',
		placeholder: '',
		error: false,
		helperText: '',
		maxLength: -1,
	};
	public state = {
		value: this.props.defaultValue,
		suggestions: [],
	};

	public handleSuggestionsFetchRequested = ({ value }: { value: string }) => {
		this.setState({
			suggestions: getSuggestions(value, this.props.suggestions),
		});
	};

	public handleSuggestionsClearRequested = () => {
		this.setState({
			suggestions: [],
		});
	};
	public handleChange = (event: any, { newValue }: { newValue: string }) => {
		this.setState({
			value: newValue,
		});
		this.props.onChange(newValue);
	};

	public onSelectSuggestion = (event: any, data: SuggestionSelectedEventData<string>) => {
		const index = this.props.suggestions.findIndex(item => item === data.suggestion) || 0;
		this.setState(state => {
			return { ...state, value: data.suggestion };
		});
		this.props.onChange(data.suggestion, index);
	};
	public render() {
		const autosuggestProps = {
			renderInputComponent,
			suggestions: this.state.suggestions,
			onSuggestionsFetchRequested: this.handleSuggestionsFetchRequested,
			onSuggestionsClearRequested: this.handleSuggestionsClearRequested,
			getSuggestionValue,
			renderSuggestion,
		};
		const { suggestions, ...inputProps } = this.props;

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
						value: this.state.value as string,
						onChange: this.handleChange,
						helperText: this.props.helperText,
						error: this.props.error,
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
					onSuggestionSelected={this.onSelectSuggestion}
				/>
			</div>
		);
	}
}

export default withStyles(styles)(Autocomplete);
