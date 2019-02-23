import { IPersonData } from './models';
import { ThunkAction } from 'redux-thunk';
import { IRootState } from '../../common';
import { Action } from 'redux';

const submitPersonData = (data: IPersonData): ThunkAction<void, IRootState, void, Action> => (dispatch, getState) => {};
