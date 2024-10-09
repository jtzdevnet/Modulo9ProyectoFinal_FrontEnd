import React from 'react'
import { Routes, Route } from "react-router-dom";
import { Home, Login, Venue, NotFound, Logout } from "../Pages";
import { AdminHome } from "../AdminPages";
import PrivateRoute from "../Components/PrivateRoute.jsx";
import AdminRoute from "../Components/AdminRoute.jsx";

const RoutesIndex = () => {

  const isLoggedIn = localStorage.getItem('token') ? true : false;

  const wrapPrivateRoute = (element, user, redirect) => {
    return (
      <PrivateRoute user={user} redirect={redirect}>
        {element}
      </PrivateRoute>
    );
  };

  const wrapAdminRoute = (element, user, redirect) => {
    return (
      <AdminRoute user={user} redirect={redirect}>
        {element}
      </AdminRoute>
    );
  };

  return (
    <Routes>
        <Route path='/'  element={wrapPrivateRoute(<Home />, isLoggedIn, 'home')}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/venue/:venueId' element={wrapPrivateRoute(<Venue/>, isLoggedIn, 'venue')}></Route>
        <Route path='/admin' element={wrapAdminRoute(<AdminHome />, isLoggedIn, 'admin')}></Route>
        <Route path='/logout' element={<Logout/>}></Route>
        {/* <Route path='/home' element={<Home/>}></Route>
        <Route path='/search/:query' element={<Home/>}></Route>
        <Route path='/category/:category' element={<Home/>}></Route>
        <Route path='/my-cart' element={<ShoppingCart/>}></Route>
        <Route path='/profile' element={<Profile/>}></Route>
        <Route path='/admin' element={<Admin/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/signup' element={<SignUp/>}></Route>
        <Route path='/item/:productId' element={<ItemDetails/>}></Route>*/}
        <Route path='*' element={<NotFound/>}></Route> 
    </Routes>
  )
}

export default RoutesIndex