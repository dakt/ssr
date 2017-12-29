import React from 'react';
import { connect } from 'react-redux';

import * as AC from './redux/actions';
import { disbatch } from 'redux-act';


const Entities = connect(
    (state) => ({
        data: state.users.data,
    })
)(
    ({ data }) => (
        <div>
            <h1>Users:</h1>
            <ul>
                {data.map(item => (
                    <li key={item.id}>{item.name}</li>
                ))}
            </ul>
        </div>
    )
);

Entities.getInitialProps = async ({ store }) => {

    await store.dispatch(async (dispatch, getState) => {

        try {
            dispatch(AC.getUserRequest());

            const response = await fetch('https://jsonplaceholder.typicode.com/users');
            const data = await response.json();

            dispatch(AC.getUserSuccess(data));
        } 
        catch (error) {
            dispatch(AC.getUSerFailure());
        }

    });
}

export default Entities;