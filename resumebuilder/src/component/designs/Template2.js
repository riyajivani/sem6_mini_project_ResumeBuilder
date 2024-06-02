import React, { useRef, useState, useEffect } from 'react';
import { FaEnvelope, FaPhoneAlt } from 'react-icons/fa';
import { FaLocationDot } from "react-icons/fa6";
import { GoDot } from "react-icons/go";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import axios from 'axios';
const dburl = process.env.REACT_APP_URL

const Template2 = () => {
     // let user = JSON.parse(localStorage.getItem("userDetails"))
     // let education = JSON.parse(localStorage.getItem("educationDetails"))
     // let work = JSON.parse(localStorage.getItem("workExperience"))
     // let skills = JSON.parse(localStorage.getItem("selectedSkills"));

     const [user, setUser] = useState(null);
     const [education, setEducation] = useState([]);
     const [work, setWork] = useState([]);
     const [skills, setSkills] = useState([]);

     useEffect(() => {

          // Fetch user details
          const fetchUserDetails = async () => {
               try {
                    const id = JSON.parse(localStorage.getItem("loggedInUser"))?.userId;
                    const response = await axios.get(`${dburl}/getdetail/${id}`);
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
                    const response = await axios.get(`${dburl}/geteducations/${id}`);
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
                    const response = await axios.get(`${dburl}/getexperiences/${id}`);
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
                    const response = await axios.get(`${dburl}/getuserskills/${id}`);
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


     const pdfRef2 = useRef();

     const handleDownLoad2 = () => {
          const input = pdfRef2.current;
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
               pdf.save('template2.pdf');

          });
     }

     return (
          <>
               <button onClick={handleDownLoad2} className='bg-purple-500 text-white p-2 rounded-md hover:bg-purple-700'>download</button>

               <div id='resume-template-2' ref={pdfRef2} className="flex flex-col bg-white mt-5 mb-5 ml-52 mr-52">
                    <div className="flex flex-col items-center justify-center gap-5 bg-slate-300 p-4 h-40">
                         <h1 className="text-5xl font-bold text-center text-black">{user?.firstName} {user?.lastName}</h1>
                         <h5 className="text-lg text-center text-black">{user?.role}</h5>
                    </div>

                    <div className="flex flex-row justify-start h-full">
                         {/* Left side - Profile and Contact */}
                         <div className="bg-slate-200 text-gray-800 p-8 mb-3 w-1/2">
                              <div className="mb-16">
                                   <h2 className="text-2xl font-bold mb-4 tracking-widest">PROFILE</h2>
                                   <p className='tracking-tight'>{user?.about}</p>
                              </div>

                              <div className="mb-32">
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

                         {/* Right side - Education, Skills, and Experience */}
                         <div className="text-gray-800 p-8">
                              <div className="mb-12">
                                   <h2 className="text-2xl font-bold mb-4 tracking-widest">EDUCATION</h2>
                                   {education && education.map((ed, index) => (
                                        <div className='mb-3' key={index}>

                                             <h3 className='text-lg font-bold'>{ed?.degree}</h3>
                                             <p>{ed?.university} , {ed?.startYear}-{ed?.endYear}</p>
                                        </div>
                                   ))}
                              </div>

                              <div className="mb-12">
                                   <h2 className="text-2xl font-bold mb-4 tracking-widest">SKILLS</h2>
                                   {skills && skills.map((skill, index) => (
                                        <p key={index} className='mb-1'>{skill}</p>
                                   ))}
                              </div>

                              <div className="mb-3">
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
               </div>
          </>
     );
};

export default Template2;
