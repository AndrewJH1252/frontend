import React, { useState } from 'react';
import { FiUser, FiX, FiMenu, FiEdit, FiRefreshCw, FiDollarSign, FiStar, FiSettings, FiLogOut, FiClipboard, FiBook, FiBookOpen } from 'react-icons/fi';
import TutorProfile from './ProfileSection';
import EditProfile from '../profile/EditProfile';
import Earnings from './Earnings';
import Review from './Review';
import Requests from '../request/RequestsPage';
import Settings from '../settings/Settings';
import CourseCreation from './CourseCreation';
import TutorCourses from '../tutor/TutorCourses';
import RoleSwitcher from '../common/Switch';
import LogOut from '../auth/LogOut';

const TutorSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeComponent, setActiveComponent] = useState(<TutorProfile />);

  const sidebarItems = [
    { id: 'profile', label: 'Profile', icon: FiUser, component: <TutorProfile />, color: 'text-blue-500' },
    { id: 'editProfile', label: 'Edit Profile', icon: FiEdit, component: <EditProfile />, color: 'text-green-500' },
    { id: 'courseManagement', label: 'Create Course', icon: FiBook, component: <CourseCreation />, color: 'text-orange-500' },
    { id: 'myCourses', label: 'My Courses', icon: FiBookOpen, component: <TutorCourses />, color: 'text-yellow-500' },
    { id: 'student', label: 'Student', icon: FiRefreshCw, component: <RoleSwitcher />, color: 'text-purple-500' },
    { id: 'earnings', label: 'Earnings', icon: FiDollarSign, component: <Earnings />, color: 'text-pink-500' },
    { id: 'reviews', label: 'Reviews', icon: FiStar, component: <Review />, color: 'text-indigo-500' },
    { id: 'requests', label: 'Requests', icon: FiClipboard, component: <Requests />, color: 'text-teal-500' },
    { id: 'settings', label: 'Settings', icon: FiSettings, component: <Settings />, color: 'text-gray-400' },
    { id: 'logout', label: 'LogOut', icon: FiLogOut, component: <LogOut />, color: 'text-red-500' },
  ];;

  const handleSidebarItemClick = (component) => {
    setActiveComponent(component);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div className={`flex flex-col w-20 border-r border-gray-700 bg-gray-900 transition-all duration-300 ease-in-out ${isOpen ? 'w-72' : ''}`}>
        <div className="flex items-center justify-center justify-between ml-2 p-4">
          <button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none hover:text-gray-300">
            {isOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
          </button>
        </div>
        
        <ul className="flex-1">
          {sidebarItems.map(item => (
            <li key={item.id}>
              <button
                onClick={() => handleSidebarItemClick(item.component)}
                className={`flex items-center justify-start p-4 w-full text-white hover:bg-gray-800 focus:outline-none ${
                  activeComponent === item.component ? 'bg-gray-800' : ''
                }`}
              >
                {isOpen && (
                  <>
                    {React.createElement(item.icon, {
                      className: `w-6 h-6 ml-2 ${item.color}`,
                    })}
                    <span className="ml-4">{item.label}</span>
                  </>
                )}
                {!isOpen && React.createElement(item.icon, {
                  className: `w-6 h-6 ml-2 ${item.color}`,
                })}
              </button>
            </li>
          ))}
        </ul>
        
      
      </div>

      {/* Rendered Component */}
      <div className="flex-1 p-6 bg-gray-100 overflow-y-auto">
        {activeComponent}
      </div>
    </div>
  );
};

TutorSidebar.propTypes = {
  // Define your prop types here
};

export default TutorSidebar;
