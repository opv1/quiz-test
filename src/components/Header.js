import React from 'react'
import { useSelector } from 'react-redux'

const Header = () => {
  const { currentUser } = useSelector((state) => state.app)

  return (
    <div className='header-component d-flex justify-content-center align-items-center'>
      <h1>Текущий пользователь - {currentUser.name}</h1>
    </div>
  )
}

export default Header
