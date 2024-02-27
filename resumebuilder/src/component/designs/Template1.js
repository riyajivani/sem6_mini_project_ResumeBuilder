import React, { useRef, useState, useEffect } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import axios from 'axios';

const Template1 = () => {
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

     const pdfRef1 = useRef();

     const handleDownLoad1 = () => {

          const input = pdfRef1.current;
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
               pdf.save('template1.pdf');

          });
     }

     return (
          <>
               <button onClick={handleDownLoad1} className='bg-purple-500 text-white p-2 rounded-md hover:bg-purple-700'>download</button>

               <div id='resume-template-1' ref={pdfRef1} className="flex flex-col bg-gray-200 mt-5 mb-5 ml-52 mr-52 h-full"> {/* style={{ width: '600px' }}*/}
                    <div className="flex flex-col items-start justify-start gap-2 p-4">
                         <h1 className="text-5xl font-normal text-start text-black mb-3" style={{ letterSpacing: '1rem' }}>{user?.firstName} <br /> {user?.lastName}</h1>
                         <p className='border-b-2 border-b-black w-full'></p>
                         <h5 className="text-lg text-center text-black">{user?.role}</h5>
                         <p className='border-b-2 border-b-black w-full'></p>
                    </div>

                    <div className="flex flex-row justify-start h-full">
                         {/* Left side - Profile and Contact */}
                         <div className="text-black p-8 mb-3 w-1/2 flex flex-col gap-5">
                              <div>
                                   <h2 className="text-2xl font-bold mb-2 tracking-widest">ABOUT ME</h2>
                                   <p className='border-b-2 border-b-black w-full mb-4'></p>
                                   <p className='tracking-tight text-justify w-full'>{user?.about}</p>
                              </div>

                              <div>
                                   <h2 className="text-2xl font-bold mb-2 tracking-widest">CONTACT</h2>
                                   <p className='border-b-2 border-b-black w-full mb-4'></p>
                                   <div className="flex items-center m-2">
                                        {/* <FaEnvelope className="mr-2" /> */}
                                        <p className="mr-2 font-bold">Email:</p>
                                        <p>{user?.email}</p>
                                   </div>

                                   <div className="flex items-center m-2">
                                        {/* <FaPhoneAlt className="mr-2" /> */}
                                        <p className="mr-2 font-bold">Phone:</p>
                                        <p>{user?.phone}</p>
                                   </div>

                                   <div className="flex items-start m-2">
                                        {/* <FaLocationDot className="mr-2 text-2xl" /> */}
                                        <p className="mr-1 font-bold">Address:</p>
                                        <p>{user?.address}</p>
                                   </div>

                              </div>

                              <div>
                                   <h2 className="text-2xl font-bold mb-2 tracking-widest">SKILLS</h2>
                                   <p className='border-b-2 border-b-black w-full mb-4'></p>
                                   {skills && skills.map((skill, index) => (
                                        <p key={index} className='mb-1'>{skill}</p>
                                   ))}
                              </div>

                         </div>

                         {/* Right side - Education, Skills, and Experience */}
                         <div className="text-black p-8 w-full">
                              <div className="mb-12">
                                   <h2 className="text-2xl font-bold mb-2 tracking-widest">EDUCATION</h2>
                                   <p className='border-b-2 border-b-black w-full mb-4'></p>
                                   {education && education.map((ed, index) => (
                                        <div className='mb-3' key={index}>

                                             <h3 className='text-lg font-bold'>{ed?.degree}</h3>
                                             <p>{ed?.university}</p>
                                             <p className='font-medium'>{ed?.startYear}-{ed?.endYear}</p>
                                        </div>
                                   ))}
                              </div>

                              <div className="mb-3">
                                   <h2 className="text-2xl font-bold mb-2 tracking-widest">EXPERIENCES</h2>
                                   <p className='border-b-2 border-b-black w-full mb-4'></p>
                                   {work && work.map((work, index) => (
                                        <div className='mb-4 flex flex-row justify-start' key={index}>
                                             {/* <div className='flex items-center'>
                                                  <GoDot className='mr-2' />
                                                  <h3 className='text-lg font-bold tracking-wide'>{work?.startYear} - {work?.endYear}</h3>
                                             </div>
                                             <div className='pl-6'>
                                                  <p>{work?.organization}</p>
                                                  <p className='text-md font-bold mt-1'>{work?.jobTitle}</p>
                                                  <p>{work?.jobDescription}</p>
                                             </div> */}

                                             <div className='w-1/2 flex flex-col gap-1 mt-1'>
                                                  <p className='text-lg font-bold mt-1'>{work?.jobTitle}</p>
                                                  <h3 className='text-md tracking-wide'>{work?.startYear} - {work?.endYear}</h3>
                                             </div>

                                             <div className='w-full flex flex-col gap-1 mt-1'>
                                                  <p className='text-lg font-bold mt-1'>{work?.organization}</p>
                                                  <p className='text-justify'>{work?.jobDescription}</p>
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


export default Template1;
