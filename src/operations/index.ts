import { rootSagas } from './sagas';
import { classifiersSagas } from '@black_bird/dictionaries';
export * from './regFormSagas';

export default [...rootSagas, ...classifiersSagas];
