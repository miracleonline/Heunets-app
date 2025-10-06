import api from './axios';

export const createTask = (payload: any) => api.post('/tasks', payload);
export const getTasks = () => api.get('/tasks');
export const getTask = (id: string) => api.get(`/tasks/${id}`);
export const applyToTask = (id: string) => api.post(`/tasks/${id}/apply`);

