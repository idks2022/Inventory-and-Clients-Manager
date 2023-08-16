import { SET_SELECTED_CUSTOMER } from './actionTypes';

const initialState = {};

function selectedCustomerReducer(state = initialState, action) {
    switch (action.type) {
        case SET_SELECTED_CUSTOMER:
            return action.payload;
        default:
            return state;
    }
}

export default selectedCustomerReducer;
