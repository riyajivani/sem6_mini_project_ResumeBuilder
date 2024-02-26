import React, { useRef } from 'react';
import { FaEnvelope, FaPhoneAlt } from 'react-icons/fa';
import { FaLocationDot } from "react-icons/fa6";
import { GoDot } from "react-icons/go";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const Template3 = () => {
     let user = JSON.parse(localStorage.getItem("userDetails"))
     let education = JSON.parse(localStorage.getItem("educationDetails"))
     let work = JSON.parse(localStorage.getItem("workExperience"))
     let skills = JSON.parse(localStorage.getItem("selectedSkills"));

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

     return (
          <>
               <button onClick={handleDownLoad3} className='bg-purple-500 text-white p-2 rounded-md hover:bg-purple-700'>download</button>

               <div id='resume-template-3' ref={pdfRef3} className="flex flex-col bg-gray-100 mt-5 mb-5 ml-52 mr-52 relative border border-gray-200">
                    <div className="flex flex-col items-end justify-center gap-5 bg-red-200 p-4 mt-8 h-40">
                         <h1 className="text-5xl font-bold text-center text-black" style={{ letterSpacing: '.5rem' }}>{user?.firstName} <br /> {user?.lastName}</h1>
                         <h5 className="text-lg text-black">{user?.role}</h5>
                    </div>

                    <div className="bg-teal-600 text-gray-200 p-8 w-96 absolute top-3 left-10 h-fit">

                         <div className='mb-16 flex justify-center'>
                              <img className='border-4 border-gray-200 w-52 h-52 rounded-full flex justify-center items-center' src='https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhTOacmDSSuZrHW9dHOJRtr7HP6cjcHquSMJKu9S5Sz5sEd509AjRAoFqCqmvNyVZEwW3KgcSeSDR8as4W-T0mbJt-ZlFw7DE3CASJF2AMfe0Zx9eHVEfO5T8hUdY5Y5JVkFceVM_GiEUoynH0lNAcV4mpUZsm-dsJzc-BFDhZ2WP5cWIoO2Jhiie24VPXg/s1380/Template1.jpg' alt='' />
                         </div>

                         <div className="mb-16">
                              <h2 className="text-2xl font-bold mb-4 tracking-widest">PROFILE</h2>
                              <p className='tracking-tight'>{user?.about}</p>
                         </div>

                         <div className="mb-16">
                              <h2 className="text-2xl font-bold mb-4 tracking-widest">SKILLS</h2>
                              {skills.map((skill, index) => (
                                   <p key={index} className='mb-1'>{skill}</p>
                              ))}
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
                              <h2 className="text-2xl font-bold mb-4 tracking-widest">EDUCATION</h2>
                              {education.education.map((ed, index) => (
                                   <div className='mb-3' key={index}>
                                        <h3 className='text-lg font-bold'>{ed?.degree}</h3>
                                        <p>{ed?.university} , {ed?.startYear}-{ed?.endYear}</p>
                                   </div>
                              ))}
                         </div>

                         <div className="mb-3 w-1/2">
                              <h2 className="text-2xl font-bold mb-4 tracking-widest">WORK EXPERIENCE</h2>
                              {work.experiences.map((work, index) => (
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
