export interface IDictionary {
	id: number;
	name: string;
	type?: number;
}

export interface IFistNameDictionary extends IDictionary {
	type: number;
	sex: number;
}
