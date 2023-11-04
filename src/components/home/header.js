// Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../images/logo.png';
import CategoryMenu from '../common/CategoryMenu';
import SearchBar from '../common/SearchBar';

const Header = (props) => {
  const handleAboutClick = () => {
    const aboutSection = document.getElementById('about-section');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="bg-gray-800 py-6 px-8 flex flex-col lg:flex-row items-center justify-between">
      <div className="flex items-center space-x-4 lg:space-x-6 mb-4 lg:mb-0">
        <a href="/Main" className="flex items-center hover:opacity-80 transition-opacity">
          <img src={Logo} alt="My Logo" className="w-30 h-12 mr-8 mb-3" />
        </a>
        <CategoryMenu />
      </div>
      <div className="flex items-center mb-4 lg:mb-0">
        <SearchBar />
      </div>
      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-12">
          <span
            className="text-gray-200 hover:text-blue-500 transition cursor-pointer"
            onClick={handleAboutClick}
          >
            About
          </span>
          <button onClick={props.setShowLogin} className="text-gray-200 hover:text-blue-500 transition">
            Login
          </button>
          <button onClick={props.setShowSignup} className="text-gray-200 hover:text-blue-500 transition">
            Signup
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;