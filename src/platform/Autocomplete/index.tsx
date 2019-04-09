import React from 'react';
import deburr from 'lodash/deburr';
import Autosuggest, { SuggestionSelectedEventData } from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import { IHasError, IHelperText } from '../../common/';
import './styles.css';
interface IInputProps {
	label?: string;
	placeholder?: string;
	onChange: (data: string, index?: number) => void;
	style?: any;
}
function renderInputComponent(inputProps: any) {
	return (
		<TextField
			InputLabelProps={{
				shrink: true,
			}}
			fullWidth={true}
			{...inputProps}
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
	public defaultProps = {
		suggestions: [],
	};
	public state = {
		value: '',
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
						style: inputProps.style,
						label: inputProps.label,
						placeholder: inputProps.placeholder,
						value: this.state.value,
						onChange: this.handleChange,
						helperText: this.props.helperText,
						error: this.props.hasError,
					}}
					// @ts-ignore
					theme={{
						container: 'container',
						suggestionsContainerOpen: 'suggestionsContainerOpen',
						suggestionsList: 'suggestionsList',
						suggestion: 'suggestion',
					}}
					focusInputOnSuggestionClick={false}
					renderSuggestionsContainer={renderSuggestionsContainer}
					onSuggestionSelected={this.onSelectSuggestion}
				/>
			</div>
		);
	}
}

export default Autocomplete;
