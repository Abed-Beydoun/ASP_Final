import React, {
  createContext,
  useReducer,
  useCallback,
  useMemo,
  useEffect,
} from 'react';
import authReducer from '../reducer/auth.reducer';

const AuthContext = createContext({
  isAuthenticated: false,
  token: '',
  login: () => {},
  logout: () => {},
  globalLoading: true,
});

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    isAuthenticated: false,
    token: '',
    globalLoading: true,
  });
  const rehydrate = useCallback(() => {
    // Perform login logic here and dispatch the LOGIN action
    const payload = JSON.parse(localStorage.getItem('auth-store') ?? '{}');
    if (Object.keys(payload).length > 0) {
      dispatch({
        type: 'REHYDRATE',
        payload,
      });
    } else {
      logout();
    }
  }, []);

  useEffect(() => {
    // Check if user data exists in local storage and set the initial state
    rehydrate();
  }, [rehydrate]);

  const login = (token, persist = false) => {
    // Perform login logic here and dispatch the LOGIN action
    if (persist) {
      localStorage.setItem(
        'auth-store',
        JSON.stringify({
          isAuthenticated: true,
          token,
        })
      );
    }
    dispatch({ type: 'LOGIN_USER', token });
    // Optionally, persist user data in local storage
  };

  const logout = () => {
    // Perform logout logic here and dispatch the LOGOUT action
    dispatch({ type: 'LOGOUT_USER' });
    // Remove user data from local storage
    localStorage.removeItem('auth-store');
  };

  const returnData = useMemo(() => {
    return { ...state, login, logout };
  }, [state]);

  return (
    <AuthContext.Provider value={returnData}>{children}</AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
