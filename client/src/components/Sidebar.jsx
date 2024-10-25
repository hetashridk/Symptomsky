// src/components/Sidebar.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useAnimation, AnimatePresence } from 'framer-motion'; // Import Framer Motion
import Logo from '../assets/images/Logo.png';
import Heart from '../assets/images/heart.png';
import Diabetes from '../assets/images/diabetes.png';
import MonkeyPox from '../assets/images/MonkeyPox.png';

function Sidebar() {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const controls = useAnimation(); // Controls for animation
  const Items = [
    { title: "Diabetes", src: Diabetes, alt: "Diabetes", path: "/diabetes" },
    { title: "Heart Disease", src: Heart, alt: "Heart Disease", path: "/heart" },
    { title: "Monkey Pox", src: MonkeyPox, alt: "Monkey Pox", path: "/monkeyPox" },
  ];

  const handleNavigation = (path) => {
    const isAuthenticated = localStorage.getItem('token');
    if (isAuthenticated) {
      navigate(path);
    } else {
      setShowModal(true);
    }
  };

  // Variants for staggered fade-in-up animation
  const listVariants = {
    hidden: { opacity: 0, y: 40 }, // Initial state: faded out and shifted down
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1, // Stagger animation by index
        duration: 0.8,
        ease: 'easeOut',
      },
    }),
  };

  return (
    <div className='border flex flex-col rounded-r-3xl w-[341px] h-[980px] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]'>
      <motion.div
        className='flex justify-center items-center space-x-7 m-4'
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      >
        <img src={Logo} alt='Logo' className='w-[65px]' />
        <p className='font-bold text-2xl text-[#005F73]'>SymptomSky</p>
      </motion.div>

      <div>
        <hr />
      </div>

      {/* List Section with Fade-In-Up Animation */}
      <div className='m-14 flex flex-col justify-center items-center'>
        <ul className='space-y-5'>
          <AnimatePresence>
            {Items.map((item, index) => (
              <motion.li
                key={index}
                className='hover:bg-[#C2E3EB] w-[341px] p-2'
                initial='hidden'
                animate='visible'
                exit={{ opacity: 0, y: 20 }}
                custom={index} // Pass index for staggered animation
                variants={listVariants} // Apply animation variants
              >
                <div
                  onClick={() => handleNavigation(item.path)}
                  className='flex space-x-5 cursor-pointer'
                >
                  <img src={item.src} alt={item.alt} className='w-[50px]' />
                  <span className='font-semibold text-2xl text-[#005F73] mt-1'>
                    {item.title}
                  </span>
                </div>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </div>

      {showModal && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
      <div className="flex justify-center items-center m-5 text-[#005F73]">
        <p className="font-bold text-3xl">Attention</p>
      </div>
      <div className="text-center mb-4">
        <h2 className="text-2xl mb-4 text-[#005F73] font-semibold">You need to login first</h2>
        <button onClick={() => setShowModal(false)} className="bg-[#005F73] text-white px-4 py-2 rounded-md">Close</button>
      </div>
    </div>
  </div>
)}
    </div>
  );
}

export default Sidebar;