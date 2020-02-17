import { findPersonActions, createTransactionReducer } from '$common';
import { ITransactionState } from '$store';

const findPersonReducer = createTransactionReducer(findPersonActions);

export const isPersonFound = (state: ITransactionState) => {
	const { loading, error, result } = state.findPerson;
	const isFound = Array.isArray(result) && result.length > 0;

	return {
		loading,
		error: isFound
			? {
					message:
						'Абитуриент уже зарегистрирован в системе. Просьба, обратиться в приемную комиссию для подачи заявлений на поступление',
			  }
			: error,
		result: isFound && result[0],
	};
};

export default findPersonReducer;
