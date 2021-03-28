import { IDocument, IUploadDocRequest } from '$common';

import moment from 'moment';
import { PriemApi, PRIEM_API_NAMES } from '$services';

export const uploadFileRest = (file: File) => {
	return PriemApi.uploadDoc(PRIEM_API_NAMES.UploadFiles, {}, file);
};

