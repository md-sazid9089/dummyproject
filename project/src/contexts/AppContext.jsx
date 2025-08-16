import React, { createContext, useContext, useReducer } from 'react';

const initialState = {
  user: null,
  currentCity: 'New York',
  isAuthenticated: false,
  listings: [],
  shops: [],
  loading: false,
  error: null,
};

const appReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload, isAuthenticated: !!action.payload };
    case 'UPDATE_USER':
      return { ...state, user: { ...state.user, ...action.payload } };
    case 'SET_CITY':
      return { ...state, currentCity: action.payload };
    case 'SET_LISTINGS':
      return { ...state, listings: action.payload };
    case 'SET_SHOPS':
      return { ...state, shops: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    default:
      return state;
  }
};

const AppContext = createContext(undefined);

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};