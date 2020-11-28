import { get, post, put } from 'utils/http';

export const fetchAll = () => get('/orders');

export const fetch = (id) => get(`/orders/${id}`);

export const create = (data) => post('/orders', data);

export const update = (id, data) => put(`/orders/${id}`, data);
