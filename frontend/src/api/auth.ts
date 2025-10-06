import api from './axios';

export const register = (payload: any) => api.post('/auth/register', payload);
export const login = (payload: any) => api.post('/auth/login', payload);
export const me = () => api.get('/auth/me');
