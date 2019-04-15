import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { currentUser, currentUserInitialState, IUserStore } from '@mgutm-fcu/auth';
import { IDictionaryStore, reducerDictionaries } from '@mgutm-fcu/dictionary';
import { Provider } from 'react-redux';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import EnrollPage from './containers/Enroll/EnrollPage';
import Auth from '@mgutm-fcu/auth/Auth';
import Dictionary from '@mgutm-fcu/dictionary/Dictionary';
import { EDictionaryNameList, IDictionaryScanableFilter, IDictionaryTypeFilter } from './common/';
import { enrollReducer, IEnrollFetchingDataReducer } from './containers/Enroll';
interface PriemOwlState extends IUserStore, IDictionaryStore {
	enroll: IEnrollFetchingDataReducer;
}

const state = combineReducers<PriemOwlState>({
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
			<Dictionary
				version={2}
				url={'/dev-bin/priem_api.fcgi'}
				list={[
					{
						name: EDictionaryNameList.MiddleNames,
						dictionary: 'directory_names',
						columns: ['id', 'name', 'type', 'sex'],
						filter: (item: IDictionaryTypeFilter) => item.type === 1,
					},
					{
						name: EDictionaryNameList.FirstNames,
						dictionary: 'directory_names',
						columns: ['id', 'name', 'type', 'sex'],
						filter: (item: IDictionaryTypeFilter) => item.type === 0,
					},
					// {
					// 	dictionary: EDictionaryNameList.CoolnessTypes,
					// 	columns: ['id', 'name', 'hidden'],
					// 	filter: item => item !== 1,
					// },
					// { dictionary: EDictionaryNameList.Governments, columns: ['id', 'name', 'phone_code'] },
					// {
					// 	name: EDictionaryNameList.PersonDocTypes,
					// 	dictionary: 'directory_doc_subtypes',
					// 	columns: ['id', 'name', 'type'],
					// 	filter: (item: IDictionaryTypeFilter) => item.type === 1,
					// },
					// {
					// 	dictionary: EDictionaryNameList.DocTypes,
					// 	columns: ['id', 'name', 'scanable', 'need_info'],
					// 	filter: (item: IDictionaryScanableFilter) => item.scanable === 1,
					// },
					// {
					// 	name: EDictionaryNameList.EducationDocTypes,
					// 	dictionary: 'directory_doc_subtypes',
					// 	columns: ['id', 'name', 'type'],
					// 	filter: (item: IDictionaryTypeFilter) => item.type === 2,
					// },
					// {
					// 	name: EDictionaryNameList.FirstNames,
					// 	dictionary: 'directory_names',
					// 	columns: ['id', 'name', 'type', 'sex'],
					// 	filter: (item: IDictionaryTypeFilter) => item.type === 0,
					// },
					//
					// {
					// 	dictionary: EDictionaryNameList.PreviousEducation,
					// 	columns: ['id', 'name'],
					// },
				]}>
				<EnrollPage />
			</Dictionary>
		</Auth>
	</Provider>,
	document.getElementById('root') as HTMLElement,
);
