import { PriemApi, PRIEM_API_NAMES } from '$services';
import { IDocument } from '$common';

export const personInfoRest = () => {
	return PriemApi.select<never, IDocument[]>(PRIEM_API_NAMES.PersonInfo);
};
