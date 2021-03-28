import { combineActions, createReducer, forAction } from '@black_bird/utils';
import { addNewFiles } from './actions';

const imagesReducer = createReducer<Array<{ id: number; name: string; file: File }>>(
	[forAction(combineActions(addNewFiles), (state, payload) => [...state, payload])],
	[],
);

export default imagesReducer;
