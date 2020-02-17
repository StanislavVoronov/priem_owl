import { defaultDocument, IContactsForm } from '$common';
import { submitEnrollContactsForm } from './actions';
import { createReducer, forAction } from '@black_bird/utils';

const initial: IContactsForm = {
	...defaultDocument,
	needDormitory: false,
	regLocality: '',
	regIndex: '',
	regHome: '',
	regRegion: '',
	email: '',
	mobPhone: '+7',
	isRegAddressEqualLive: true,
	docType: { id: 3, name: 'Регистрация места жительства' },
	mobileGovernment: { id: 1, name: 'Россия', phone_code: '7' },
};

const contactsFormReducer = createReducer([forAction(submitEnrollContactsForm, (state, payload) => payload)], initial);

export default contactsFormReducer;
