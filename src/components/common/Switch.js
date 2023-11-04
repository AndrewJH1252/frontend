import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { switchRoles } from '../../redux/slice/authSlice';
import { useNavigate } from 'react-router-dom';

const RoleSwitcher = () => {
  const dispatch = useDispatch();
  const userRole = useSelector((state) => state.auth.userRole);
  const user = useSelector((state) => state.auth.profile);
  const history = useNavigate();

  useEffect(() => {
    // Check local storage for the last selected role
    const storedRole = localStorage.getItem('role');
    if (storedRole) {
      dispatch(switchRoles()); // Dispatch the initial role switch action to initialize the state
    }
  }, [dispatch]);

  const handleRoleSwitch = () => {
    dispatch(switchRoles()); // Dispatch role switch action
    const newRole = userRole === 'student' ? 'tutor' : 'student';
    localStorage.setItem('role', newRole); // Update localStorage
    if (newRole === 'student') {
      history('/Main'); // Redirect to the main page (student)
    } else {
      history('/tutor-dashboard'); // Redirect to the tutor dashboard
    }
  };

  const backgroundImage = 'https://img.freepik.com/premium-vector/flat-back-school-background_23-2149045449.jpg?w=1060'; 


  return (
    <div
    className="min-h-screen bg-gradient-to-b from-indigo-900 to-blue-800 py-10"
    style={{
      backgroundImage: `url(${backgroundImage})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
    }}>
   <div className="flex justify-center items-center h-screen bg-transparent">
  <div className="bg-gray-50 max-w-4xl rounded-lg shadow-lg p-8 text-center text-gray-700">
    <h2 className="text-2xl font-semibold mb-4">
      Welcome, {user.firstName}!
    </h2>
    <p className="text-lg mb-6 text-gray-700">
      Your current role: <span className="font-bold text-blue-400">{userRole}</span>
    </p>
    <p className="text-sm mb-6 text-gray-700">
      Click the button below to switch roles and explore more.
    </p>
    <button
      className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md transition duration-300 focus:outline-none"
      onClick={handleRoleSwitch}
    >
      Switch Role
    </button>
  </div>
</div>

  </div>
  
  );
};

export default RoleSwitcher;
