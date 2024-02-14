import React, { useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const Template1 = () => {
     const [name, setName] = useState('');
     const [email, setEmail] = useState('');
     const [phone, setPhone] = useState('');
     const [education, setEducation] = useState('');
     const [experience, setExperience] = useState('');

     const handleSaveAsPDF = () => {
          const content = document.getElementById('resume-template');

          html2canvas(content).then((canvas) => {
               const imgData = canvas.toDataURL('img/png');
               const doc = new jsPDF('l', 'em', 'a4');
               const componentWidth = doc.internal.pageSize.getWidth();
               const componentHeight = doc.internal.pageSize.getHeight();
               doc.addImage(imgData, 'PNG', 0, 0, componentWidth, componentHeight);
               doc.save('template1.pdf');
          })
     };

     return (
          <div id="resume-template" className="container mx-auto my-8 p-8 bg-gray-200 rounded-lg shadow-lg">
               <h1 className="text-3xl mb-4">Edit Your Resume</h1>
               <div className="mb-4">
                    <label className="block mb-2">Name:</label>
                    <input
                         type="text"
                         className="w-full p-2 border border-gray-300 rounded"
                         value={name}
                         onChange={(e) => setName(e.target.value)}
                    />
               </div>
               <div className="mb-4">
                    <label className="block mb-2">Email:</label>
                    <input
                         type="text"
                         className="w-full p-2 border border-gray-300 rounded"
                         value={email}
                         onChange={(e) => setEmail(e.target.value)}
                    />
               </div>
               <div className="mb-4">
                    <label className="block mb-2">Phone:</label>
                    <input
                         type="text"
                         className="w-full p-2 border border-gray-300 rounded"
                         value={phone}
                         onChange={(e) => setPhone(e.target.value)}
                    />
               </div>
               <div className="mb-4">
                    <label className="block mb-2">Education:</label>
                    <textarea
                         className="w-full p-2 border border-gray-300 rounded"
                         value={education}
                         onChange={(e) => setEducation(e.target.value)}
                    />
               </div>
               <div className="mb-4">
                    <label className="block mb-2">Experience:</label>
                    <textarea
                         className="w-full p-2 border border-gray-300 rounded"
                         value={experience}
                         onChange={(e) => setExperience(e.target.value)}
                    />
               </div>
               <button
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
                    onClick={handleSaveAsPDF}
               >
                    Save as PDF
               </button>
          </div>
     );
};

export default Template1;
