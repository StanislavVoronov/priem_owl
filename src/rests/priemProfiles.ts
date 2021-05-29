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
}

export const priemProfilesRest = ({ filial, inst, dir, noPayForms }: IPayload) => {
	const payload = {
		filial,
		inst,
		dir,
		noPayForms,
	};

	return PriemApi.selectList<IPayload, IPriemProfilesResponse>(
		PRIEM_API_NAMES.FetchPriemProfiles,
		payload,
	);
};
