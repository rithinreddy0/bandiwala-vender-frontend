import React from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaStar, FaUtensils } from 'react-icons/fa';

const Profile = () => {
  const user = {
    email: "gujjulasainavadeepreddy@gmail.com",
    phone: 7989096656,
    address: "Near Sintage",
    restaurantName: "Annapurna",
    averageRating: 0,
    logo: "", // Add a URL here if you have a logo image
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-sm bg-white rounded-lg shadow-md overflow-hidden">
        {/* Profile Image */}
        <div className="flex justify-center pt-6">
          {user.logo ? (
            <img
              src={user.logo}
              alt="Restaurant Logo"
              className="w-24 h-24 rounded-full border-2 border-indigo-600"
            />
          ) : (
            <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center text-4xl text-gray-600 border-2 border-indigo-600">
              <FaUtensils />
            </div>
          )}
        </div>

        {/* User Information */}
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-center text-indigo-700 mb-2">{user.restaurantName}</h2>
          
          {/* Rating */}
          <div className="flex justify-center items-center text-yellow-500 mb-4">
            <FaStar className="mr-2" />
            <span>{user.averageRating} / 5</span>
          </div>

          <div className="space-y-3 text-gray-600">
            <div className="flex items-center">
              <FaEnvelope className="mr-2 text-indigo-600" />
              <span>{user.email}</span>
            </div>
            <div className="flex items-center">
              <FaPhone className="mr-2 text-indigo-600" />
              <span>{user.phone}</span>
            </div>
            <div className="flex items-center">
              <FaMapMarkerAlt className="mr-2 text-indigo-600" />
              <span>{user.address}</span>
            </div>
          </div>

          {/* Update Profile Button */}
          <button
            className="w-full mt-6 py-2 px-4 bg-indigo-600 text-white rounded-lg text-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Update Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
