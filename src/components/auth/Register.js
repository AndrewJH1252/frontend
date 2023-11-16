import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../redux/slice/authSlice';
import '../../styles/main.css';
import LoadingSpinner from '../common/LoadingSpinner';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Logo from '../../images/logo.png';

const Register = (props) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [role, setRole] = useState('student'); // Default role is set to 'student'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const dispatch = useDispatch();
  const history = useNavigate();

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const checkPasswordStrength = (password) => {
    // Add your password strength validation logic here
    // For example, check if the password contains at least 8 characters, a mix of uppercase and lowercase letters, and numbers.
    // Return true or false based on the validation
    return password.length >= 8 && /[a-z]/.test(password) && /[A-Z]/.test(password) && /\d/.test(password);
  };

  const handleClickInside = (e) => {
    // Prevent the click event from propagating to the background overlay
    e.stopPropagation();
  };

  

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!firstName || !lastName || !email || !password || !confirmPassword) {
    setError('Please fill in all fields.');
    return;
  }

  if (password !== confirmPassword) {
    setError('Passwords do not match.');
    return;
  }

  if (!checkPasswordStrength(password)) {
    setError('Password must be at least 8 characters long and contain uppercase, lowercase letters, and numbers.');
    return;
  }

  setLoading(true);
  setError('');

  try {
    await dispatch(registerUser({ firstName, lastName, email, password}));
    setShowSuccessMessage(true); // Show the success message
    setTimeout(() => {
      history(0); // Redirect to login page
    }, 2000); // Adjust the delay as needed
  } catch (error) {
    setError('Registration failed. Please try again.'); // Customize the error message based on the backend response
  } finally {
    setLoading(false);
  }
};


const backgroundImage = 'https://img.freepik.com/free-photo/ai-generated-water-picture_23-2150644468.jpg?t=st=1698152172~exp=1698155772~hmac=df630d448efedab0b8a2ceadc0bb390bf4597950099f4802eea70a43ede479a7&w=1380';

return (
  <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
  <div
    className="bg-gradient-to-b from-gray-800 via-gray-900 to-black p-6 sm:p-12 md:p-6 lg:p-8 rounded-md w-full max-w-sm relative z-50"
    style={{
      background: 'linear-gradient(to bottom, rgba(211, 231, 245, 0.5), rgba(130, 195, 218, 0.5))',
      backgroundImage: `url(${backgroundImage})`,
    }}
    onClick={handleClickInside}
  >
    <h2 className="text-gray-600 text-lg sm:text-2xl mb-2 sm:mb-4 font-semibold">Register</h2>
    {showSuccessMessage && (
      <p className="text-green-500 mb-3">Registration successful. Redirecting...</p>
    )}
    {error && <p className="text-red-500 mb-2 sm:mb-3">{error}</p>}
    <form onSubmit={handleSubmit} className="space-y-2 sm:space-y-6">
      <input
        type="text"
        value={firstName}
        onChange={handleFirstNameChange}
        required
        className="w-full px-2 sm:px-3 sm:py-2 rounded border border-gray-400 focus:outline-none focus:border-blue-500 transition duration-300"
        placeholder="First Name"
      />
      <input
        type="text"
        value={lastName}
        onChange={handleLastNameChange}
        required
        className="w-full px-2 sm:px-3 sm:py-2 rounded border border-gray-400 focus:outline-none focus-border-blue-500 transition duration-300"
        placeholder="Last Name"
      />
      <input
        type="email"
        value={email}
        onChange={handleEmailChange}
        required
        className="w-full px-2 sm:px-3 sm:py-2 rounded border border-gray-400 focus:outline-none focus-border-blue-500 transition duration-300"
        placeholder="Email"
      />
      <div className="relative">
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
          required
          className="w-full px-2 sm:px-3 sm:py-2 rounded border border-gray-400 focus:outline-none focus-border-blue-500 transition duration-300"
        />
        <button
          type="button"
          onClick={handleTogglePasswordVisibility}
          className="absolute top-0 right-0 m-1 sm:m-2 text-gray-500 focus:outline-none text-xs sm:text-base"
        >
          {showPassword ? 'Hide' : 'Show'}
        </button>
      </div>
      <div className="relative">
        <input
          type={showConfirmPassword ? 'text' : 'password'}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          required
          className="w-full px-2 sm:px-3 sm:py-2 rounded border border-gray-400 focus:outline-none focus-border-blue-500 transition duration-300"
        />
        <button
          type="button"
          onClick={handleToggleConfirmPasswordVisibility}
          className="absolute top-0 right-0 m-1 sm:m-2 text-gray-500 focus:outline-none text-xs sm:text-base"
        >
          {showPassword ? 'Hide' : 'Show'}
        </button>
      </div>
      <button
        type="submit"
        className={`bg-green-600 py-1 sm:py-2 text-white rounded-md w-full mt-2 sm:mt-3 hover:bg-green-700 transition duration-300 ${
          loading ? 'opacity-70 cursor-not-allowed' : ''
        }`}
        disabled={loading}
      >
        {loading ? 'Signing Up...' : 'Sign Up'}
      </button>
      <p className="text-neutral-500 mt-2 sm:mt-3 text-xs sm:text-sm">
        {props.showLoginLink && (
          <>
            Already have an account?{' '}
            <span className="text-blue-800 hover:underline cursor-pointer" onClick={props.toggleLoginPopUp}>
              Login
            </span>
          </>
        )}
      </p>
    </form>
  </div>
</div>

  );
};

export default Register;