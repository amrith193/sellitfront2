
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Table = () => {
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:9000/api/register/view');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    setCount(prevCount => prevCount + 1);
    fetchData();
  }, []); // Empty dependency array to run the effect only once when the component mounts

  

  const handleDelete = async (itemId) => {
    try {
      // Display alert before deletion
      const confirmDelete = window.confirm('Are you sure you want to delete this user?');
      if (!confirmDelete) {
        return; // Do nothing if the user cancels deletion
      }

      await axios.delete(`http://localhost:9000/api/register/delete/${itemId}`);

      // After successful deletion, you may want to fetch the updated data
      fetchData();

  
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  return (
    <div className="container mx-auto mt-10">
      <table className="min-w-full bg-white border border-gray-300">
        {/* ... (same as your previous code) */}
              <thead>
           <tr>
             <th className="py-2 px-4 border-b">SL No</th>
             <th className="py-2 px-4 border-b">Name</th>
             <th className="py-2 px-4 border-b">Image</th>
             <th className="py-2 px-4 border-b">Phone</th>
             <th className="py-2 px-4 border-b">Email</th>
             <th className="py-2 px-4 border-b">Actions</th>
           </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item._id}>
              {/* ... (same as your previous code) */}
              <td className="py-2 px-4 border-b">{index + 1}</td>
              <td className="py-2 px-4 border-b">{item.name}</td>
              <td className="py-2 px-4 border-b">
                <img src={item.image} alt={item.name} className="h-10 w-10 object-cover rounded-full" />
              </td>
              <td className="py-2 px-4 border-b">{item.phone}</td>
              <td className="py-2 px-4 border-b">{item.email}</td>
              <td className="py-2 px-4 border-b">
                <button
                  className="bg-red-500 text-white py-1 px-2 rounded-md"
                  onClick={() => handleDelete(item._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;

