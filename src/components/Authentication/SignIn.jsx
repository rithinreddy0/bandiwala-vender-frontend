import React, { useState,useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, UserPlus, ArrowRightCircle, Eye, EyeOff, Stethoscope } from 'lucide-react';
import { useSignInMutation } from '../../App/Services/AuthenticationApi';
import { context } from '../../App';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [signIn] = useSignInMutation();
  const {user,setUser,token,setToken}=useContext(context)

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleForgotPassword = () => {
    if (!email) {
      alert("Please enter your email address.");
    } else if (!validateEmail(email)) {
      alert("Please enter a valid email address.");
    } else {
      navigate(`/forgot-password/${encodeURIComponent(email)}`);
    }
  };

  const handleSignIn = () => {
    setError('');
    if (!email || !password) {
      setError('Both email and password are required.');
      return;
    }
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    setLoading(true);
    signIn({ email, password })
      .then((response) => {
        setLoading(false);
        if (response.error) {
          const status = response.error.status;
          switch (status) {
            case 400:
              setError(response.error.data.message);
              break;
            case 500:
              setError('Server error occurred. Please try again later.');
              break;
            default:
              setError('Unexpected error occurred. Please try again.');
          }
        } else {
          const { user, token } = response.data;
          setUser(user);
          localStorage.setItem('token', token); // store the token in localStorage with 'token' as the key
          setToken(token)
        }
      })
      .catch(() => {
        setLoading(false);
        setError("Network error. Please check your connection.");
      });
  };

  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 sm:p-10 border border-gray-300 rounded-md shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <div className="mb-6 relative">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <Mail className="absolute left-3 top-11 w-5 h-5 text-gray-500" />
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            aria-label="Email"
            className={`mt-1 block w-full pl-12 p-3 border ${error && !validateEmail(email) ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-lg`}
            required
          />
        </div>
        <div className="mb-6 relative">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <Lock className="absolute left-3 top-11 w-5 h-5 text-gray-500" />
          <input
            type={passwordVisible ? 'text' : 'password'}
            id="password"
            value={password}
            onChange={handlePasswordChange}
            aria-label="Password"
            className={`mt-1 block w-full pl-12 pr-10 p-3 border ${error && !password ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-lg`}
            required
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-11 text-gray-500 hover:text-gray-700 focus:outline-none"
            aria-label={passwordVisible ? 'Hide password' : 'Show password'}
          >
            {passwordVisible ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={handleForgotPassword}
            className="text-sm text-blue-500 hover:underline"
          >
            Forgot Password?
          </button>
          <Link
            to="/signUp"
            className="text-sm text-blue-500 hover:underline flex items-center"
            aria-label="Sign Up"
          >
            <UserPlus className="w-4 h-4 mr-1" /> Sign Up
          </Link>
        </div>
        <button
          onClick={handleSignIn}
          className={`w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 flex items-center justify-center text-lg ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
          disabled={loading}
          aria-label="Sign In"
        >
          {loading ? (
            <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="4" fill="none" />
              <path fill="white" d="M12 2a10 10 0 00-1 19.95v-2.02a8 8 0 110-15.96V2z" />
            </svg>
          ) : (
            <ArrowRightCircle className="w-5 h-5 mr-2" />
          )}
          {loading ? 'Signing In...' : 'Sign In'}
        </button>
      </div>
    </div>
  );
};

export default SignIn;
