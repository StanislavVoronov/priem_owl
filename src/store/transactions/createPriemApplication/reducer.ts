import { createPriemApplicationActions, createTransactionReducer } from '$common';
import { combineActions, handleActions } from 'redux-actions';
import { ITransactionState } from '$store';

const createPriemApplicationReducer = createTransactionReducer(createPriemApplicationActions);

export const transactionList = (state: ITransactionState) => {
	return state.createPriemApplications;
};

const createPriemApplicationsReducer = handleActions(
	{
		// @ts-ignore
		[combineActions(
			createPriemApplicationActions.request,
			createPriemApplicationActions.success,
			createPriemApplicationActions.failure,
		)]: (state: any, action: any) => {
			if (!(action.payload && action.payload.id)) {
				return state;
			}
			console.log('state', action, state);

			return {
				...state,
				[action.payload.id]: createPriemApplicationReducer(state[action.payload.id], action),
			};
		},
	},
	{},
);

export default createPriemApplicationsReducer;
