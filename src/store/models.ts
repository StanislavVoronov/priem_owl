import { DictionaryState } from '@mgutm-fcu/dictionary';
import { IInvalidData, IEnrollRegisterForm } from '$common';

export interface IRootState {
	dictionaries: DictionaryState;
	enrollRegistration: IEnrollRegisterForm;
}
