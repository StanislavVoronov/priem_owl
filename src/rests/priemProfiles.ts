import { PriemApi, PRIEM_API_NAMES } from '$services';

interface IPriemProfilesResponse {
	ID: number;
	NAME: string;
}

interface IPayload {
	filial: number;
	inst: number;
	dir: number;
	noPayForms: number[];
	admType: number;
}

export const priemProfilesRest = ({ filial, inst, dir, noPayForms, admType }: IPayload) => {
	const payload = {
		filial,
		inst,
		dir,
		noPayForms,
		admType,
	};

	return PriemApi.selectList<IPayload, IPriemProfilesResponse>(
		PRIEM_API_NAMES.FetchPriemProfiles,
		payload,
	);
};
