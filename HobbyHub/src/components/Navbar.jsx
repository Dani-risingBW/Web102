import React, { useState } from 'react'
import './Navbar.css'

function Navbar() {
  const [language, setLanguage] = useState('English');

  const toggleLanguage = () => {
    setLanguage(language === 'English' ? 'Spanish' : 'English');
  };

  return (
    <div className="navbar">
      <h3>HobbyHub</h3>
      <input type="text" placeholder="Search..." className='search-bar' />
      <nav>
        <ul>
          <li><a href="/">Home</a></li>
          <li>
            <button onClick={toggleLanguage} className="language-toggle">
              {language === 'English' ? 'ES' : 'EN'}
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar
