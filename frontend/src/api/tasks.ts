import api from './axios';

export const getTasks = () => api.get('/tasks');
export const getTask = (id: string) => api.get(`/tasks/${id}`);
export const applyToTask = (id: string) => api.post(`/tasks/${id}/apply`);
