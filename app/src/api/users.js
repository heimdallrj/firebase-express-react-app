import { get } from 'utils/http';

export const fetch = (id) => get(`/users/${id}`);
