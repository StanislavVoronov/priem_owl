import { createAction } from '@black_bird/utils';

export const initAction = createAction('ENROLL/INIT');

export const navigateToStep = createAction<number>('NAVIGATE_TO_STEP');

export const goToNextStep = createAction('GO_TO_NEXT_STEP');
