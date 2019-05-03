import { combineReducers } from 'redux';
import reducerDictionaries from '@mgutm-fcu/dictionary/reducer';
import { enrollReducer } from '$containers';
import { IPagesState, IRootState } from './models';

const reducers = combineReducers<any>({
	dictionaries: reducerDictionaries,
	enroll: enrollReducer,
});

export default reducers;
