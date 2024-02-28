import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const EducationDetail = () => {
     const [educationDetails, setEducationDetails] = useState({
          education: [
               {
                    educationType: '',
                    degree: '',
                    university: '',
                    startYear: '',
                    endYear: '',
               }
          ],
     });

     const navigate = useNavigate();
     const [length, setLength] = useState(0);

     useEffect(() => {
          const fetchEducationDetails = async () => {
               try {
                    const id = JSON.parse(localStorage.getItem("loggedInUser"))?.userId;
                    const res = await axios.get(`http://localhost:8080/geteducations/${id}`);
                    const userEduData = res.data;
                    if (userEduData) {
                         navigate('/skills')
                    } else {
                         setLength(1);
                    }
               } catch (error) {
                    setLength(1);
               }
          };
          fetchEducationDetails();
     }, [])

     const handleInputChange = (e, index) => {
          const { name, value } = e.target;
          const updatedEducationDetails = [...educationDetails.education];
          updatedEducationDetails[index][name] = value;
          setEducationDetails({
               education: updatedEducationDetails,
          });
     };

     const handleAddEducation = () => {
          setEducationDetails({
               education: [
                    ...educationDetails.education,
                    {
                         educationType: '',
                         degree: '',
                         university: '',
                         startYear: '',
                         endYear: '',
                    },
               ],
          });
     };

     const handleRemoveEducation = (index) => {
          const updatedEducationDetails = [...educationDetails.education];
          updatedEducationDetails.splice(index, 1);

          setEducationDetails({
               education: updatedEducationDetails,
          });
     };

     const handleFormSubmit = async (e) => {
          e.preventDefault();

          const id = JSON.parse(localStorage.getItem("loggedInUser"))?.userId;
          try {
               const res = await axios.post(`http://localhost:8080/storeeducations/${id}`, educationDetails.education)
               console.log(res.data);

               setEducationDetails({
                    education: [
                         {
                              educationType: '',
                              degree: '',
                              university: '',
                              startYear: '',
                              endYear: '',
                         },
                    ],
               });

               navigate('/skills')
          } catch (e) {
               console.log(e);
          }    
     };

     return length > 0 ? (
          <div className="max-w-2xl mx-auto mt-8 p-6 bg-white border border-purple-700 rounded shadow-md">
               <h2 className="text-2xl mb-4 font-bold text-center text-purple-700">Education Details</h2>
               <form onSubmit={handleFormSubmit} className="mb-4">
                    {educationDetails.education.map((education, index) => (
                         <div key={index} className="grid grid-cols-2 gap-4">
                              <div className="mb-4">
                                   <label className="block mb-2">Education Type:</label>
                                   <input
                                        type="text"
                                        name="educationType"
                                        value={education.educationType}
                                        onChange={(e) => handleInputChange(e, index)}
                                        className="w-full border p-2 border-purple-700 outline-none"
                                   />
                              </div>
                              <div className="mb-4">
                                   <label className="block mb-2">Degree:</label>
                                   <input
                                        type="text"
                                        name="degree"
                                        value={education.degree}
                                        onChange={(e) => handleInputChange(e, index)}
                                        className="w-full border p-2 border-purple-700 outline-none"
                                   />
                              </div>
                              <div className="mb-4">
                                   <label className="block mb-2">University:</label>
                                   <input
                                        type="text"
                                        name="university"
                                        value={education.university}
                                        onChange={(e) => handleInputChange(e, index)}
                                        className="w-full border p-2 border-purple-700 outline-none"
                                   />
                              </div>
                              <div className="mb-4">
                                   <label className="block mb-2">Start Year:</label>
                                   <input
                                        type="text"
                                        name="startYear"
                                        value={education.startYear}
                                        onChange={(e) => handleInputChange(e, index)}
                                        className="w-full border p-2 border-purple-700 outline-none"
                                   />
                              </div>
                              <div className="mb-4">
                                   <label className="block mb-2">End Year:</label>
                                   <input
                                        type="text"
                                        name="endYear"
                                        value={education.endYear}
                                        onChange={(e) => handleInputChange(e, index)}
                                        className="w-full border p-2 border-purple-700 outline-none"
                                   />
                              </div>
                              <div className="col-span-2 flex justify-center">
                                   <button
                                        type="button"
                                        onClick={() => handleRemoveEducation(index)}
                                        className="bg-red-700 text-white p-2 hover:bg-red-800 mr-2"
                                   >
                                        Remove Education
                                   </button>
                                   <button
                                        type="button"
                                        onClick={handleAddEducation}
                                        className="bg-green-700 text-white p-2 hover:bg-green-800"
                                   >
                                        Add Education
                                   </button>
                              </div>
                         </div>
                    ))}
                    <div className="col-span-2 mt-4">
                         <button
                              type="submit"
                              className="bg-purple-700 text-white p-2 hover:bg-purple-800 w-full">
                              Submit
                         </button>

                         <p className='text-red-600 mt-2'>you can not change the details so check it once carefully before submit.</p>
                    </div>
               </form>
          </div>
     ) : null;
};

export default EducationDetail;
