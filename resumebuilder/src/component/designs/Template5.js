import React, { useRef, useEffect, useState } from 'react';
import { FaEnvelope, FaPhoneAlt } from 'react-icons/fa';
import { FaLocationDot } from "react-icons/fa6";
import { GoDot } from "react-icons/go";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import axios from 'axios';

const Template5 = () => {

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

     const pdfRef5 = useRef();

     const handleDownLoad4 = () => {

          const input = pdfRef5.current;
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
               pdf.save('template5.pdf');

          });
     }

     return (
          <>
               <button onClick={handleDownLoad4} className='bg-purple-500 text-white p-2 rounded-md hover:bg-purple-700'>download</button>

               <div id='resume-template-4' ref={pdfRef5} className="flex flex-col bg-white mt-5 mb-5 ml-52 mr-52">
                    hii
               </div >

          </>

     )
}

export default Template5