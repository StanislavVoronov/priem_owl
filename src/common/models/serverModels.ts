export interface IServerResponseResult<T> {
	result: T[];
}

export interface IServerError {
	message: string;
	type?: string;
}
