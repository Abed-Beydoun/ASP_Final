import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './providers/authProvider';
import { schedulingAxios, usersAxios } from './lib/axios';

const root = ReactDOM.createRoot(document.getElementById('root'));
const authStore = JSON.parse(localStorage.getItem('auth-store') ?? '{}');
const token = authStore.token;
usersAxios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
schedulingAxios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
root.render(
  <AuthProvider>
    <App />
  </AuthProvider>
);
