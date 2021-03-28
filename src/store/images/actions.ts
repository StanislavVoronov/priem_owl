import { createAction } from '@black_bird/utils';

export const addNewFiles = createAction('ADD_NEW_FILES', (file: File, name: string, id: number) => ({
	id,
	file,
	name,
}));
