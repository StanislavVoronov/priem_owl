import { IDocument, IUploadDocRequest } from '$common';

import moment from 'moment';
import { PriemApi, PRIEM_API_NAMES } from '$services';

export const getFileImageRest = (payload: number) => {
	return PriemApi.downloadFile(PRIEM_API_NAMES.GetImage, { id: payload });
};

