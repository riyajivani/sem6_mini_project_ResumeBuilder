import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const dburl = process.env.REACT_APP_URL

const UserDetailForm = () => {
     const [userDetails, setUserDetails] = useState({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          about: '',
          address: '',
          city: '',
          state: '',
          pincode: '',
          role: '',

     });
     const navigate = useNavigate();
     const [length, setLength] = useState(0);

     useEffect(() => {
          const fetchUserDetails = async () => {
               try {
                    const id = JSON.parse(localStorage.getItem("loggedInUser"))?.userId;
                    const res = await axios.get(`${dburl}/getdetail/${id}`);
                    const userDetailData = res.data;
                    if (userDetailData) {
                         navigate('/experience');
                    } else {
                         setLength(1);
                    }
               } catch (error) {
                    setLength(1);
               }
          };
          fetchUserDetails();
     }, [])

     const handleInputChange = (e) => {
          const { name, value } = e.target;
          setUserDetails({
               ...userDetails,
               [name]: value,
          });
     };

     const handleFormSubmit = async (e) => {
          e.preventDefault();

          const id = JSON.parse(localStorage.getItem("loggedInUser"))?.userId;
          try {
               const res = await axios.post(`${dburl}/storedetail/${id}`, userDetails)
               console.log(res.data);

               setUserDetails({
                    firstName: '',
                    lastName: '',
                    email: '',
                    phone: '',
                    address: '',
                    city: '',
                    state: '',
                    pincode: '',
                    role: '',
                    about: ''
               });
               navigate('/experience');

          } catch (e) {
               console.log(e);
          }
     };

     return length > 0 ? (

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
                              className="w-full border border-purple-700 outline-none p-2 "
                         />
                    </div>
                    <div className="mb-4">
                         <label className="block mb-2">Last Name:</label>
                         <input
                              type="text"
                              name="lastName"
                              value={userDetails.lastName}
                              onChange={handleInputChange}
                              className="w-full border p-2 border-purple-700 outline-none"
                         />
                    </div>
                    <div className="mb-4">
                         <label className="block mb-2">Email:</label>
                         <input
                              type="email"
                              name="email"
                              value={userDetails.email}
                              onChange={handleInputChange}
                              className="w-full border p-2 border-purple-700 outline-none"
                         />
                    </div>
                    <div className="mb-4">
                         <label className="block mb-2">Phone No:</label>
                         <input
                              type="tel"
                              name="phone"
                              value={userDetails.phone}
                              onChange={handleInputChange}
                              className="w-full border p-2 border-purple-700 outline-none"
                         />
                    </div>
                    <div className="mb-4">
                         <label className="block mb-2">Role</label>
                         <input
                              type="text"
                              name="role"
                              value={userDetails.role}
                              onChange={handleInputChange}
                              className="w-full border p-2 border-purple-700 outline-none"
                         />
                    </div>
                    <div className="mb-8 col-span-2">
                         <label className="block mb-2">Address:</label>
                         <textarea
                              name="address"
                              value={userDetails.address}
                              onChange={handleInputChange}
                              className="w-full border p-2 resize-none border-purple-700 outline-none"
                              rows="4"
                         />
                    </div>
                    <div className="mb-8 col-span-2">
                         <label className="block mb-2">About:</label>
                         <textarea
                              name="about"
                              value={userDetails.about}
                              onChange={handleInputChange}
                              className="w-full border p-2 resize-none border-purple-700 outline-none"
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
                              className="w-full border p-2 border-purple-700 outline-none"
                         />
                    </div>
                    <div className="mb-4">
                         <label className="block mb-2">State:</label>
                         <input
                              type="text"
                              name="state"
                              value={userDetails.state}
                              onChange={handleInputChange}
                              className="w-full border p-2 border-purple-700 outline-none"
                         />
                    </div>
                    <div className="mb-4">
                         <label className="block mb-2">Pincode:</label>
                         <input
                              type="text"
                              name="pincode"
                              value={userDetails.pincode}
                              onChange={handleInputChange}
                              className="w-full border p-2 border-purple-700 outline-none"
                         />
                    </div>


                    <div className="col-span-2">
                         <button onClick={handleFormSubmit} className="bg-purple-700 text-white p-2 hover:bg-purple-200 w-full">
                              Submit
                         </button>

                         <p className='text-red-600 mt-2'>you can not change the details so check it once carefully before submit.</p>
                    </div>
               </div>
          </div>
     ) : null;
};

export default UserDetailForm