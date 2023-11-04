import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate} from 'react-router-dom';
import { forgotPasswordRequest } from '../../redux/slice/authSlice';
import Logo from '../../images/logo.png';

const ForgotPassword = (props) => {
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);
  const passwordResetError = useSelector((state) => state.auth.passwordResetError);
  const passwordResetLoading = useSelector((state) => state.auth.passwordResetLoading);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(forgotPasswordRequest(email));
    navigate('/'); // Navigate to the login page after submitting
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleClickInside = (e) => {
    // Prevent the click event from propagating to the background overlay
    e.stopPropagation();
  };

  const backgroundImage = 'https://img.freepik.com/free-photo/ai-generated-water-picture_23-2150644468.jpg?t=st=1698152172~exp=1698155772~hmac=df630d448efedab0b8a2ceadc0bb390bf4597950099f4802eea70a43ede479a7&w=1380';


  return (
    <div
    className="fixed inset-0 flex items-center justify-center z-50"
    style={{
      background: 'rgba(0, 0, 0, 0.5)', // Add a semi-transparent background overlay
    }}
  >
    <div
      className="bg-gradient-to-b from-gray-800 via-gray-900 to-black bg-opacity-70 p-6 sm:px-8 md:px-10 rounded-md w-full max-w-md relative z-50"
      style={{
        background: 'linear-gradient(to bottom, rgba(211, 231, 245, 0.5), rgba(130, 195, 218, 0.5))',
        backgroundImage: `url(${backgroundImage})`,
      }}
      onClick={handleClickInside}
    >
      <h2 className="text-2xl sm:text-4xl font-bold text-gray-600 mb-4 sm:mb-8">Forgot Password</h2>
      {error && <p className="text-red-500 mb-4">{error.message}</p>}
      {passwordResetError && <p className="text-red-500 mb-4">{passwordResetError.message}</p>}
      {passwordResetLoading ? (
        <p className="text-blue-500">Loading...</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative mb-5">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
              required
              className="w-full px-4 py-3 border rounded focus:outline-none focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-green-600 py-3 text-white rounded-md w-full mb-5 mt-10 hover:bg-green-700 transition"
          >
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>
      
            <p className="text-neutral-500 mt-12">
            {props.showLoginLink && (
                <>
                  Remember your account?{' '}
                  <span className="text-blue-800 ml-2 hover:underline cursor-pointer" onClick={props.toggleLoginPopUp}>
                    Login
                  </span>
                </>
              )}
            </p>

        </form>
      )}
    </div>
  </div>


  );
};

export default ForgotPassword;

