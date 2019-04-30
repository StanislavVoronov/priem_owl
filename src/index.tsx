import * as React from 'react';
import './root.module.css';
import * as ReactDOM from 'react-dom';
import { IDictionaryStore, reducerDictionaries } from '@mgutm-fcu/dictionary';
import { Provider } from 'react-redux';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import EnrollContainer, { enrollReducer, IEnrollState } from './containers/Enroll';
interface IRootState extends IDictionaryStore {
	enroll: IEnrollState;
}

// @ts-ignore
const state = combineReducers<IRootState>({
	...reducerDictionaries,
	...enrollReducer,
});
const store = createStore(state, applyMiddleware(thunk));

ReactDOM.render(
	<Provider store={store}>
		<EnrollContainer />
	</Provider>,
	document.getElementById('root') as HTMLElement,
);
