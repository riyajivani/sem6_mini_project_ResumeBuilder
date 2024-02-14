import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserDetailForm = () => {
     const [userDetails, setUserDetails] = useState({
          image: '',
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          address: '',
          city: '',
          state: '',
          pincode: '',
     });
     const navigate = useNavigate();

     const handleInputChange = (e) => {
          const { name, value } = e.target;
          setUserDetails({
               ...userDetails,
               [name]: value,
          });
     };

     const handleFormSubmit = (e) => {
          e.preventDefault();
          localStorage.setItem('userDetails', JSON.stringify(userDetails));
          setUserDetails({
               image: '',
               firstName: '',
               lastName: '',
               email: '',
               phone: '',
               address: '',
               city: '',
               state: '',
               pincode: '',
          });
          navigate('/experience');
     };

     return (
          <div className="max-w-2xl mx-auto mt-8 p-6 bg-white border border-purple-700 rounded shadow-md">
               <h2 className="text-2xl mb-4 font-bold text-center text-purple-700">User Details</h2>
               <div className="grid grid-cols-2 gap-4">
                    {/* <div className="mb-4">
                         <label className="block mb-2">Image URL:</label>
                         <input
                              type="text"
                              name="image"
                              value={userDetails.image}
                              onChange={handleInputChange}
                              className="w-full border p-2"
                         />
                    </div> */}
                    <div className="mb-4">
                         <label className="block mb-2">First Name:</label>
                         <input
                              type="text"
                              name="firstName"
                              value={userDetails.firstName}
                              onChange={handleInputChange}
                              className="w-full border p-2"
                         />
                    </div>
                    <div className="mb-4">
                         <label className="block mb-2">Last Name:</label>
                         <input
                              type="text"
                              name="lastName"
                              value={userDetails.lastName}
                              onChange={handleInputChange}
                              className="w-full border p-2"
                         />
                    </div>
                    <div className="mb-4">
                         <label className="block mb-2">Email:</label>
                         <input
                              type="email"
                              name="email"
                              value={userDetails.email}
                              onChange={handleInputChange}
                              className="w-full border p-2"
                         />
                    </div>
                    <div className="mb-4">
                         <label className="block mb-2">Phone No:</label>
                         <input
                              type="tel"
                              name="phone"
                              value={userDetails.phone}
                              onChange={handleInputChange}
                              className="w-full border p-2"
                         />
                    </div>
                    <div className="mb-8 col-span-2">
                         <label className="block mb-2">Address:</label>
                         <textarea
                              name="address"
                              value={userDetails.address}
                              onChange={handleInputChange}
                              className="w-full border p-2 resize-none"
                              rows="4"
                         />
                    </div>
                    <div className="mb-4">
                         <label className="block mb-2">City:</label>
                         <input
                              type="text"
                              name="city"
                              value={userDetails.city}
                              onChange={handleInputChange}
                              className="w-full border p-2"
                         />
                    </div>
                    <div className="mb-4">
                         <label className="block mb-2">State:</label>
                         <input
                              type="text"
                              name="state"
                              value={userDetails.state}
                              onChange={handleInputChange}
                              className="w-full border p-2"
                         />
                    </div>
                    <div className="mb-4">
                         <label className="block mb-2">Pincode:</label>
                         <input
                              type="text"
                              name="pincode"
                              value={userDetails.pincode}
                              onChange={handleInputChange}
                              className="w-full border p-2"
                         />
                    </div>
                    <div className="col-span-2">
                         <button onClick={handleFormSubmit} className="bg-purple-700 text-white p-2 hover:bg-purple-200 w-full">
                              Submit
                         </button>
                    </div>
               </div>
          </div>
     );
};

export default UserDetailForm