import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800  text-white py-10 pt-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/4 xl:w-1/4 mb-4">
            <h3 className="text-lg font-semibold mb-2">About Us</h3>
             <ul>
              <li><a href="#">Team</a></li>
              <li><a href="#">Vision</a></li>
              <li><a href="#">Support</a></li>
              <li><a href="#">FAQS</a></li>
              <li><a href="#">Careers</a></li>
    
            </ul>
          </div>
          <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/4 xl:w-1/4 mb-4">
            <h3 className="text-lg font-semibold mb-2">Useful Links</h3>
            <ul>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Site Map</a></li>
              <li><a href="#">Terms of Service</a></li>
            </ul>
          </div>
          <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/4 xl:w-1/4 mb-4">
            <h3 className="text-lg font-semibold mb-2">Contact</h3>
            <p>No. 5號, Deming Rd,</p>
            <p>Guishan District, Taoyuan City, 333</p>
            <p>Email: tutorium@gmail.com</p>
            <p>Phone: (886) 03 350 7001</p>
          </div>
          <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/4 xl:w-1/4 mb-4">
          <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
          <ul className="flex">
            <li>
              <a href="#" className="text-blue-600 hover:text-blue-700">
                <FaFacebook className="text-xl mr-2" />
              </a>
            </li>
            <li>
              <a href="#" className="text-blue-500 hover:text-blue-600">
                <FaTwitter className="text-xl mr-2" />
              </a>
            </li>
            <li>
              <a href="#" className="text-pink-500 hover:text-pink-600">
                <FaInstagram className="text-xl mr-2" />
              </a>
            </li>
            <li>
              <a href="#" className="text-blue-500 hover:text-blue-600">
                <FaLinkedin className="text-xl mr-2" />
              </a>
            </li>
          </ul>
        </div>

        </div>
        <hr className="border-gray-600 my-4" />
        <p className="text-center text-gray-500">&copy; {new Date().getFullYear()} Tutorium. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
