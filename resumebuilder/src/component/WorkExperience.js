import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const dburl = process.env.REACT_APP_URL

const WorkExperience = () => {

     const [workExperience, setWorkExperience] = useState({
          experiences: [
               {
                    jobTitle: '',
                    organization: '',
                    startYear: '',
                    endYear: '',
                    jobDescription: '',
               },
          ],
     });
     const navigate = useNavigate();
     const [length, setLength] = useState(0);


     useEffect(() => {
          const fetchWorkExperience = async () => {
               try {
                    const id = JSON.parse(localStorage.getItem("loggedInUser"))?.userId;
                    const res = await axios.get(`${dburl}/getexperiences/${id}`);
                    const userExpData = res.data;
                    if (userExpData) {
                         navigate('/education');
                    } else {
                         setLength(1);
                    }
               } catch (error) {
                    setLength(1);
               }
          };
          fetchWorkExperience();
     }, [])

     const handleInputChange = (e, index) => {
          const { name, value } = e.target;
          const updatedExperiences = [...workExperience.experiences];
          updatedExperiences[index][name] = value;
          setWorkExperience({
               experiences: updatedExperiences,
          });
     };

     const handleAddExperience = () => {
          setWorkExperience({
               experiences: [
                    ...workExperience.experiences,
                    {
                         jobTitle: '',
                         organization: '',
                         startYear: '',
                         endYear: '',
                         jobDescription: '',
                    },
               ],
          });
     };

     const handleRemoveExperience = (index) => {
          const updatedExperiences = [...workExperience.experiences];
          updatedExperiences.splice(index, 1);
          setWorkExperience({
               experiences: updatedExperiences,
          });
     };

     const handleFormSubmit = async (e) => {
          e.preventDefault();

          const id = JSON.parse(localStorage.getItem("loggedInUser"))?.userId;
          try {
               const res = await axios.post(`${dburl}/storeexperiences/${id}`, workExperience.experiences)
               console.log(res.data);

               setWorkExperience({
                    experiences: [
                         {
                              jobTitle: '',
                              organization: '',
                              startYear: '',
                              endYear: '',
                              jobDescription: '',
                         },
                    ],
               });
               navigate('/education');
          } catch (e) {
               console.log(e);
          }
     };

     return length > 0 ? (
          <div className="max-w-2xl mx-auto mt-5 p-4 bg-white border border-purple-700 rounded shadow-md">
               <h2 className="text-2xl mb-4 font-bold text-center text-purple-700">
                    Work Experience - {workExperience.experiences.length}
               </h2>
               <div className="mb-4">
                    {workExperience.experiences.map((experience, index) => (
                         <div key={index} className="grid grid-cols-2 gap-4">
                              <div className="mb-4">
                                   <label className="block mb-2">Job Title:</label>
                                   <input
                                        type="text"
                                        name="jobTitle"
                                        value={experience.jobTitle}
                                        onChange={(e) => handleInputChange(e, index)}
                                        className="w-full border p-2 border-purple-700 outline-none"
                                   />
                              </div>
                              <div className="mb-4">
                                   <label className="block mb-2">Organization:</label>
                                   <input
                                        type="text"
                                        name="organization"
                                        value={experience.organization}
                                        onChange={(e) => handleInputChange(e, index)}
                                        className="w-full border p-2 border-purple-700 outline-none"
                                   />
                              </div>
                              <div className="mb-4">
                                   <label className="block mb-2">Start Year:</label>
                                   <input
                                        type="text"
                                        name="startYear"
                                        value={experience.startYear}
                                        onChange={(e) => handleInputChange(e, index)}
                                        className="w-full border p-2 border-purple-700 outline-none"
                                   />
                              </div>
                              <div className="mb-4">
                                   <label className="block mb-2">End Year:</label>
                                   <input
                                        type="text"
                                        name="endYear"
                                        value={experience.endYear}
                                        onChange={(e) => handleInputChange(e, index)}
                                        className="w-full border p-2 border-purple-700 outline-none"
                                   />
                              </div>
                              <div className="mb-8 col-span-2">
                                   <label className="block mb-2">Job Description:</label>
                                   <textarea
                                        name="jobDescription"
                                        value={experience.jobDescription}
                                        onChange={(e) => handleInputChange(e, index)}
                                        className="w-full border p-2 resize-none border-purple-700 outline-none"
                                        rows="4"
                                   />
                              </div>

                              <div className="col-span-2 flex justify-center">
                         <button
                              type="button"
                              onClick={handleRemoveExperience}
                              className="bg-red-700 text-white p-2 hover:bg-red-800 mr-2"
                         >
                              Remove Experience
                         </button>
                         <button
                              type="button"
                              onClick={handleAddExperience}
                              className="bg-green-700 text-white p-2 hover:bg-green-800"
                         >
                              Add Experience
                         </button>
                    </div>
                         </div>
                    ))}

                    <div className="col-span-2 mt-4">
                         <button
                              onClick={handleFormSubmit}
                              className="bg-purple-700 text-white p-2 hover:bg-purple-300 w-full">
                              Submit
                         </button>

                         <p className='text-red-600 mt-2'>you can not change the details so check it once carefully before submit.</p>
                    </div>
               </div>
          </div>
     ) : null;
};

export default WorkExperience;
