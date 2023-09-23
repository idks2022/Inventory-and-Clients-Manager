import { combineReducers } from 'redux';
import productsReducer from './productsReducer';
import customersReducer from './customersReducer';
import purchasesReducer from './purchasesReducer';
import selectedCustomerReducer from './selectedCustomerReducer';

const rootReducer = combineReducers({
  products: productsReducer,
  customers: customersReducer,
  purchases: purchasesReducer,
  selectedCustomer: selectedCustomerReducer,
});

export default rootReducer;
