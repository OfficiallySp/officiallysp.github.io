import React, { useState } from 'react';
import './NavBar.css';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav>
      <button onClick={handleToggle}>
        {isOpen ? 'Close menu' : 'Open menu'}
      </button>
      {isOpen && (
        <ul>
          <li><a href='#'>Home</a></li>
          <li><a href='#'>About</a></li>
          <li><a href='#'>Contact</a></li>
        </ul>
      )}
    </nav>
  );
};

export default NavBar;