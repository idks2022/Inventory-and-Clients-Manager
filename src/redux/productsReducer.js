import { FETCH_PRODUCTS } from "./actionTypes";

const initialState = {
    products: {},
};

const productsReducer = (state=initialState, action) => {
    
    switch (action.type) {
        case FETCH_PRODUCTS:
            console.log('products fetched:', action.payload); 
            return {...state, products: action.payload};
            
        default:
            return state;
    }
}

export default productsReducer;
