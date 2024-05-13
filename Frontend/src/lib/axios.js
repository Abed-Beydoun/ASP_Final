import axios from 'axios';
const authStore = JSON.parse(localStorage.getItem('auth-store') ?? '{}');
const token = authStore.token;

export const usersAxios = axios.create({
  baseURL: 'http://localhost:5500/api/user',
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
export const schedulingAxios = axios.create({
  baseURL: 'http://localhost:5500/api/scheduling',
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
usersAxios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
schedulingAxios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
