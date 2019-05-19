import React, { ChangeEvent } from 'react';
import deburr from 'lodash/deburr';
import Autosuggest, { SuggestionSelectedEventData } from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import TextField, { BaseTextFieldProps } from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core';
import styles from './styles';
import { noop } from 'react-select/lib/utils';

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
	defaultValue: string;
	disabled: boolean;
	classes: any;
	label: string;
	placeholder: string;
	onChange: (event: ChangeEvent<HTMLInputElement>) => void;
	onBlur: (event: ChangeEvent<HTMLInputElement>) => void;
	helperText?: string;
	error?: boolean;
	name?: string;
	maxLength?: number;
}

interface IAutoCompleteState {
	value: string;
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
		onBlur: noop,
		required: false,
		disabled: false,
	};
	state = {
		value: this.props.defaultValue,
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
	handleChange = (event: ChangeEvent<HTMLInputElement>, { newValue }: { newValue: string }) => {
		this.setState({
			value: newValue,
		});
		this.props.onChange(event);
	};
	onBlur: React.ChangeEventHandler<HTMLInputElement> = event => {
		this.props.onBlur(event);
	};

	onSelectSuggestion = (formEvent: React.FormEvent<HTMLInputElement>, data: SuggestionSelectedEventData<string>) => {
		this.setState(state => {
			return { ...state, value: data.suggestion };
		});
	};
	render() {
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
						value: this.state.value,
						onChange: this.handleChange,
						onBlur: this.onBlur,
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
