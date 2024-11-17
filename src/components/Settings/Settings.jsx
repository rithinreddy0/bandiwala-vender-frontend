import { useState, useContext, useEffect } from 'react'
import { FiHome, FiMapPin, FiPhone, FiType } from 'react-icons/fi'
import { MdRestaurantMenu } from 'react-icons/md'
import { useUpdateProfileMutation, useProfileDetailsMutation } from '../../App/Services/AuthenticationApi'
import { context } from '../../App'

export default function UpdateProfile() {
  const [updateProfile] = useUpdateProfileMutation()
  const [profileDetails] = useProfileDetailsMutation()
  const { user, token } = useContext(context)
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState({
    restaurantName: '',
    address: '',
    cuisineType: '',
    logo: '',
    phone: ''
  })

  useEffect(() => {
    const fetchProfileDetails = async () => {
      const response = await profileDetails({ token })
      const data = response.data?.data
      if (data) {
        setProfile({
          restaurantName: data.restaurantName || profile.restaurantName,
          address: data.address || profile.address,
          cuisineType: data.cuisineType || profile.cuisineType,
          logo: data.logo || profile.logo,
          phone: data.phone || profile.phone
        })
      }
    }
    fetchProfileDetails()
  }, [profileDetails, token])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setProfile({ ...profile, [name]: value })
  }

  const handleEditToggle = () => {
    setIsEditing(!isEditing)
  }

  const handleProfileUpdate = async (e) => {
    e.preventDefault()
    console.log(profile)
    await updateProfile({ ...profile, token }).then((response) => {
      console.log(response)
      setIsEditing(false)  // Disable editing after updating
    })
  }

  return (
    <div className="relative flex items-center justify-center min-h-screen lg:h-full">
      <div className="relative w-11/12 max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-4xl bg-white rounded-lg shadow-lg p-4 lg:p-8">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-center">Restaurant Settings</h1>
          <button
            onClick={handleEditToggle}
            className="text-indigo-600 font-medium focus:outline-none"
          >
            {isEditing ? 'Cancel' : 'Edit'}
          </button>
        </div>
        <form onSubmit={handleProfileUpdate} className="grid gap-3 md:gap-4 lg:gap-6 grid-cols-1 md:grid-cols-2">
          <div className="flex flex-col">
            <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
              <MdRestaurantMenu className="mr-2 text-indigo-500" /> Restaurant Name
            </label>
            <input
              type="text"
              name="restaurantName"
              value={profile.restaurantName}
              onChange={handleInputChange}
              required
              disabled={!isEditing}
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
              disabled={!isEditing}
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
              disabled={!isEditing}
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
              <FiHome className="mr-2 text-indigo-500" /> Logo URL
            </label>
            <input
              type="url"
              name="logo"
              value={profile.logo}
              onChange={handleInputChange}
              disabled={!isEditing}
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
              name="phone"
              value={profile.phone}
              onChange={handleInputChange}
              required
              disabled={!isEditing}
              className="block w-full h-10 rounded-lg border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-300"
            />
          </div>
          {isEditing && (
            <button
              type="submit"
              className="w-full md:col-span-2 h-10 bg-indigo-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Update Profile
            </button>
          )}
        </form>
      </div>
    </div>
  )
}
