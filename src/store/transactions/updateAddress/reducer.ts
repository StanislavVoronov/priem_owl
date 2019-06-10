import { updateAddressActions, createTransactionReducer } from '$common';
import { ITransactionState } from '$store';
import { combineActions, handleActions } from 'redux-actions';

const updateAddressReducer = createTransactionReducer(updateAddressActions);

export const updateAddressSelectorById = (state: ITransactionState, id: number) => {
	return state.updateAddress[id];
};

const updateAddressesReducer = handleActions(
	{
		// @ts-ignore
		[combineActions(updateAddressActions.request, updateAddressActions.success, updateAddressActions.failure)]: (
			state: any,
			action: any,
		) => {
			if (!(action.payload && action.payload.id)) {
				return state;
			}

			return {
				...state,
				[action.payload.id]: updateAddressReducer(state[action.payload.id], action),
			};
		},
	},
	{},
);

export default updateAddressesReducer;
