import { PriemApi, PRIEM_API_NAMES } from '$services';
import { IDocument, IPersonDocument } from '$common';

export const personDocumentsRest = () => {
	return PriemApi.select<never, IPersonDocument[]>(PRIEM_API_NAMES.PersonDocuments);
};
