import { IEnrollState } from '../containers/Enroll';
import { IDictionaryState } from '@mgutm-fcu/dictionary/models';

export interface IPagesState {
	enroll: IEnrollState;
}
export interface IRootState {
	dictionaries: IDictionaryState;
	enroll: IEnrollState;
}
