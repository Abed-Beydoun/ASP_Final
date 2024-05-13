import { schedulingAxios, usersAxios } from '../lib/axios';

const initState = {
  isAuthenticated: false,
  token: '',
  globalLoading: true,
};
const authReducer = (state = initState, action) => {
  switch (action.type) {
    case 'LOGIN_USER':
      usersAxios.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${action.token}`;
      schedulingAxios.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${action.token}`;
      return {
        isAuthenticated: true,
        token: action.token,
        globalLoading: false,
      };
    case 'REHYDRATE':
      usersAxios.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${action.payload.token}`;
      schedulingAxios.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${action.payload.token}`;
      return {
        ...action.payload,
        globalLoading: false,
      };
    case 'LOGOUT_USER':
      return {
        ...initState,
        globalLoading: false,
      };
    default:
      return state;
  }
};

export default authReducer;
