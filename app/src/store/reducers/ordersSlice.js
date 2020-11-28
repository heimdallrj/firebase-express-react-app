import { createSlice } from '@reduxjs/toolkit';

import * as apiOrders from 'api/orders';

// Slice
const authSlice = createSlice({
  name: 'orders',
  initialState: {
    orders: [],
    error: null,
    processing: null,
  },
  reducers: {
    requestInProgress(state) {
      state.processing = true;
    },
    fetchOrdersRequestSuccess(state, { payload }) {
      state.orders = payload;
      state.processing = false;
      state.error = null;
    },
    fetchOrdersRequestFailed(state, { payload }) {
      state.processing = false;
      state.error = payload;
    },
    createOrderRequestSuccess(state, { payload }) {
      const newOrders = state.orders;
      newOrders.push(payload);
      state.orders = newOrders;
      state.processing = false;
      state.error = null;
    },
    createOrderRequestFailed(state, { payload }) {
      state.processing = false;
      state.error = payload;
    },
    updateOrderRequestSuccess(state, { payload }) {
      const { uid: orderId } = payload;
      const filteredOrders = state.orders.filter((o) => o.uid !== orderId);
      const newOrders = filteredOrders;
      newOrders.push(payload);
      state.orders = newOrders;
      state.processing = false;
      state.error = null;
    },
    updateOrderRequestFailed(state, { payload }) {
      state.processing = false;
      state.error = payload;
    },
  },
});

export const {
  requestInProgress,
  fetchOrdersRequestSuccess,
  fetchOrdersRequestFailed,
  createOrderRequestSuccess,
  createOrderRequestFailed,
  updateOrderRequestSuccess,
  updateOrderRequestFailed,
} = authSlice.actions;

export const fetchOrders = (cb = () => {}) => async (dispatch) => {
  dispatch(requestInProgress());

  try {
    const response = await apiOrders.fetchAll();
    const { message: orders } = response;
    dispatch(fetchOrdersRequestSuccess(orders));
    cb(null, orders);
  } catch (err) {
    dispatch(fetchOrdersRequestFailed(err));
    cb(err, null);
  }
};

export const fetchOrder = (orderId, cb = () => {}) => async (dispatch) => {
  dispatch(requestInProgress());

  try {
    const response = await apiOrders.fetch(orderId);
    const { message: order } = response;
    dispatch(fetchOrderRequestSuccess(order));
    cb(null, order);
  } catch (err) {
    dispatch(fetchOrderRequestFailed(err));
    cb(err, null);
  }
};

export const createOrder = (data, cb = () => {}) => async (dispatch) => {
  dispatch(requestInProgress());

  try {
    const response = await apiOrders.create(data);
    const { message: order } = response;
    dispatch(createOrderRequestSuccess(order));
    cb(null, order);
  } catch (err) {
    dispatch(createOrderRequestFailed(err));
    cb(err, null);
  }
};

export const updateOrder = (orderId, data, cb = () => {}) => async (
  dispatch
) => {
  dispatch(requestInProgress());

  try {
    const response = await apiOrders.update(orderId, data);
    const { message: order } = response;
    dispatch(updateOrderRequestSuccess(order));
    cb(null, order);
  } catch (err) {
    dispatch(updateOrderRequestFailed(err));
    cb(err, null);
  }
};

export default authSlice.reducer;
