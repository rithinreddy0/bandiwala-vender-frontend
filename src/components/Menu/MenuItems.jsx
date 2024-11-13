import React, { useState, useEffect } from 'react';

function MenuItems() {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:4000/api/vendor/getall');
      const data = await response.json();
      setMenuItems(data.data);
    } catch (error) {
      console.error('Error fetching menu items:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/menu-items/${id}`, { method: 'DELETE' });
      setMenuItems((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Error deleting menu item:', error);
    }
  };

  if (loading) {
    return <div className="p-6">Loading menu items...</div>;
  }

  return (
    <div className="flex flex-col bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Current Menu Items</h2>
      <div className="grid gap-4">
        {menuItems.map((item) => (
          <div key={item.id} className="bg-gray-50 p-4 rounded-lg shadow flex items-center">
            <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded mr-4" />
            <div className="flex-grow">
              <h3 className="text-lg font-semibold">{item.name}</h3>
              <p className="text-gray-600">{item.description}</p>
              <p className="text-gray-800 font-medium">${item.price.toFixed(2)}</p>
              <button
                onClick={() => handleDelete(item.id)}
                className="mt-2 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MenuItems;
