import React, { useRef, useEffect, useState } from 'react';
import { FaEnvelope, FaPhoneAlt } from 'react-icons/fa';
import { FaLocationDot } from "react-icons/fa6";
import { GoDot } from "react-icons/go";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import axios from 'axios';

const Template4 = () => {

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

     const pdfRef4 = useRef();

     const handleDownLoad4 = () => {

          const input = pdfRef4.current;
          html2canvas(input).then((canvas) => {
               const imgData = canvas.toDataURL('img/png');
               const pdf = new jsPDF('p', 'mm', 'a4');
               const pdfWidth = pdf.internal.pageSize.getWidth();
               const pdfHeight = pdf.internal.pageSize.getHeight();
               const imgWidth = canvas.width;
               const imgHeight = canvas.height;
               const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
               const imgX = (pdfWidth - imgWidth * ratio) / 2;
               const imgY = (pdfHeight - imgHeight * ratio) / 2;
               pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
               pdf.save('template4.pdf');

          });
     }

     return (
          <>
               <button onClick={handleDownLoad4} className='bg-purple-500 text-white p-2 rounded-md hover:bg-purple-700'>download</button>

               <div id='resume-template-4' ref={pdfRef4} className="flex flex-col bg-white mt-5 mb-5 ml-52 mr-52">
                    <div className="flex flex-col items-center justify-center gap-5 bg-indigo-950 p-4 h-40">
                         <h1 className="text-5xl font-bold text-center text-white" style={{ letterSpacing: '.5rem' }}>{user?.firstName} {user?.lastName}</h1>
                         <h5 className="text-xl text-white">{user?.role}</h5>
                    </div>

                    <div className="p-8 w-fit">

                         <div className='mb-8 flex justify-between'>
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

                         <div className="mb-8">
                              <h2 className="text-2xl font-bold tracking-widest">SUMMARY</h2>
                              <hr className='h-px mb-8 mt-2 bg-gray-100 border-gray-100 border-2' />
                              <p className='tracking-tight'>{user?.about}</p>
                         </div>

                         <div className="mb-8">
                              <h2 className="text-2xl font-bold tracking-widest">SKILLS</h2>
                              <hr className='h-px mb-8 mt-2 bg-gray-100 border-gray-100 border-2' />
                              {skills && skills.map((skill, index) => (
                                   <p key={index} className='mb-1'>{skill}</p>
                              ))}
                         </div>

                         <div className="mb-12">
                              <h2 className="text-2xl font-bold tracking-widest">EDUCATION</h2>
                              <hr className='h-px mb-8 mt-2 bg-gray-100 border-gray-100 border-2' />
                              {education && education.map((ed, index) => (
                                   <div className='mb-3' key={index}>
                                        <h3 className='text-lg font-bold'>{ed?.degree}</h3>
                                        <p>{ed?.university} , {ed?.startYear}-{ed?.endYear}</p>
                                   </div>
                              ))}
                         </div>

                         <div className="mb-3">
                              <h2 className="text-2xl font-bold tracking-widest">WORK EXPERIENCE</h2>
                              <hr className='h-px mb-8 mt-2 bg-gray-100 border-gray-100 border-2' />

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
               </div >

          </>

     )
}

export default Template4