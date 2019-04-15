import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { currentUser, currentUserInitialState, IUserStore } from '@mgutm-fcu/auth';
import { IDictionaryStore, reducerDictionaries } from '@mgutm-fcu/dictionary';
import { Provider } from 'react-redux';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import Auth from '@mgutm-fcu/auth/Auth';
import EnrollContainer, { enrollReducer, IEnrollFetchingDataReducer } from './containers/Enroll';
interface PriemOwnState extends IUserStore, IDictionaryStore {
	enroll: IEnrollFetchingDataReducer;
}

const state = combineReducers<PriemOwnState>({
	...currentUser,
	...reducerDictionaries,
	...enrollReducer,
});
const store = createStore(state, { ...currentUserInitialState, dictionaries: {} }, applyMiddleware(thunk));

ReactDOM.render(
	<Provider store={store}>
		<Auth
			auth={{ url: '/dev-bin/priem_login' }}
			title="Приемная кампания"
			user={{ url: '/dev-bin/priem_api.fcgi', api: 'user' }}>
			<EnrollContainer />
		</Auth>
	</Provider>,
	document.getElementById('root') as HTMLElement,
);
