import { rootSagas } from './rootSagas';
import { classifiersSagas } from '@black_bird/dictionaries';

export default [...rootSagas, ...classifiersSagas];
