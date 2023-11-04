import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PersonalDetails from './PersonalDetails';
import AccountDetails from './AccountDetails';
import { fetchUserData } from '../../redux/Thunks/authThunk';

const EditProfile = () => {
  const [showEmailPasswordSection, setShowEmailPasswordSection] = useState(false);
  const token = useSelector((state) => state.auth.token);

  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      const fetchData = async () => {
        await dispatch(fetchUserData(token));
      };
  
      fetchData();
    }
  }, [dispatch, token]);
  
  return (
    <div className="bg-gradient-to-b from-indigo-900 to-indigo-700 text-white shadow-lg rounded-lg p-8">
    <h2 className="text-4xl mt-4 text-center font-bold mb-8">Edit Profile</h2>
    <nav className="flex items-center justify-center space-x-8 mb-8">
      <div
        className={`py-2 px-4 font-semibold cursor-pointer transform hover:scale-105 ${
          !showEmailPasswordSection
            ? 'border-b-4 border-white'
            : 'text-gray-400 hover:text-white'
        } transition duration-300 ease-in-out`}
        onClick={() => setShowEmailPasswordSection(false)}
      >
        Personal Details
      </div>
      <div
        className={`py-2 px-4 font-semibold cursor-pointer transform hover:scale-105 ${
          showEmailPasswordSection
            ? 'border-b-4 border-white'
            : 'text-gray-400 hover:text-white'
        } transition duration-300 ease-in-out`}
        onClick={() => setShowEmailPasswordSection(true)}
      >
        Account Details
      </div>
    </nav>
  
    <div className="bg-white bg-opacity-30 backdrop-blur-lg rounded-lg p-6">
      {showEmailPasswordSection ? <AccountDetails /> : <PersonalDetails />}
    </div>
  </div>
  

  
  );
};

export default EditProfile;
