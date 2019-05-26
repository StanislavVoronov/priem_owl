import { handleActions } from 'redux-actions';
import { defaultEnrollContactsForm, IEnrollContactsForm, IForm } from '$common';
import {
	selectMobileGovernment,
	toggleLiveAddressStatus,
	toggleNeedDormitoryStatus,
	updateContactsForm,
	updateRegDocument,
} from './actions';

const enrollContactsFormReducer = handleActions<IForm<IEnrollContactsForm>, any>(
	{
		[updateContactsForm.toString()]: (state, action) => {
			return { ...state, data: { ...state.data, [action.payload!.name]: action.payload!.value } };
		},
		[updateRegDocument.toString()]: (state, action) => {
			return { ...state, data: { ...state.data, regDocument: action.payload } };
		},
		[toggleLiveAddressStatus.toString()]: state => {
			return { ...state, data: { ...state.data, isRegAddressEqualLive: !state.data.isRegAddressEqualLive } };
		},
		[selectMobileGovernment.toString()]: (state, action) => {
			return { ...state, data: { ...state.data, mobileGovernment: action.payload } };
		},
		[toggleNeedDormitoryStatus.toString()]: state => {
			return { ...state, data: { ...state.data, needDormitory: !state.data.needDormitory } };
		},
	},
	{
		data: defaultEnrollContactsForm,
		statusValidation: false,
	},
);

export default enrollContactsFormReducer;
