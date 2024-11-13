import React, { useState, useEffect, useContext } from 'react';
import { useDeleteItemMutation, useGetMenuItemsMutation, useToggleItemMutation } from '../../App/Services/MenuApi';
import { context } from '../../App';
import { Trash, ToggleLeft, ToggleRight } from 'lucide-react'; // Icons for delete and toggle switch

function MenuItems() {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [getAllMenuItems] = useGetMenuItemsMutation();
  const [deleteItem] = useDeleteItemMutation(); 
  const [toggleItem]=useToggleItemMutation();
  const { token } = useContext(context);
  const [itemstatus,setitemstatus]=useState(true);

  useEffect(() => {
    fetchMenuItems();
  }, [itemstatus]);

  const fetchMenuItems = async () => {
    setLoading(true);
    try {
      const response = await getAllMenuItems({ token });
      console.log(response.data);
      setMenuItems(response.data.data);
    } catch (error) {
      console.error('Error fetching menu items:', error);
    } finally {
      setLoading(false);
    }
  };



  const handleToggleItem = async(id) => {
    const response=await toggleItem({id,token})
    setitemstatus(!itemstatus)
  };

  const handleDelete = async(id) => {
    console.log(id)
    const response=await deleteItem({id,token})
    setitemstatus(!itemstatus)
  };


  if (loading) {
    return <div className="p-6 text-center">Loading menu items...</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Current Menu Items</h2>
        <div className="space-y-4">
          {menuItems && menuItems.map((item) => (
            <div
              key={item._id}
              className="flex items-center bg-gray-50 p-4 rounded-lg shadow-md transition duration-200 hover:shadow-lg"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-lg mr-4"
              />
              <div className="flex-grow">
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-gray-600">{item.description}</p>
                <p className="text-gray-800 font-medium">${item.price.toFixed(2)}</p>
              </div>
              <div className="flex items-center space-x-4">
                {/* Toggle Switch */}
                <button
                  onClick={() => toggleSwitch(item.id)}
                  className="text-gray-500 hover:text-gray-700 focus:outline-none"
                  aria-label="Toggle Availability"
                >
                  {item.status ? (
                    <ToggleRight className="w-6 h-6 text-green-500" onClick={()=>handleToggleItem(item._id)}/>
                  ) : (
                    <ToggleLeft className="w-6 h-6 text-gray-400"onClick={()=>handleToggleItem(item._id)} />
                  )}
                </button>

                {/* Delete Button */}
                <button
                  onClick={() => handleDelete(item._id)}
                  className="text-red-500 hover:text-red-600 focus:outline-none"
                  aria-label="Delete Item"
                >
                  <Trash className="w-6 h-6" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MenuItems;
