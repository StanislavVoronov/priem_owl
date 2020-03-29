import { IAdmDictionaryItem, IAdmGroupItem } from '$common';

export interface IAdmGroup {
	filial: IAdmDictionaryItem;
	inst: IAdmDictionaryItem;
	dir: IAdmDictionaryItem;
	profile: IAdmDictionaryItem;
	educForm: IAdmDictionaryItem;
	payForm: IAdmDictionaryItem;
	educLevel: IAdmDictionaryItem;
	admGroup: IAdmGroupItem;
}
