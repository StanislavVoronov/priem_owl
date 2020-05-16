import { isNotEmptyArray } from '@black_bird/utils';
import { IDictionary, IDocument, IRemoteDocument } from './models';

export const documentMapperLocal = (
	document: IRemoteDocument,
	docTypesDictionary: IDictionary[],
): IDocument => {
	const issOrgList =
		document.TYPE === 1 && document.SUBTYPE === 1 ? document.ISS_ORGANISATION.split(' ') : [];
	const regExp = new RegExp('^([0-9]+-)*[0-9]+$\n');
	const codeDepartment = isNotEmptyArray(issOrgList) ? issOrgList[(issOrgList.length = 1)] : '';

	return {
		type: docTypesDictionary.find((item) => item.type === document.TYPE) || null,
		subType: { id: document.SUBTYPE, name: document.SUBTYPE_NAME },
		government: { id: document.ISS_GOVERMENT, name: document.ISS_GOVERMENT_NAME },
		series: document.SERIA,
		num: document.NUM,
		issieBy: document.ISS_ORGANISATION,
		date: document.ISS_DATE,
		file: document.file,
		codeDepartment:
			typeof codeDepartment === 'string' && codeDepartment.search(regExp) !== -1
				? codeDepartment
				: '',
	};
};
