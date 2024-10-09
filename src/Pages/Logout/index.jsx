import React from 'react'
import { useAuthContext } from '../../Hook/useAuthContext'

const Logout = () => {

  const { logout } = useAuthContext()
  logout();

  return (
    <div>Logout</div>
  )
}

export default Logout