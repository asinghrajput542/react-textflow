import React from 'react'
import './header.css'
import logo from '../../assets/logo.png'

const Header = () => {
  return (
    <a href='/'><div className='header'>
        <img alt="logo" src={logo} /> 
        <span>ReactTextFlow</span>
    </div>
    </a>
  )
}

export default Header
