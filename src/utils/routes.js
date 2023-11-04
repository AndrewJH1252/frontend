import React from 'react';
import { Route } from 'react-router-dom';
import Home from '../components/home/Home';
import Main from '../components/common/Main';
import NotFound from '../utils/NotFound';
import ProtectedRoute from '../utils/ProctectedRoute'; // Import the ProtectedRoute component
import Cart from '../components/cart/Cart';

import Notifications from '../components/notifications/Notifications';
import CourseContent from '../components/courses/CourseContent';
import CoursePage from '../components/courses/CoursePage';
import Forum from '../components/Post/Forum';

import About from '../components/common/About';

import AccountDetails from '../components/profile/AccountDetails';
import EditProfile from '../components/profile/EditProfile';
import PersonalDetails from '../components/profile/PersonalDetails';
import ReviewSection from '../components/review/ReviewSection';
import MyCourses from '../components/student/MyCourses';
import TutorCourses from '../components/tutor/TutorCourses';
import PaymentHistory from '../components/student/payment/paymentHistory';
import StudentDashboard from '../components/student/StudentDashboard';
import CourseCreation from '../components/tutor/CourseCreation';
import Earnings from '../components/tutor/Earnings';
import Review from '../components/tutor/Review';
import TutorDashboard from '../components/tutor/TutorDashboard';

import Login from '../components/auth/Login';
import Register from '../components/auth/Register';
import ForgotPassword from '../components/auth/ForgotPassword';
import LogOut from '../components/auth/LogOut';
import Message from '../components/message/Message';

import CartSummary from '../components/cart/CartSummary';
import ResultsPage from '../components/common/ResultsPage';

import FeaturedCourses from '../components/home/FeaturedCourses';


import CourseOverview from '../components/tutor/CourseCreation/CourseOverview';
import CurriculumForm from '../components/tutor/CourseCreation/CurriculumForm';

import Switch from '../components/common/Switch';
import ProfileSections from '../components/tutor/ProfileSection';
import CreateCourse from '../components/tutor/CourseCreation/CreateCourse';
import Settings from '../components/settings/Settings';
import TutorDetails from '../components/courses/TutorDetails';
import Checkout from '../components/cart/Checkout';
import Wallet from '../components/common/wallet/Wallet';

import RequestsPage from '../components/request/RequestsPage';
import RequestDetails from '../components/request/RequestDetails';
import Thread from '../components/Post/Thread';
import CommunityPage from '../components/Post/community/CommunityPage';
import TutorPage from '../components/student/TutorPage';


export const routes = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/main',
    element: <Main />,
  },
  {
    path: '/featured-courses',
    element: <FeaturedCourses />,
  },


  {
    path: '/tutor/*',
    element: <TutorDashboard />, // Set this route as protected
  },
  {
    path: '/tutor-page',
    element: <TutorPage />,
  },

  {
    path: '/cart',
    element: <Cart />,
  },
  {
    path: '/community',
    element: <CommunityPage />,
  },

  {
    path: '/notifications',
    element: <Notifications />,
  },
  {
    path: '/settings',
    element: <Settings />,
  },
  {
    path: '/course/:courseId/content',
    element: <CourseContent  />,
  },

  {
    path: '/courses/:id',
    element: <CoursePage />,
  },
  {
    path: '/threads/:threadId',
    element: <Thread />,
  },
  
  {
    path: '/request/:id',
    element: <RequestDetails />,
  },
  
  {
    path: '/tutors/:id',
    element: <TutorDetails />,
  },
  {
    path: '/requests-page',
    element: <RequestsPage />,
  },
 
  {
    path: '/forum',
    element: <Forum />,
  },
  {
    path: '/about',
    element: <About />,
  },
  {
    path: '/wallet',
    element: <Wallet />,
  },

  
  {
    path: '/profile/account',
    element: <AccountDetails />,
  },
  {
    path: '/profile/edit',
    element: <EditProfile />,
  },
  {
    path: '/profile/personal',
    element: <PersonalDetails />,
  },
  {
    path: '/review',
    element: <ReviewSection />,
  },
  {
    path: '/student/courses',
    element: <MyCourses />,
  },
  {
    path: '/tutor-courses',
    element: <TutorCourses />,
  },
  {
    path: '/student/payment/history',
    element: <PaymentHistory />,
  },

  {
    path: '/student',
    element: <StudentDashboard />,
  },
  {
    path: '/tutor-course-create',
    element: <CourseCreation />,
  },
  {
    path: '/tutor-earnings',
    element: <Earnings />,
  },
  {
    path: '/tutor-reviews',
    element: <Review />,
  },
  {
    path: '/tutor-profile-sections',
    element: <ProfileSections />,
  },

  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
  { path: '/forgot-password', element: <ForgotPassword /> },
  {  path: "/results", element: <ResultsPage />},

  { path: '/logout', element: <LogOut /> },
  { path: '/message', element: <Message /> },
  { path: '/cart-summary', element: <CartSummary /> },
  { path: '/checkout', element: <Checkout /> },
  { path: '/create-course', element: <CreateCourse /> },
  { path: '/course-creation', element: <CourseCreation /> },
  { path: '/course-overview', element: <CourseOverview /> },
  { path: '/curriculum-form', element: <CurriculumForm /> },
  { path: '/tutor-dashboard', element: <TutorDashboard /> },
  { path: '/switch', element: <Switch /> },
  {
    path: '*',
    element: <NotFound />,
  },
];
