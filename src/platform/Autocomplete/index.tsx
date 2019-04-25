import React from 'react';
import deburr from 'lodash/deburr';
import Autosuggest, { SuggestionSelectedEventData } from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import { IHasError, IHelperText } from '../models';
import { withStyles, createStyles } from '@material-ui/core';
interface IInputProps {
	label?: string;
	placeholder?: string;
	onChange: (data: string, index?: number) => void;
	classes: any;
}
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

interface IAutoCompleteProps extends IInputProps, IHasError, IHelperText {
	suggestions: string[];
	required?: boolean;
	defaultValue: string;
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
const localStyles = {
	asterisk: {
		color: 'red',
	},

	container: {
		position: 'relative' as any,
	},
	suggestionsContainerOpen: {
		position: 'absolute' as any,
		zIndex: 1,
		left: 0,
		right: 0,
	},
	suggestion: {
		display: 'block',
	},
	suggestionsList: {
		margin: 0,
		padding: 0,
		listStyleType: 'None',
	},
};

class Autocomplete extends React.PureComponent<IAutoCompleteProps, IAutoCompleteState> {
	public defaultProps = {
		suggestions: [],
		classes: {},
		defaultValue: '',
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
		const index = this.props.suggestions.findIndex(item => item == data.suggestion) || 0;
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
						required: inputProps.required,
						styles: this.props.classes,
						label: inputProps.label,
						placeholder: inputProps.placeholder,
						value: this.state.value,
						onChange: this.handleChange,
						helperText: this.props.helperText,
						error: this.props.hasError,
					}}
					// @ts-ignore
					theme={{
						container: this.props.classes.container,
						suggestionsContainerOpen: this.props.classes.suggestionsContainerOpen,
						suggestionsList: this.props.classes.suggestionsList,
						suggestion: this.props.classes.suggestion,
					}}
					focusInputOnSuggestionClick={false}
					renderSuggestionsContainer={renderSuggestionsContainer}
					onSuggestionSelected={this.onSelectSuggestion}
				/>
			</div>
		);
	}
}

export default withStyles(localStyles)(Autocomplete);
