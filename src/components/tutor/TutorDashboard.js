import React, { useEffect, useState } from 'react';
import TutorSidebar from './TutorSidebar'; // Import the TutorSidebar component
import { fetchUserData } from '../../redux/Thunks/authThunk';
import { useDispatch, useSelector } from 'react-redux';

const TutorDashboard = () => {
  const dispatch = useDispatch();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const token = useSelector(state => state.auth.token);
  const user = useSelector(state => state.auth.profile || []);
 
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    // Conditionally fetch user data when user is an empty array
    if (user.length === 0) {
      dispatch(fetchUserData(token));
    }
  }, [dispatch, token, user]); // Include user in the dependencies array
  

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">

      {/* Tutor Sidebar */}
      <TutorSidebar
        sidebarOpen={sidebarOpen}
        onToggleSidebar={toggleSidebar}
      
      />

    </div>
  );
};

export default TutorDashboard;
