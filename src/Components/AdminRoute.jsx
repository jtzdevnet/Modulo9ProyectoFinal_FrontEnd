import React from 'react';
import { Navigate , useLocation } from 'react-router-dom';
import { useAuthContext } from '../Hook/useAuthContext';
import {jwtDecode } from 'jwt-decode';

const AdminRoute = ({ user, children, redirect }) => {
  const authenticate = localStorage.getItem('token') ? true : false;
  const location = useLocation();
  const decode = jwtDecode(localStorage.getItem('token'));

  console.log(decode);

  return decode?.user_types_id === 1 ? ( children ) : (
    <Navigate
      to={`/?redirect=${encodeURIComponent(redirect || location.pathname)}`}
    />
  );
};

export default AdminRoute