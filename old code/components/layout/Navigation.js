import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav className="mt-8">
      <ul className="flex flex-wrap justify-center space-x-4 text-xl">
        <li><NavLink to="/" className={({ isActive }) => isActive ? "nav-link-active" : "nav-link"}>About</NavLink></li>
        <li><NavLink to="/projects" className={({ isActive }) => isActive ? "nav-link-active" : "nav-link"}>Projects</NavLink></li>
        <li><NavLink to="/bookshelf" className={({ isActive }) => isActive ? "nav-link-active" : "nav-link"}>Bookshelf</NavLink></li>
        <li><NavLink to="/blog" className={({ isActive }) => isActive ? "nav-link-active" : "nav-link"}>Blog</NavLink></li>
      </ul>
    </nav>
  );
};

export default Navigation;