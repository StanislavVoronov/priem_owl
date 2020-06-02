import { PriemApi, PRIEM_API_NAMES } from '$services';
import { IDocument, IPersonInfo } from '$common';

export const personInfoRest = () => {
	return PriemApi.select<never, IPersonInfo>(PRIEM_API_NAMES.PersonInfo);
};
