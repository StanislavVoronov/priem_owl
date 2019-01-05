import React from 'react';
import deburr from 'lodash/deburr';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import { EMarginSpaceType } from '../models/';
interface IInputProps {
	label?: string;
	placeholder?: string;
}
function renderInputComponent(inputProps: IInputProps) {
	return <TextField fullWidth={true} {...inputProps} />;
}

function renderSuggestion(suggestion: string, { query, isHighlighted }: { query: string; isHighlighted: boolean }) {
	const matches = match(suggestion, query);
	const parts = parse(suggestion, matches);

	return (
		<MenuItem selected={isHighlighted} component="div">
			<div>
				{parts.map((part: any, index: number) => {
					return part.highlight ? (
						<span key={String(index)} style={{ fontWeight: 500 }}>
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
	margin?: EMarginSpaceType;
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

	public handleChange = (name: string) => (event: any, { newValue }: { newValue: string }) => {
		this.setState({
			single: newValue,
		});
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
						...inputProps,
						value: this.state.single,
						onChange: this.handleChange('single'),
					}}
					// @ts-ignore
					theme={{
						container: styles.container,
						suggestionsContainerOpen: styles.suggestionsContainerOpen,
						suggestionsList: styles.suggestionsList,
						suggestion: styles.suggestion,
					}}
					renderSuggestionsContainer={renderSuggestionsContainer}
				/>
			</div>
		);
	}
}

export default Autocomplete;
