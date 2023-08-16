import { FETCH_PURCHASES } from "./actionTypes";

const initialState = {
    purchases: [],
};

const purchasesReducer = (state=initialState, action) => {
    
    switch (action.type) {
        case FETCH_PURCHASES:
            console.log('purchases fetched:', action.payload); 
            return {...state, purchases: action.payload};
            
        default:
            return state;
    }
}

export default purchasesReducer;
