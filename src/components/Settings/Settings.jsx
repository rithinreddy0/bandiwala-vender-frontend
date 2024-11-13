import { useState, useContext } from 'react'
import { FiHome, FiMapPin, FiClock, FiPhone, FiType } from 'react-icons/fi'
import { MdRestaurantMenu, MdClose } from 'react-icons/md'
import Profile from './Profile'
import { useUpdateProfileMutation } from '../../App/Services/AuthenticationApi'
import { context } from '../../App'

export default function UpdateProfile({ onClose }) {
  const [updateProfile] = useUpdateProfileMutation()
  const { user, setUser, token, setToken } = useContext(context)
  const [profile, setProfile] = useState({
    name: '',
    address: '',
    cuisineType: '',
    operatingHours: { start: '', end: '' },
    logo: '',
    phoneNumber: ''
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setProfile({ ...profile, [name]: value })
  }

  const handleTimeChange = (e) => {
    const { name, value } = e.target
    setProfile({
      ...profile,
      operatingHours: { ...profile.operatingHours, [name]: value }
    })
  }

  const handleProfileUpdate = async (e) => {
    e.preventDefault()
    await updateProfile({ formData: { id: user._id, ...profile }, token }).then((response) => {
      console.log(response)
    })
  }

  return (
    <>
      <div className="relative w-full h-full">
        <div className="absolute inset-0 bg-black bg-opacity-50 z-40"></div>

        <div className="relative flex items-center justify-center min-h-screen lg:h-full z-50">
          <div className="relative w-11/12 max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-4xl bg-white rounded-lg shadow-lg p-4 lg:p-8">
            <button
              onClick={onClose}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 focus:outline-none"
            >
              <MdClose size={24} />
            </button>
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4 text-center">Restaurant Settings</h1>
            <form onSubmit={handleProfileUpdate} className="grid gap-3 md:gap-4 lg:gap-6 grid-cols-1 md:grid-cols-2">
              <div className="flex flex-col">
                <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                  <MdRestaurantMenu className="mr-2 text-indigo-500" /> Restaurant Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleInputChange}
                  required
                  className="block w-full h-10 rounded-lg border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-300"
                />
              </div>
              <div className="flex flex-col">
                <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                  <FiMapPin className="mr-2 text-indigo-500" /> Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={profile.address}
                  onChange={handleInputChange}
                  required
                  className="block w-full h-10 rounded-lg border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-300"
                />
              </div>
              <div className="flex flex-col">
                <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                  <FiType className="mr-2 text-indigo-500" /> Cuisine Type
                </label>
                <select
                  name="cuisineType"
                  value={profile.cuisineType}
                  onChange={handleInputChange}
                  required
                  className="block w-full h-10 rounded-lg border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-300"
                >
                  <option value="">Select a cuisine type</option>
                  <option value="Indian">Indian</option>
                  <option value="Chinese">Chinese</option>
                  <option value="Italian">Italian</option>
                  <option value="Mexican">Mexican</option>
                  <option value="Japanese">Japanese</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                  <FiClock className="mr-2 text-indigo-500" /> Operating Hours
                </label>
                <div className="flex space-x-2">
                  <input
                    type="time"
                    name="start"
                    value={profile.operatingHours.start}
                    onChange={handleTimeChange}
                    required
                    className="block w-full h-10 rounded-lg border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-300"
                  />
                  <input
                    type="time"
                    name="end"
                    value={profile.operatingHours.end}
                    onChange={handleTimeChange}
                    required
                    className="block w-full h-10 rounded-lg border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-300"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                  <FiHome className="mr-2 text-indigo-500" /> Logo URL
                </label>
                <input
                  type="url"
                  name="logo"
                  value={profile.logo}
                  onChange={handleInputChange}
                  className="block w-full h-10 rounded-lg border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-300"
                />
                {profile.logo && (
                  <img src={profile.logo} alt="Restaurant Logo" className="mt-2 w-16 h-16 object-cover rounded-lg shadow-md" />
                )} 
              </div>
              <div className="flex flex-col">
                <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                  <FiPhone className="mr-2 text-indigo-500" /> Phone Number
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={profile.phoneNumber}
                  onChange={handleInputChange}
                  required
                  className="block w-full h-10 rounded-lg border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-300"
                />
              </div>
              <button
                type="submit"
                className="w-full md:col-span-2 h-10 bg-indigo-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Update Profile
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
