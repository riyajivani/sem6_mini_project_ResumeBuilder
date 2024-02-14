import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EducationDetail = () => {
     const [educationDetails, setEducationDetails] = useState([
          {
               educationType: '',
               degree: '',
               university: '',
               startYear: '',
               endYear: '',
          },
     ]);

     const navigate = useNavigate();

     const handleInputChange = (e, index) => {
          const { name, value } = e.target;
          const updatedEducationDetails = [...educationDetails];
          updatedEducationDetails[index][name] = value;
          setEducationDetails(updatedEducationDetails);
     };

     const handleAddEducation = () => {
          setEducationDetails((prevEducationDetails) => [
               ...prevEducationDetails,
               {
                    educationType: '',
                    degree: '',
                    university: '',
                    startYear: '',
                    endYear: '',
               },
          ]);
     };

     const handleRemoveEducation = (index) => {
          setEducationDetails((prevEducationDetails) => {
               const updatedEducationDetails = [...prevEducationDetails];
               updatedEducationDetails.splice(index, 1);
               return updatedEducationDetails;
          });
     };

     const handleFormSubmit = (e) => {
          e.preventDefault();
          // Save education details array to local storage
          //const storedEducationDetails = JSON.parse(localStorage.getItem('educationDetails')) || [];
          localStorage.setItem('educationDetails', JSON.stringify(...educationDetails));
          // Clear the form after submission if needed
          setEducationDetails([
               {
                    educationType: '',
                    degree: '',
                    university: '',
                    startYear: '',
                    endYear: '',
               },
          ]);

          navigate('/skills')
     };

     return (
          <div className="max-w-2xl mx-auto mt-8 p-6 bg-white border border-purple-700 rounded shadow-md">
               <h2 className="text-2xl mb-4 font-bold text-center text-purple-700">Education Details</h2>
               <form onSubmit={handleFormSubmit} className="mb-4">
                    {educationDetails.map((education, index) => (
                         <div key={index} className="grid grid-cols-2 gap-4">
                              <div className="mb-4">
                                   <label className="block mb-2">Education Type:</label>
                                   <input
                                        type="text"
                                        name="educationType"
                                        value={education.educationType}
                                        onChange={(e) => handleInputChange(e, index)}
                                        className="w-full border p-2"
                                   />
                              </div>
                              <div className="mb-4">
                                   <label className="block mb-2">Degree:</label>
                                   <input
                                        type="text"
                                        name="degree"
                                        value={education.degree}
                                        onChange={(e) => handleInputChange(e, index)}
                                        className="w-full border p-2"
                                   />
                              </div>
                              <div className="mb-4">
                                   <label className="block mb-2">University:</label>
                                   <input
                                        type="text"
                                        name="university"
                                        value={education.university}
                                        onChange={(e) => handleInputChange(e, index)}
                                        className="w-full border p-2"
                                   />
                              </div>
                              <div className="mb-4">
                                   <label className="block mb-2">Start Year:</label>
                                   <input
                                        type="text"
                                        name="startYear"
                                        value={education.startYear}
                                        onChange={(e) => handleInputChange(e, index)}
                                        className="w-full border p-2"
                                   />
                              </div>
                              <div className="mb-4">
                                   <label className="block mb-2">End Year:</label>
                                   <input
                                        type="text"
                                        name="endYear"
                                        value={education.endYear}
                                        onChange={(e) => handleInputChange(e, index)}
                                        className="w-full border p-2"
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
                              className="bg-purple-700 text-white p-2 hover:bg-purple-800 w-full"
                         >
                              Submit
                         </button>
                    </div>
               </form>
          </div>
     );
};

export default EducationDetail;
