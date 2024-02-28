import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoClose } from "react-icons/io5";
import axios from 'axios';

const Skills = () => {
     const [selectedSkills, setSelectedSkills] = useState([]);
     const [tag, setTag] = useState("");
     const data = JSON.parse(localStorage.getItem("ChosenTemplate"));

     const navigate = useNavigate();
     const inputTag = useRef();
     const [length, setLength] = useState(0);

     useEffect(() => {
          const fetchSkills = async () => {
               try {
                    const id = JSON.parse(localStorage.getItem("loggedInUser"))?.userId;
                    const res = await axios.get(`http://localhost:8080/getuserskills/${id}`);
                    const userSkillData = res.data;
                    if (userSkillData) {
                         navigate(`/home/resume/${data?.name}?templateId=${data?.templateId}`)
                    } else {
                         setLength(1);
                    }
               } catch (error) {
                    setLength(1);
               }
          };
          fetchSkills();
     }, [])

     const handleFormSubmit = async (e) => {
          e.preventDefault();

          const id = JSON.parse(localStorage.getItem("loggedInUser"))?.userId;
          try {
               const res = await axios.post(`http://localhost:8080/storeuserskills/${id}`, selectedSkills)
               console.log(res.data);

               setSelectedSkills(null);

               navigate(`/home/resume/${data?.name}?templateId=${data?.templateId}`)

          } catch (e) {
               console.log(e);
          }


          // navigate(`/resume/${data?.name}?templateId=${data?.id}`)
     };

     const addTags = (e) => {
          if (e.key === 'Enter' && tag) {
               e.preventDefault()
               // console.log(tag);
               setSelectedSkills([...selectedSkills, tag]);
               setTag("");
               inputTag.current.focus();
          }
     }

     const removeTag = (skill) => {
          let remainSkill = selectedSkills.filter((s) => s !== skill);
          setSelectedSkills(remainSkill);
     }

     return length > 0 ? (
          <div className="max-w-2xl mx-auto mt-8 p-6 bg-white border border-purple-700 rounded shadow-md">
               <h2 className="text-2xl mb-4 font-bold text-center text-purple-700">Skills Selection</h2>
               <form onSubmit={handleFormSubmit}>

                    <div className="flex flex-wrap">
                         <input
                              type="text"
                              ref={inputTag}
                              value={tag}
                              placeholder='add skill'
                              onChange={(e) => setTag(e.target.value)}
                              onKeyDown={addTags}
                              className="w-full border border-purple-700 p-2 outline-none active:border-purple-700"
                         />
                    </div>

                    <div className="mt-4 flex flex-col">
                         <strong className='text-purple-700'>Selected Skills:</strong>

                         <div className='flex flex-wrap my-2'>
                              {selectedSkills.map((skill, index) => {
                                   return (
                                        <div className='bg-purple-200 border border-purple-700 m-1 px-1 w-fit rounded-md flex items-center justify-between gap-1' key={index}>
                                             <p className=' text-lg text-purple-950'>{skill}</p>
                                             <IoClose className='text-lg text-purple-950 bg-purple-300 rounded-md hover:bg-purple-950 hover:text-red-500' onClick={() => removeTag(skill)} />
                                        </div>
                                   )
                              })}
                         </div>

                    </div>

                    <div className="mt-4">
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

export default Skills;

