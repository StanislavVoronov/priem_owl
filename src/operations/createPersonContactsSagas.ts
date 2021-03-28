import { sagaEffects } from '@black_bird/utils';
import {
	contactsFormSelector,
	createPersonTransactionActions,
	updateAddressTransactionActions,
	updateLoginTrnActions,
} from '$store';
import { AddressType, IContactsForm } from '$common';

const prepareAddress = (street?: string, home?: string, block?: string, flat?: string) => {
	return `${street ? ', ул. ' + street : ''}${home ? ', д. ' + home : ''}${
		block ? ', кор. ' + block : ''
	}${flat ? ', кв.' + flat : ''}`;
};
export const createPersonContactsSagas = [
	sagaEffects.takeLatest(createPersonTransactionActions.success, function* () {
		const {
			regDoc,
			liveDoc,
			regIndex,
			regRegion,
			regLocality,
			regStreet,
			regHome,
			regBlock,
			regFlat,
			liveBlock,
			liveFlat,
			liveHome,
			liveIndex,
			liveLocality,
			liveRegion,
			liveStreet,
			isRegAddressEqualLive,
			email,
		}: IContactsForm = yield sagaEffects.select(contactsFormSelector);

		const regAddress = `${regIndex}, ${regDoc?.government?.name}${regRegion ? ', ' + regRegion : ''}${
			regLocality ? ', ' + regLocality : ''
		}${prepareAddress(regStreet, regHome, regBlock, regFlat)}`;

		const liveAddress = isRegAddressEqualLive
			? regAddress
			: `${liveIndex}, ${liveDoc?.government?.name}${liveRegion ? ', ' + liveRegion : ''}${
					liveLocality ? ', ' + liveLocality : ''
			  }${prepareAddress(liveStreet, liveHome, liveBlock, liveFlat)}`;

		yield sagaEffects.put(
			updateAddressTransactionActions.trigger({ address: liveAddress, kind: AddressType.Live }),
		);

		yield sagaEffects.put(
			updateAddressTransactionActions.trigger({ address: regAddress, kind: AddressType.Reg }),
		);
	}),
];
