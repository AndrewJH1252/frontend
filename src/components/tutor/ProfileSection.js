import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { FaBell, FaForumbee, FaWallet } from 'react-icons/fa';
import WalletPopup from '../common/wallet/Wallet'; // Import the WalletPopup component
import {
  FiUser,
  FiEdit,
  FiBook,
  FiBookOpen,
  FiRefreshCw,
  FiDollarSign,
  FiStar,
  FiClipboard,
  FiSettings,
} from 'react-icons/fi';
import TutorProfile from './ProfileSection';
import EditProfile from '../profile/EditProfile';
import Earnings from './Earnings';
import Review from './Review';
import Requests from '../request/RequestsPage';
import Settings from '../settings/Settings';
import CourseCreation from './CourseCreation';
import TutorCourses from '../tutor/TutorCourses';
import RoleSwitcher from '../common/Switch';
import { Link } from 'react-router-dom';
import Forum from '../Post/Forum';
import Notifications from '../notifications/Notifications';



const ProfileSection = () => {
  const userProfile = useSelector(state => state.auth.profile || undefined);
  const [isWalletOpen, setIsWalletOpen] = useState(false); // State to control wallet popup


  const tutorDashboardItems = [
    {
      id: 'tutor-profile-sections',
      label: 'Profile',
      description: 'View and manage your profile information.',
      icon: FiUser,
      component: <TutorProfile />,
      color: 'text-blue-500',
    },
    {
      id: 'profile/edit',
      label: 'Edit Profile',
      description: 'Update your profile details and keep them up to date.',
      icon: FiEdit,
      component: <EditProfile />,
      color: 'text-green-500',
    },
    {
      id: 'tutor-course-create',
      label: 'Create Course',
      description: 'Create new courses to share your knowledge with others.',
      icon: FiBook,
      component: <CourseCreation />,
      color: 'text-orange-500',
    },
    {
      id: 'tutor-courses',
      label: 'My Courses',
      description: 'Manage and monitor the courses you have created.',
      icon: FiBookOpen,
      component: <TutorCourses />,
      color: 'text-yellow-500',
    },
    {
      id: 'switch',
      label: 'Student',
      description: 'Switch to the student role and explore the learning experience.',
      icon: FiRefreshCw,
      component: <RoleSwitcher />,
      color: 'text-purple-500',
    },
    {
      id: 'tutor-earnings',
      label: 'Earnings',
      description: 'Track your earnings from course sales.',
      icon: FiDollarSign,
      component: <Earnings />,
      color: 'text-pink-500',
    },
    {
      id: 'tutor-reviews',
      label: 'Reviews',
      description: 'Read and manage reviews from your students.',
      icon: FiStar,
      component: <Review />,
      color: 'text-indigo-500',
    },
    {
      id: 'tutor-requests',
      label: 'Requests',
      description: 'Manage meetup requests and hire requests.',
      icon: FiClipboard,
      component: <Requests />,
      color: 'text-teal-500',
    },
    {
      id: 'settings',
      label: 'Settings',
      description: 'Customize your account settings.',
      icon: FiSettings,
      component: <Settings />,
      color: 'text-gray-400',
    },
    {
      id: 'notifications',
      label: 'Notifications',
      description: 'Stay updated with important notifications.',
      icon: FaBell,
      component: <Notifications />,
      color: 'text-gray-500',
    },
    {
      id: 'forum',
      label: 'Forum',
      description: 'Engage in discussions and share knowledge.',
      icon: FaForumbee ,
      component: <Forum/>,
      color: 'text-green-500',
    },
    {
      id: 'wallet',
      label: 'Wallet',
      description: 'Manage your account balance and transactions.',
      icon: FaWallet,
      color: 'text-purple-500',
    },
  ];
  

  if (!userProfile) {
    return null;
  }

  const { image, firstName, lastName } = userProfile;

  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-6">
        
        <div className='flex items-center'>
        <div className="relative rounded-full w-8 h-8 md:w-16 md:h-16 lg:w-24 lg:h-24 xl:w-35 xl:h-35 overflow-hidden">
        <img
          src={image}
          alt={`${firstName} ${lastName}`}
          className="object-cover w-full h-full transition-transform transform-gpu scale-100 hover:scale-110 hover:rotate-3 duration-300"
        />
      </div>


          <h2 className="ml-4 text-2xl font-semibold">{`${firstName} ${lastName}`}</h2>
          
        </div>
        <div className='flex flex-wrap items-center gap-3 justify-center md:justify-start'>
            <Link
              to="/notifications"
              className="flex items-center m-2  text-white focus:outline-none"
              title='Notifications'
            >
              <FaBell className="w-6 h-6  text-gray-400 hover:text-gray-800 transition-all ease-in-out duration-300" />
            </Link>

            <Link
              to="/forum"
              className="flex m-2 items-center text-green-500 hover:text-green-700 transition-all ease-in-out duration-300"
              title='Forum'
            >
              <FaForumbee className="text-xl" />
            </Link>

            <Link
              to="/wallet"
              className="flex m-2 items-center"
              title='Wallet'
            >
              <FaWallet className="text-xl text-purple-500 hover:text-purple-600 transition-all ease-in-out duration-300" />
            </Link>
          </div>


        
      </div>
     
      <div className="bg-gray-100 rounded-lg shadow-lg p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-purple-200 rounded-lg p-4 text-center">
          <p className="text-2xl font-semibold mb-2">{userProfile.totalSoldCourses ? userProfile.totalSoldCourses : 0}</p>
          <p>Courses Sold</p>
        </div>
        <div className="bg-blue-200 rounded-lg p-4 text-center">
        <p className="text-2xl font-semibold mb-2">
          {userProfile.coursesCreated ? userProfile.coursesCreated.length : 0}
        </p>
        <p>Courses Created</p>
      </div>
      <div className="bg-green-200 rounded-lg p-4 text-center">
        <p className="text-2xl font-semibold mb-2">
          {userProfile.studentsEnrolled ? userProfile.studentsEnrolled.length : 0}
        </p>
        <p>Students Enrolled</p>
      </div>

      </div>
      {isWalletOpen && <WalletPopup onClose={() => setIsWalletOpen(false)} />}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
        {tutorDashboardItems.map(item => (
          <Link
            key={item.id}
            to={`/${item.id}`}
            className={`bg-white rounded-lg shadow-lg p-6 flex flex-col justify-center items-center space-y-4 hover:${item.color} transition duration-300 ease-in-out`}
          >
            {React.cloneElement(item.icon({ className: 'text-5xl' }), { className: `text-5xl ${item.color}` })}
            <span className="text-xl font-semibold text-center">{item.label}</span>
            <p className="text-gray-600 text-center">{item.description}</p> {/* Added the description here */}
          </Link>
        ))}
      </section>

    </div>
  );
};

export default ProfileSection;
