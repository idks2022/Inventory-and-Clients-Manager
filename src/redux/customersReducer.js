import { FETCH_CUSTOMERS } from "./actionTypes";

const initialState = {
    customers: {},
};

const customersReducer = (state=initialState, action) => {
    
    switch (action.type) {
        case FETCH_CUSTOMERS:
            console.log('customers fetched:', action.payload); 
            return {...state, customers: action.payload};         

        default:
            return state;
    }
}

export default customersReducer;
