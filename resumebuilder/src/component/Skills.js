import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Skills = () => {
     const [selectedSkills, setSelectedSkills] = useState([]);
     const data = JSON.parse(localStorage.getItem("ChosenTemplate"));

     const skillsList = [
          'Communication Skills',
          'Critical Thinking',
          'Creativity',
          'Adaptability',
          'Collaboration',
          'Time Management',
          'Leadership',
          'Technical Proficiency',
          'Analytical Skills',
          'Mathematics',
          'Coding/Programming',
          'Research Skills',
          'Foreign Language Proficiency',
          'Project Management',
     ];

     const navigate = useNavigate();

     const handleSkillChange = (skill) => {
          if (selectedSkills.includes(skill)) {
               setSelectedSkills(selectedSkills.filter((selectedSkill) => selectedSkill !== skill));
          } else {
               setSelectedSkills([...selectedSkills, skill]);
          }
     };

     const handleFormSubmit = (e) => {
          e.preventDefault();
          // Save selected skills to local storage
          localStorage.setItem('selectedSkills', JSON.stringify(selectedSkills));

          navigate(`/resume/${data?.name}?templateId=${data?.id}`)
     };

     return (
          <div className="max-w-2xl mx-auto mt-8 p-6 bg-white border border-purple-700 rounded shadow-md">
               <h2 className="text-2xl mb-4 font-bold text-center text-purple-700">Skills Selection</h2>
               <form onSubmit={handleFormSubmit}>
                    <div className="flex flex-wrap">
                         {skillsList.map((skill) => (
                              <label key={skill} className="mr-4 mb-2 inline-flex items-center">
                                   <input
                                        type="checkbox"
                                        name={skill}
                                        checked={selectedSkills.includes(skill)}
                                        onChange={() => handleSkillChange(skill)}
                                        className="mr-2 accent-purple-700"
                                   />
                                   {skill}
                              </label>
                         ))}
                    </div>
                    <div className="mt-4 ">
                         <strong className='text-purple-700'>Selected Skills:</strong> {selectedSkills.join(', ')}
                    </div>
                    <div className="mt-4">
                         <button
                              type="submit"
                              className="bg-purple-700 text-white p-2 hover:bg-purple-800 w-full">
                              Submit
                         </button>
                    </div>
               </form>
          </div>
     );
};

export default Skills;
