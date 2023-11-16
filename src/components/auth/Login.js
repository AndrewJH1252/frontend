import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaEye, FaEyeSlash, FaGoogle, FaGithub } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser, githubLogin, googleLogin } from '../../redux/slice/authSlice';
import { handleGoogleLoginCallback } from '../../redux/Thunks/authThunk';
import { showTemporaryNotification } from '../../redux/Thunks/notificationsThunk';
import Logo from '../../images/logo.png';

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const userId = useSelector((state) => state.auth.user?._id);
  const handleClickInside = (e) => {
    // Prevent the click event from propagating to the background overlay
    e.stopPropagation();
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  
  const handleSubmit = async (e) => {
    e.preventDefault();

  
  
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }
  
    setLoading(true);
    setError('');
  
    try {
      const resultAction = await dispatch(loginUser({ email, password}));
      const { token, user } = resultAction.payload;
  
      // Check if the login was successful
      if (token) {
        setShowSuccessMessage(true);

        dispatch(
          showTemporaryNotification({
            recipientId: userId,
            message: `Hello ${user?.firstName || 'User'} ${user?.lastName || ''}! Welcome back to Tutorium! We're thrilled to have you back with us. 
            Explore new courses, connect with fellow learners, and make the most of your learning journey. 
            If you have any questions or need assistance, don't hesitate to reach out to our support team. Happy learning!`,
            type: 'success',
          })
        );
  
        // Redirect the user based on the role
        if (token) {
          setTimeout(() => {
            navigate(`/Main?token=${token}`);
          }, 1000);
        } 
        
  
        // Show a temporary success notification
      
      } else {
        // Handle incorrect login
        setError('Invalid email or password. Please check your credentials.');
      }
    } catch (error) {
      // Error during login
      console.error('Login failed:', error.message);
    } finally {
      setLoading(false);
    }
  };
  

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };


  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleGoogleLogin = async (tokenId) => {
    try {
       await dispatch(googleLogin());
      
  
      // Dispatch the callback thunk with the tokenId
      const auth = await dispatch(handleGoogleLoginCallback(tokenId)); // Add this line
      window.location.href = auth;
    } catch (error) {
      console.error('Error during Google login:', error);
      setError('Failed to initiate Google login.');
    }
  };
  
  
  
  const handleGithubLogin = async () => {
    try {
      const auth = await dispatch(githubLogin());
      window.location.href = auth;
  
      // Show a temporary success notification
      dispatch(
        showTemporaryNotification({
          message: 'Successfully initiated GitHub login!',
          type: 'success',
        })
      );
    } catch (error) {
      console.error('Error during Github login:', error);
      setError('Failed to initiate Github login.');
  
      // Show a temporary error notification
      dispatch(
        showTemporaryNotification({
          message: 'Failed to initiate GitHub login.',
          type: 'error',
        })
      );
    }
  };

  const backgroundImage = 'https://img.freepik.com/free-photo/ai-generated-water-picture_23-2150644468.jpg?t=st=1698152172~exp=1698155772~hmac=df630d448efedab0b8a2ceadc0bb390bf4597950099f4802eea70a43ede479a7&w=1380';

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
  
      <div className="bg-gradient-to-b from-gray-800 via-gray-900 to-black p-6 sm:p-12 md:p-6 lg:p-8 rounded-md w-full max-w-sm relative z-50"
           style={{
             background: 'linear-gradient(to bottom, rgba(211, 231, 245, 0.5), rgba(130, 195, 218, 0.5))',
             backgroundImage: `url(${backgroundImage})`,
           }}
           onClick={handleClickInside}>
  
        <h2 className="text-gray-600 text-lg sm:text-2xl mb-2 sm:mb-4 font-semibold">Sign In</h2>
        {error && <p className="text-red-500 mb-2 sm:mb-3">{error}</p>}
        {showSuccessMessage && (
          <p className="text-green-500 mb-3">Login successful. Redirecting...</p>
        )}
  
        <form onSubmit={handleSubmit} className="space-y-2 sm:space-y-6">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
            required
            className="w-full px-2 sm:px-3  sm:py-2  rounded border border-gray-400 focus:outline-none focus:border-blue-500 transition duration-300"
          />
  
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              required
              className="w-full px-2 sm:px-3 sm:py-2  rounded border border-gray-400 focus:outline-none focus-border-blue-500 transition duration-300"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute top-0 right-0 m-1 sm:m-2 text-gray-500 focus:outline-none text-xs sm:text-base"
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
  
          <div className="flex items-center">
            {props.showForgotPasswordLink && (
              <span className="text-gray-600 hover:underline cursor-pointer text-xs sm:text-sm" onClick={props.togglForgotPasswordPopUp}>
                Forgot Password
              </span>
            )}
          </div>
  
          <div className="flex justify-center space-x-2 sm:space-x-4">
            <FaGoogle className="text-red-600 text-xl sm:text-2xl cursor-pointer" onClick={handleGoogleLogin} />
            <FaGithub className="text-gray-600 text-xl sm:text-2xl cursor-pointer" onClick={handleGithubLogin} />
          </div>
  
          <button
            type="submit"
            className={`bg-green-600 py-1 sm:py-2 text-white rounded-md w-full mt-2 sm:mt-3 hover:bg-green-700 transition duration-300 ${
              loading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
  
          <p className="text-neutral-500 mt-2 sm:mt-3 text-xs sm:text-sm">
            {props.showRegisterLink && (
              <>
                Don't have an account?{' '}
                <span className="text-blue-800 hover:underline cursor-pointer" onClick={props.toggleRegisterPopUp}>
                  Sign Up
                </span>
              </>
            )}
          </p>
        </form>
      </div>
    </div>
  );
  
};

export default Login;