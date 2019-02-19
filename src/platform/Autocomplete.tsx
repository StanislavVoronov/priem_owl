import React from 'react';
import deburr from 'lodash/deburr';
import Autosuggest, { InputProps, SuggestionSelectedEventData } from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import { ISpacable } from '../common/';

interface IInputProps extends ISpacable {
	label?: string;
	placeholder?: string;
	onSelect: (data: string, index?: number) => void;
	onChange: (data: string) => void;
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

const styles = {
	root: {
		display: 'flex',
		flexDirection: 'row',
		flexGrow: 1,
	},
	container: {
		position: 'relative',
	},
	suggestionsContainerOpen: {
		position: 'absolute',
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
		listStyleType: 'none',
	},
};

interface IAutoCompleteProps extends IInputProps {
	suggestions: string[];
	required?: boolean;
}

interface IAutoCompleteState {
	single: string;
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
	defaultProps = {
		suggestions: [],
	};
	public state = {
		single: '',
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
	public onBlur = (event: any) => {
		if (event && event.target && event.target.value) {
			this.props.onChange(event.targer.value);
		}
	};
	public handleChange = (event: any, { newValue }: { newValue: string }) => {
		this.setState({
			single: newValue,
		});
	};
	onSelectSuggestion = (event: any, data: SuggestionSelectedEventData<string>) => {
		const index = this.props.suggestions.findIndex(item => item == data.suggestion) || 0;
		this.props.onSelect(data.suggestion, index);
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
						value: this.state.single,
						onBlur: this.onBlur,
						onChange: this.handleChange,
					}}
					// @ts-ignore
					theme={{
						container: styles.container,
						suggestionsContainerOpen: styles.suggestionsContainerOpen,
						suggestionsList: styles.suggestionsList,
						suggestion: styles.suggestion,
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
