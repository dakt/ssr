import { createAction } from "redux-act";


export const getUserRequest = createAction('GET_USERS_REQUEST');
export const getUserSuccess = createAction('GET_USERS_SUCCESS');
export const getUSerFailure = createAction('GET_USERS_FAILURE');