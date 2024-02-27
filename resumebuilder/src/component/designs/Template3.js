import React, { useRef, useState, useEffect } from 'react';
import { FaEnvelope, FaPhoneAlt } from 'react-icons/fa';
import { FaLocationDot } from "react-icons/fa6";
import { GoDot } from "react-icons/go";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import axios from 'axios';
import { FaUpload } from "react-icons/fa";
import { FaTrash } from 'react-icons/fa'

const Template3 = () => {
     // let user = JSON.parse(localStorage.getItem("userDetails"))
     // let education = JSON.parse(localStorage.getItem("educationDetails"))
     // let work = JSON.parse(localStorage.getItem("workExperience"))
     // let skills = JSON.parse(localStorage.getItem("selectedSkills"));

     const [user, setUser] = useState(null);
     const [education, setEducation] = useState([]);
     const [work, setWork] = useState([]);
     const [skills, setSkills] = useState([]);
     const [userImage, setUserImage] = useState('');
     const [isHover, setIsHover] = useState(false);
     const [isHoveredImage, setIsHoveredImage] = useState(false);


     useEffect(() => {

          // Fetch user details
          const fetchUserDetails = async () => {
               try {
                    const id = JSON.parse(localStorage.getItem("loggedInUser"))?.userId;
                    const response = await axios.get(`http://localhost:8080/getdetail/${id}`);
                    console.log(response.data);
                    setUser(response.data);
               } catch (error) {
                    console.error('Error fetching user details:', error);
               }
          };

          // Fetch education details
          const fetchEducationDetails = async () => {
               try {
                    const id = JSON.parse(localStorage.getItem("loggedInUser"))?.userId;
                    const response = await axios.get(`http://localhost:8080/geteducations/${id}`);
                    console.log(response.data);
                    setEducation(response.data);
               } catch (error) {
                    console.error('Error fetching education details:', error);
               }
          };

          // Fetch work experience details
          const fetchWorkExperience = async () => {
               try {
                    const id = JSON.parse(localStorage.getItem("loggedInUser"))?.userId;
                    const response = await axios.get(`http://localhost:8080/getexperiences/${id}`);
                    console.log(response.data);
                    setWork(response.data);
               } catch (error) {
                    console.error('Error fetching work experience details:', error);
               }
          };

          // Fetch skills
          const fetchSkills = async () => {
               try {
                    const id = JSON.parse(localStorage.getItem("loggedInUser"))?.userId;
                    const response = await axios.get(`http://localhost:8080/getuserskills/${id}`);
                    console.log(response.data);
                    setSkills(response.data);
               } catch (error) {
                    console.error('Error fetching skills:', error);
               }
          };

          fetchUserDetails();
          fetchEducationDetails();
          fetchWorkExperience();
          fetchSkills();
     }, []);

     const pdfRef3 = useRef();

     const handleDownLoad3 = () => {

          const input = pdfRef3.current;
          html2canvas(input).then((canvas) => {
               const imgData = canvas.toDataURL('img/png');
               const pdf = new jsPDF('p', 'mm', 'a4', true);
               const pdfWidth = pdf.internal.pageSize.getWidth();
               const pdfHeight = pdf.internal.pageSize.getHeight();
               const imgWidth = canvas.width;
               const imgHeight = canvas.height;
               const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
               const imgX = (pdfWidth - imgWidth * ratio) / 2;
               // const imgY = 30;
               const imgY = (pdfHeight - imgHeight * ratio) / 2;
               pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
               pdf.save('template3.pdf');

          });
     }

     const handleImageUpload = (event) => {
          const file = event.target.files[0];
          if (file) {
               const reader = new FileReader();
               reader.onloadend = () => {
                    setUserImage(reader.result);
                    setIsHoveredImage(false);
               };
               reader.readAsDataURL(file);
          }
     };

     const handleDeleteImage = () => {
          setUserImage('');
          setIsHoveredImage(false);
     }

     return (
          <>
               <button onClick={handleDownLoad3} className='bg-purple-500 text-white p-2 rounded-md hover:bg-purple-700'>download</button>
               <div id='resume-template-3' ref={pdfRef3} className="flex flex-col bg-gray-100 mt-5 mb-5 ml-52 mr-52 relative border border-gray-200" style={{ width: '1000px' }}>
                    <div className="flex flex-col items-end justify-center gap-5 bg-red-200 p-4 mt-8 h-40">
                         <h1 className="text-5xl font-bold text-end text-black" style={{ letterSpacing: '.5rem' }}>{user?.firstName} <br /> {user?.lastName}</h1>
                         <h5 className="text-lg text-black">{user?.role}</h5>
                    </div>

                    <div className="bg-teal-600 text-gray-200 p-8 w-96 absolute top-3 left-10 h-fit">

                         <div className='mb-16 flex justify-center'>
                              {userImage
                                   ?
                                   <>

                                        <div className='border-2 border-gray-200 w-52 h-52 rounded-full flex justify-center items-center overflow-hidden relative' onMouseEnter={() => { setIsHover(true); setIsHoveredImage(true); }} onMouseLeave={() => { setIsHover(false); setIsHoveredImage(false); }}>
                                             <img alt='' src={userImage} className='w-full h-full object-cover' />
                                             {isHoveredImage && (
                                                  <div className='absolute top-0 left-0 w-full h-full bg-gray-200 opacity-75'></div>
                                             )}
                                             {isHover &&
                                                  <div className='absolute top-8 right-8 w-8 h-8 rounded-md flex items-center justify-center bg-red-500 cursor-pointer' onClick={handleDeleteImage}>
                                                       <FaTrash className='text-sm text-white' />
                                                  </div>
                                             }

                                        </div>
                                   </>
                                   :
                                   <label>
                                        <div className='border-4 border-gray-200 bg-gray-200 w-52 h-52 rounded-full flex flex-col items-center justify-center cursor-pointer gap-1'>
                                             <FaUpload className='text-purple-600 text-3xl' />
                                             <p className='text-gray-400'>Click to Upload</p>
                                        </div>
                                        <input type="file" className='w-0 h-0' accept=".jpeg,.jpg,.png" onChange={handleImageUpload} />
                                   </label>
                              }
                         </div>

                         <div className="mb-16">
                              <h2 className="text-2xl font-bold mb-4 tracking-widest">SKILLS</h2>
                              <ul className='list-disc pl-4'>
                                   {skills && skills.map((skill, index) => (
                                        <li key={index}>{skill}</li>
                                   ))}
                              </ul>
                         </div>

                         <div>
                              <h2 className="text-2xl font-bold mb-4 tracking-widest">CONTACT</h2>
                              <div className="flex items-center m-2">
                                   <FaEnvelope className="mr-2" />
                                   <p>{user?.email}</p>
                              </div>

                              <div className="flex items-center m-2">
                                   <FaPhoneAlt className="mr-2" />
                                   <p>{user?.phone}</p>
                              </div>

                              <div className="flex items-start m-2">
                                   <FaLocationDot className="mr-2 text-2xl" />
                                   <p>{user?.address}</p>
                              </div>

                         </div>
                    </div>

                    <div className="text-gray-800 p-8 flex flex-col flex-1 items-end justify-center">

                         <div className="mb-12 w-1/2 items-end">
                              <h2 className="text-2xl font-bold mb-4 tracking-widest">PROFILE</h2>
                              <p className='tracking-tight'>{user?.about}</p>
                         </div>

                         <div className="mb-12 w-1/2 items-end">
                              <h2 className="text-2xl font-bold mb-4 tracking-widest">EDUCATION</h2>
                              {education && education.map((ed, index) => (
                                   <div className='mb-3' key={index}>
                                        <h3 className='text-lg font-bold'>{ed?.degree}</h3>
                                        <p>{ed?.university} , {ed?.startYear}-{ed?.endYear}</p>
                                   </div>
                              ))}
                         </div>

                         <div className="mb-3 w-1/2">
                              <h2 className="text-2xl font-bold mb-4 tracking-widest">WORK EXPERIENCE</h2>
                              {work && work.map((work, index) => (
                                   <div className='mb-6' key={index}>
                                        <div className='flex items-center'>
                                             <GoDot className='mr-2' />
                                             <h3 className='text-lg font-bold tracking-wide'>{work?.startYear} - {work?.endYear}</h3>
                                        </div>
                                        <div className='pl-6'>
                                             <p>{work?.organization}</p>
                                             <p className='text-md font-bold mt-1'>{work?.jobTitle}</p>
                                             <p>{work?.jobDescription}</p>
                                        </div>
                                   </div>
                              ))}
                         </div>
                    </div>

               </div>

          </>
     );

}

export default Template3;
