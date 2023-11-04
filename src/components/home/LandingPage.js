import React from 'react';
import { FaEnvelope, FaInstagram, FaTwitter, FaLinkedin, FaYoutube } from 'react-icons/fa';
import Logo from '../../images/logo.png';


const LandingPage = () => {
    const backgroundImage = 'https://img.freepik.com/free-vector/gradient-dynamic-purple-lines-background_23-2148995757.jpg?t=st=1698292835~exp=1698293435~hmac=1d2c222367f0baae283b51375cfecf6f2460920e4134e19cce932a29ea64d983';

    return (
        <div className="bg-gradient-to-b from-blue-200 to-blue-400 h-screen text-white">
        <header className="relative flex flex-col items-center justify-center h-full">
        <div
          className="bg-gradient-to-b from-gray-800 via-gray-900 to-black bg-opacity-70 p-6 sm:px-8 md:px-10 rounded-md w-full max-w-md relative z-50"
          style={{
            background: 'linear-gradient(to bottom, rgba(211, 231, 245, 0.5), rgba(130, 195, 218, 0.5))',
            backgroundImage: `url(${backgroundImage})`,
          }}>
            <div className="h-full w-full bg-opacity-60 bg-black">
          </div>
          <div className="container mx-auto text-center">
            <img src={Logo} alt="My Logo" className="w-40 h-16 mb-4" />
          </div>
          <div className="container mx-auto mt-12">
            <h2 className="text-3xl md:text-4xl font-semibold text-blue-900 mb-4">Join Tutorium and Transform Your Learning Journey</h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl text-center">Whether you're a student eager to explore new horizons or a tutor passionate about sharing knowledge, Tutorium empowers your learning experience at every step. Don't miss the opportunity to be a part of our vibrant educational community.</p>
      
            {/* Social Media Links */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-8">
              <div className="flex items-center space-x-2">
                <FaEnvelope size={30} className="text-blue-500" />
                <a href="mailto:your@email.com" className="text-blue-500 hover:text-blue-600 transition duration-300">Email: your@email.com</a>
              </div>
              <div className="flex items-center space-x-2">
                <FaInstagram size={30} className="text-pink-500" />
                <a href="https://www.instagram.com/your-instagram" className="text-pink-500 hover:text-pink-600 transition duration-300">Instagram: your-instagram</a>
              </div>
              <div className="flex items-center space-x-2">
                <FaTwitter size={30} className="text-blue-400" />
                <a href="https://twitter.com/your-twitter" className="text-blue-400 hover:text-blue-500 transition duration-300">Twitter: your-twitter</a>
              </div>
              <div className="flex items-center space-x-2">
                <FaLinkedin size={30} className="text-blue-700" />
                <a href="https://www.linkedin.com/in/your-linkedin" className="text-blue-700 hover:text-blue-800 transition duration-300">LinkedIn: your-linkedin</a>
              </div>
              <div className="flex items-center space-x-2">
                <FaYoutube size={30} className="text-red-600" />
                <a href="https://www.youtube.com/c/your-youtube" className="text-red-600 hover:text-red-700 transition duration-300">YouTube: your-youtube</a>
              </div>
            </div>
          </div>
          </div>
        </header>
      
        <footer className="bg-blue-900 text-white p-4 text-center">
          <p>&copy; {new Date().getFullYear()} Tutorium. All rights reserved.</p>
        </footer>
      </div>
      
    
       
      );
};

export default LandingPage;
