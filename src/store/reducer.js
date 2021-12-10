import { SET_USER } from './actions';

function setUser(state, action) {
    return {
        ...state,
        user: action.payload,
        }
}

const reducer = (state = { user: null }, action) => {
    switch (action.type) {
        case SET_USER: return setUser(state, action);
        default: return state;
    }
};

export default reducer;