import React, { useContext, useState } from 'react';
import { FaUtensils, FaFileAlt, FaDollarSign, FaImage } from 'react-icons/fa';
import { context } from '../../App';
import { useAddItemMutation } from '../../App/Services/MenuApi';

const AddItem = () => {
  const [newItem, setNewItem] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { user, setUser, token, setToken } = useContext(context);
  const [addItem] = useAddItemMutation();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem((prev) => ({ ...prev, [name]: value }));
    setError('');
  };

  const validate = () => {
    if (!newItem.name) return 'Item Name is required';
    if (!newItem.description) return 'Description is required';
    if (!newItem.price || newItem.price <= 0) return 'Enter a valid price';
    if (!newItem.image || !/^https?:\/\//.test(newItem.image)) return 'Enter a valid image URL';
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    try {
      console.log(newItem)
      const response = await addItem({itemData:newItem, token }).unwrap();
      console.log(response);
      alert('Item added successfully!');
      setNewItem({ name: '', description: '', price: '', image: '' });
    } catch (error) {
      setError('Failed to add item');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4 sm:p-6">
      <div className="w-full max-w-md p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-semibold text-center mb-8">Add New Item</h2>
        
        {error && <div className="mb-4 text-center text-red-600">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <FaUtensils className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              name="name"
              value={newItem.name}
              onChange={handleInputChange}
              placeholder="Item Name"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:border-gray-400 focus:outline-none"
            />
          </div>
          <div className="relative">
            <FaFileAlt className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
            <textarea
              name="description"
              value={newItem.description}
              onChange={handleInputChange}
              placeholder="Description"
              rows="3"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:border-gray-400 focus:outline-none"
            />
          </div>
          <div className="relative">
            <FaDollarSign className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
            <input
              type="number"
              name="price"
              value={newItem.price}
              onChange={handleInputChange}
              placeholder="Price"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:border-gray-400 focus:outline-none"
            />
          </div>
          <div className="relative">
            <FaImage className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              name="image"
              value={newItem.image}
              onChange={handleInputChange}
              placeholder="Image URL"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:border-gray-400 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 mt-6 bg-indigo-600 text-white rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {loading ? 'Adding Item...' : 'Add Item'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddItem;
