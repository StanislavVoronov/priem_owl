import { createAction } from '@black_bird/utils';

export const initAction = createAction('ENROLL/INIT');

export const handleNextStep = createAction('HANDLE_NEXT_STEP');

export const gotToStep = createAction<number>('GO_TO_STEP');
