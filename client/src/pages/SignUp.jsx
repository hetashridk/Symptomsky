// src/pages/SignUp.jsx
import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { motion, useAnimation, useInView } from 'framer-motion';

const SignUp = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const controls = useAnimation(); // Animation controls
  const formRef = useRef(null); // Ref for the form
  const isInView = useInView(formRef, { threshold: 0.1 }); // Trigger when 10% of the form is in view

  useEffect(() => {
    if (isInView) {
      controls.start('visible'); // Start animation when in view
    } else {
      controls.start('hidden'); // Reset animation when out of view
    }
  }, [isInView, controls]);

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/auth/signup', { name, password });
      alert(response.data.message);
      navigate('/diabetes');
    } catch (error) {
      alert(error.response.data.error);
    }
  };

  const formVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.5, ease: 'easeOut' },
    }),
  };

  return (
    <div className='bg-[#e5e5e5] w-full flex flex-col items-center p-4'>
      <div className='flex flex-wrap justify-around w-full max-w-6xl'>
        {/* Form with animation */}
        <motion.div
          ref={formRef}
          className='bg-white shadow-lg rounded-lg p-6 w-full md:w-[48%] mb-4 md:mb-0'
          initial='hidden'
          animate={controls}
          variants={formVariants}
        >
          <div className='flex justify-center items-center m-5 text-[#005F73]'>
            <p className='font-bold text-3xl'>Sign Up</p>
          </div>

          {/* Staggered animation for child elements */}
          <form className='grid grid-cols-1 gap-4' onSubmit={handleSignUp}>
            {['name', 'password'].map((field, index) => (
              <motion.div
                key={field}
                className='mb-4'
                custom={index}
                initial='hidden'
                animate={controls}
                variants={childVariants}
              >
                <label
                  htmlFor={field}
                  className='block mb-1 text-[#005F73] font-semibold'
                >
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <input
                  type={field === 'password' ? 'password' : 'text'}
                  id={field}
                  name={field}
                  className='rounded-md border border-3 bg-[#C2E3EB] border-[#005F73] px-3 py-2 w-full'
                  value={field === 'name' ? name : password}
                  onChange={(e) =>
                    field === 'name' ? setName(e.target.value) : setPassword(e.target.value)
                  }
                />
              </motion.div>
            ))}

            <motion.button
              type='submit'
              className='bg-[#005F73] text-white px-4 py-2 rounded-md'
              custom={2}
              initial='hidden'
              animate={controls}
              variants={childVariants}
            >
              Sign Up
            </motion.button>
          </form>

          <motion.div
            className='flex items-center justify-center mt-4'
            custom={3}
            initial='hidden'
            animate={controls}
            variants={childVariants}
          >
            <p className='text-[#005F73]'>
              Have an account?{' '}
              <Link to='/' className='text-[#005F73] font-medium'>
                Login
              </Link>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default SignUp;
