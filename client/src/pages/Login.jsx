// src/pages/Login.jsx
import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion, useAnimation, useInView } from 'framer-motion';

const Login = ({ setAuth }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const controls = useAnimation(); // Animation controls for the form and its children
  const formRef = useRef(null); // Ref for the form
  const isInView = useInView(formRef, { threshold: 0.1 }); // Trigger when 10% of the form is visible

  // Trigger animations when the form enters the viewport
  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    } else {
      controls.start('hidden');
    }
  }, [isInView, controls]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/auth/login', {
        name: username,
        password,
      });
      localStorage.setItem('token', response.data.token);
      setAuth(true);
      navigate('/diabetes');
    } catch (error) {
      alert(error.response.data.error);
    }
  };

  // Variants for the form and child elements
  const formVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
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
        {/* Form container with fade-in animation */}
        <motion.div
          ref={formRef}
          className='bg-white shadow-lg rounded-lg p-6 w-full md:w-[48%] mb-4 md:mb-0'
          initial='hidden'
          animate={controls}
          variants={formVariants}
        >
          <div className='flex justify-center items-center m-5 text-[#005F73]'>
            <p className='font-bold text-3xl'>Login</p>
          </div>

          {/* Form with staggered child animations */}
          <form className='grid grid-cols-1 gap-4' onSubmit={handleLogin}>
            {['username', 'password'].map((field, index) => (
              <motion.div
                key={field}
                className='mb-4'
                custom={index} // Pass index to stagger animation
                initial='hidden'
                animate={controls}
                variants={childVariants}
              >
                <label
                  htmlFor={field}
                  className='block mb-1 text-[#005F73] font-semibold'
                >
                  {field === 'username' ? 'Username' : 'Password'}
                </label>
                <input
                  type={field === 'password' ? 'password' : 'text'}
                  id={field}
                  name={field}
                  className='rounded-md border border-3 bg-[#C2E3EB] border-[#005F73] px-3 py-2 w-full'
                  value={field === 'username' ? username : password}
                  onChange={(e) =>
                    field === 'username'
                      ? setUsername(e.target.value)
                      : setPassword(e.target.value)
                  }
                />
              </motion.div>
            ))}

            <motion.button
              type='submit'
              className='bg-[#005F73] text-white px-4 py-2 rounded-md'
              custom={2} // Stagger index for the button
              initial='hidden'
              animate={controls}
              variants={childVariants}
            >
              Login
            </motion.button>
          </form>

          <motion.div
            className='flex items-center justify-center mt-4'
            custom={3} // Stagger index for the link section
            initial='hidden'
            animate={controls}
            variants={childVariants}
          >
            <p className='text-[#005F73]'>
              Don't have an account?{' '}
              <Link to='/signup' className='text-[#005F73] font-medium'>
                Sign Up
              </Link>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
