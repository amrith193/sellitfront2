import React, { useState, useEffect } from 'react';
import Axios from 'axios';

const AdminDashboard = () => {
  const [pendingSellers, setPendingSellers] = useState([]);

  useEffect(() => {
    const fetchPendingSellers = async () => {
      try {
        const response = await Axios.get('http://localhost:9000/api/register/admin/approve-seller');
        setPendingSellers(response.data);
      } catch (error) {
        console.error('Error fetching seller requests', error);
      }
    };

    fetchPendingSellers();
  }, []);

  const handleApproveReject = async (userId, approvalStatus) => {
    try {
      await Axios.patch(`http://localhost:9000/api/register/admin/approve-seller/${userId}/${approvalStatus}`);
      // Log success message or fetch pending sellers again if needed
      console.log(`Seller ${userId} approval status updated: ${approvalStatus}`);
    } catch (error) {
      console.error('Error updating seller approval status', error);
    }
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <h2>Pending Seller Requests</h2>
      <ul>
        {pendingSellers.map((seller) => (
          <li key={seller._id}>
            {seller.username} - {seller.email}
            <button onClick={() => handleApproveReject(seller._id, 'approved')}>Approve</button>
            <button onClick={() => handleApproveReject(seller._id, 'rejected')}>Reject</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
