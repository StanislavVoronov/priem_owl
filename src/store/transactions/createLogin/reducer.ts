import { createLoginActions, createTransactionReducer } from '$common';

const createLoginReducer = createTransactionReducer(createLoginActions);

export default createLoginReducer;
