import React from 'react';
import { connect } from 'react-redux';


export default connect(
    (state) => ({name: state.name})
)(
    ({ name }) => (
        <h1>Why hello {name}</h1>
    )
)