import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { currentUser, currentUserInitialState, IUserStore } from '@mgutm-fcu/auth';
import { reducerDictionaries, IDictionaryStore } from '@mgutm-fcu/dictionary';
import { Provider } from 'react-redux';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import App from './App';
import Auth from '@mgutm-fcu/auth/Auth';
import Dictionary from '@mgutm-fcu/dictionary/Dictionary';
import { EDictionaryNameList } from './common/';
import { IDictionaryPersonDocTypeFilter } from './common';
interface PriemOwlState extends IUserStore, IDictionaryStore {}
const state = combineReducers<PriemOwlState>({
	...currentUser,
	...reducerDictionaries,
});
const store = createStore(state, { ...currentUserInitialState, dictionaries: {} }, applyMiddleware(thunk));

ReactDOM.render(
	<Provider store={store}>
		<Auth
			auth={{ url: '/dev-bin/priem_login' }}
			title="Приемная кампания"
			user={{ url: '/dev-bin/priem_api.fcgi', api: 'user' }}>
			<Dictionary
				url={'/dev-bin/priem_dictionary.fcgi?dict=raw'}
				list={[
					{ table: 'directory_filial', columns: ['id', 'name'] },
					{ table: EDictionaryNameList.Goverments, columns: ['id', 'name'] },
					{
						name: EDictionaryNameList.PersonDocTypes,
						table: 'directory_doc_subtypes',
						columns: ['id', 'name', 'type'],
						filter: (item: IDictionaryPersonDocTypeFilter) => item.type === 1,
					},
					{
						name: EDictionaryNameList.FirstNames,
						table: 'directory_names',
						columns: ['id', 'name', 'type', 'sex'],
						filter: (item: IDictionaryPersonDocTypeFilter) => item.type === 0,
					},
					{
						name: EDictionaryNameList.MiddleNames,
						table: 'directory_names',
						columns: ['id', 'name', 'type', 'sex'],
						filter: (item: IDictionaryPersonDocTypeFilter) => item.type === 1,
					},
				]}>
				<App />
			</Dictionary>
		</Auth>
	</Provider>,
	document.getElementById('root') as HTMLElement,
);
