import { combineReducers } from 'redux';
import authReducer from './authSlice';
import ordersReducer from './ordersSlice';

export default combineReducers({
  auth: authReducer,
  orders: ordersReducer,
});
