import { combineReducers } from 'redux';
import { createReducer } from 'redux-act'

import * as AC from './actions';


export default createReducer(
    {

        [AC.getUserRequest]: (state) => ({
            ...state,
            loading: true,
            data: null,
            error: null
        })
        ,
        [AC.getUserSuccess]: (state, payload) => ({
            ...state,
            loading: false,
            data: payload,
            error: null
        })
    },
    {
        loading: false,
        data: [],
        error: null,
    }
);