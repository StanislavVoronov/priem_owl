import { checkLoginActions, createTransactionReducer } from '$common';

const checkLoginReducer = createTransactionReducer(checkLoginActions);

export default checkLoginReducer;
