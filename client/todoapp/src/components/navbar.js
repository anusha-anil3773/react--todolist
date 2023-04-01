import React from 'react'
import { NavLink } from 'react-router-dom'
import './nav.css'

function navbar() {
  return (
    <nav className="nav">
    <NavLink  to="/" className="title">
      ToDo App
    </NavLink >
    <ul>
      <NavLink to="/home">Home</NavLink>
      <NavLink to="/about">About</NavLink>
    </ul>
  </nav>
  )
}

export default navbar

