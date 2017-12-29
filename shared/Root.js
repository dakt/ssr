import React from 'react';
import { connect } from 'react-redux';


export default connect(
    (state) => ({name: state.name})
)(
    ({ name }) => (
        <h1>Hello {name} !!!</h1>
    )
);