import { defaultDocument, IContactsForm } from '$common';
import { submitContactsFormAction } from './actions';
import { createReducer, forAction } from '@black_bird/utils';

const initial: IContactsForm = {
	regDoc: { ...defaultDocument, type: { id: 3, name: 'Регистрация места жительства' } },
	liveDoc: { ...defaultDocument, type: { id: 3, name: 'Регистрация места жительства' } },
	needDormitory: false,
	regLocality: '',
	regIndex: '',
	regHome: '',
	regRegion: '',
	email: '',
	mobPhone: '+7',
	isRegAddressEqualLive: true,
	mobileGovernment: { id: 1, name: 'Россия', phone_code: '7' },
};

const contactsFormReducer = createReducer([forAction(submitContactsFormAction, (state, payload) => payload)], initial);

export default contactsFormReducer;
