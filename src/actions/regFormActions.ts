import { createAction } from '@black_bird/utils';

const NAMESPACE = 'REG_FORM';

export const createNewLoginAction = createAction(`${NAMESPACE}/CREATE_NEW_LOGIN`);
