import React, { useState, useContext } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { Mail, Lock, Phone, MapPin, ArrowRightCircle, Eye, EyeOff, UserCheck } from 'lucide-react';
import { useSignUpMutation } from '../../App/Services/AuthenticationApi';


const SignUp = () => {
  const [restaurantName, setRestaurantName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [restaurantAddress, setRestaurantAddress] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate=useNavigate()

  const [signUp] = useSignUpMutation(); 

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (password) => password.length >= 6;

  const handleSignUp = () => {
    setError('');
    if (!restaurantName || !email || !password || !phoneNumber || !restaurantAddress) {
      setError('All fields are required.');
      return;
    }
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!validatePassword(password)) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    // handle sign-up logic here


    setLoading(true);
    signUp({ email,password,phone:phoneNumber,address:restaurantAddress,restaurantName })
      .unwrap()
      .then((response) => {
          console.log(`response${response}`);
          alert(response.message);
          setLoading(false);
          navigate(`/otp/${encodeURIComponent(email)}`)
        
      })
      .catch((err) => {
        setLoading(false);
        if (err.status === 400) {
          console.log(err)
          setError(err.data.message);
        } else {
          setError('Server error. Please try again later.');
        }
      });
  };

  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);

  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-4 sm:p-8 border border-gray-300 rounded-md shadow-md w-full max-w-md mx-auto">
        <h2 className="text-xl font-semibold mb-4 text-center">Sign Up</h2>
        {error && <p className="text-red-500 text-center mb-3">{error}</p>}

        <div className="mb-4 relative">
          <label htmlFor="restaurantName" className="block text-sm font-medium text-gray-700">Restaurant Name</label>
          <input
            type="text"
            id="restaurantName"
            value={restaurantName}
            onChange={(e) => setRestaurantName(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-md"
            required
          />
        </div>

        <div className="mb-4 relative">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <Mail className="absolute left-3 top-9 w-5 h-5 text-gray-500" />
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full pl-10 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-md"
            required
          />
        </div>

        <div className="mb-4 relative">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <Lock className="absolute left-3 top-9 w-5 h-5 text-gray-500" />
          <input
            type={passwordVisible ? 'text' : 'password'}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full pl-10 pr-8 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-md"
            required
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-9 text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            {passwordVisible ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>

        <div className="mb-4 relative">
          <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number</label>
          <Phone className="absolute left-3 top-9 w-5 h-5 text-gray-500" />
          <input
            type="tel"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="mt-1 block w-full pl-10 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-md"
            required
          />
        </div>

        <div className="mb-4 relative">
          <label htmlFor="restaurantAddress" className="block text-sm font-medium text-gray-700">Restaurant Address</label>
          <MapPin className="absolute left-3 top-9 w-5 h-5 text-gray-500" />
          <input
            type="text"
            id="restaurantAddress"
            value={restaurantAddress}
            onChange={(e) => setRestaurantAddress(e.target.value)}
            className="mt-1 block w-full pl-10 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-md"
            required
          />
        </div>

        <div className="flex justify-between items-center mb-4">
          <Link to="/signIn" className="text-sm text-blue-500 hover:underline flex items-center">
            <UserCheck className="w-4 h-4 mr-1" />
            Already have an account? Sign In
          </Link>
        </div>

        <button
          onClick={handleSignUp}
          className={`w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none flex items-center justify-center text-md ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
          disabled={loading}
        >
          {loading ? (
            <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="4" fill="none" />
              <path fill="white" d="M12 2a10 10 0 00-1 19.95v-2.02a8 8 0 110-15.96V2z" />
            </svg>
          ) : (
            <ArrowRightCircle className="w-5 h-5 mr-2" />
          )}
          {loading ? 'Signing Up...' : 'Sign Up'}
        </button>
      </div>
    </div>
  );
};

export default SignUp;
