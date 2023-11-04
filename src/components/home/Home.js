import React, { useRef, useState } from 'react';
import Header from './header';
import HeroSection from './HeroSection';
import Categories from '../categories/Categories';
import FeaturedCourses from './FeaturedCourses';
import Content from '../common/content';
import About from '../common/About';
import Team from '../common/Team';
import Login from '../auth/Login';
import Register from '../auth/Register';
import ForgotPassword from '../auth/ForgotPassword';
import LandingPage from './LandingPage';

const Home = () => {
  const aboutSectionRef = useRef();
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const toggleForgotPasswordPopUp = () => {
    setShowForgotPassword(true);
    setShowLogin(false);
    setShowSignup(false);
  };

  const closeForgotPasswordPopUp = () => {
    setShowForgotPassword(false);
  };

  const closePopUp = () => {
    setShowLogin(false);
    setShowSignup(false);
    setShowForgotPassword(false);
  };

  const toggleLoginPopUp = () => {
    setShowLogin(true);
    setShowSignup(false);
    setShowForgotPassword(false);
    
  };

  const toggleRegisterPopUp = () => {
    setShowSignup(true);
    setShowLogin(false);
    setShowForgotPassword(false);
  };

  return (
    <div>
      <Header setShowLogin={toggleLoginPopUp} setShowSignup={toggleRegisterPopUp} setShowForgotPassword={toggleForgotPasswordPopUp}/>

      {showLogin && (
      <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 z-50" onClick={closePopUp}>
        <div className="bg-transparent p-4 rounded-lg shadow-md z-50">
          <Login closePopUp={closePopUp} showRegisterLink={true} toggleRegisterPopUp={toggleRegisterPopUp} showForgotPasswordLink={true} togglForgotPasswordPopUp={toggleForgotPasswordPopUp} />
        </div>
      </div>
    )}

      {showSignup && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 z-50" onClick={closePopUp}>
          <div className="bg-transparent p-4 rounded-lg shadow-md z-50">
            <Register closePopUp={closePopUp} showLoginLink={true} toggleLoginPopUp={toggleLoginPopUp} />
          </div>
        </div>
      )}

      {showForgotPassword && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 z-50" onClick={closePopUp}>
          <div className="bg-transparent p-4 rounded-lg shadow-md z-50">
            <ForgotPassword closePopUp={closePopUp} showLoginLink={true} toggleLoginPopUp={toggleLoginPopUp} />
          </div>
        </div>
      )}

      <HeroSection />
  
      <FeaturedCourses />
      <Categories />
      <Content />
      <div id="about-section" ref={aboutSectionRef}>
        <About />
      </div>
      <Team />
    </div>
  );
};

export default Home;
