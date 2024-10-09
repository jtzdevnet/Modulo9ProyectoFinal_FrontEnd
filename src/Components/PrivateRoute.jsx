import React from 'react';
import { Navigate , useLocation } from 'react-router-dom';

const PrivateRoute = ({ user, children, redirect }) => {
  const authenticate = localStorage.getItem('token') ? true : false;
  const location = useLocation();
  return authenticate ? (
    children
  ) : (
    <Navigate
      to={`/login?redirect=${encodeURIComponent(redirect || location.pathname)}`}
    />
  );
};

export default PrivateRoute