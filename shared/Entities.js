import React from 'react';
import { connect } from 'react-redux';


const Entities = connect(

)(
    () => (
        <h1>Entities</h1>
    )
)

Entities.getInitialProps = async ({ store }) => {
    store.dispatch({ type: 'CHANGE_NAME', payload: 'ENTITIES' });
}

export default Entities;