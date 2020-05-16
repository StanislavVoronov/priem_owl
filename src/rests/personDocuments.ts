import { PriemApi, PRIEM_API_NAMES } from '$services';
import { IDocument, IRemoteDocument } from '$common';

export const personDocumentsRest = () => {
	return PriemApi.select<never, IRemoteDocument[]>(PRIEM_API_NAMES.PersonDocuments);
};
