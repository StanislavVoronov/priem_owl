import { rootSagas } from './rootSagas';
import { classifiersSagas } from '@black_bird/dictionaries';
export * from './allSagas';

export default [...rootSagas, ...classifiersSagas];
