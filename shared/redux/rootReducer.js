export default function(state = { name: 'Darijo' }, action) {

    if (action.type === 'CHANGE_NAME') {
        return { name: action.payload };
    }

    return state;
};