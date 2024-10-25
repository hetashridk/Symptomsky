import React, { useState } from 'react';
import axios from 'axios';
import ChatbotMonkey from '../components/ChatbotMonkey';
import { motion } from 'framer-motion';

function MonkeyPox() {
  const [photo, setPhoto] = useState(null);
  const [prediction, setPrediction] = useState('');

  const handleChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('photo', photo);

    try {
      const response = await axios.post('http://127.0.0.1:5000/api/predictMonkey', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
      if (response.data.prediction) {
        setPrediction(response.data.prediction);
      } else {
        alert('Error uploading photo');
      }
    } catch (error) {
      console.log('Error:', error);
      alert('Error uploading photo');
    }
  };

  // Animation variants for fade-in-up
  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.5, ease: 'easeOut' },
    }),
  };

  return (
    <div className='bg-[#e5e5e5] w-full flex flex-col items-center p-4'>
      <div className='flex flex-wrap justify-around w-full max-w-6xl'>
        {/* Parameters */}
        <motion.div
          className='bg-white shadow-lg rounded-lg p-6 w-full md:w-[48%] mb-4 md:mb-0'
          initial='hidden'
          animate='visible'
          variants={fadeInUpVariants}
          custom={0}
        >
          <div className='flex justify-center items-center m-5 text-[#005F73]'>
            <motion.p className='font-bold text-3xl' custom={1} variants={fadeInUpVariants}>
              MonkeyPox
            </motion.p>
          </div>
          <motion.form
            className='grid grid-cols-2 gap-4'
            onSubmit={handleSubmit}
            initial='hidden'
            animate='visible'
            variants={fadeInUpVariants}
            custom={2}
          >
            <motion.div className='mb-4 col-span-2' variants={fadeInUpVariants} custom={3}>
              <label htmlFor='photo' className='block mb-1 text-[#005F73] font-semibold'>Photo</label>
              <input
                type='file'
                id='photo'
                name='photo'
                className='rounded-md border border-3 bg-[#C2E3EB] border-[#005F73] px-3 py-2 w-full'
                onChange={handleChange}
              />
            </motion.div>
            <motion.div className='mb-4 col-span-2' variants={fadeInUpVariants} custom={4}>
              <label htmlFor='fever' className='block mb-1 text-[#005F73] font-semibold'>Fever</label>
              <input
                type='text'
                id='fever'
                name='fever'
                className='rounded-md border border-3 bg-[#C2E3EB] border-[#005F73] px-3 py-2 w-full'
              />
            </motion.div>
            <motion.div className='mb-4 col-span-2' variants={fadeInUpVariants} custom={5}>
              <label htmlFor='headAche' className='block mb-1 text-[#005F73] font-semibold'>Head ache/ muscle ache</label>
              <input
                type='text'
                id='headAche'
                name='headAche'
                className='rounded-md border border-3 bg-[#C2E3EB] border-[#005F73] px-3 py-2 w-full'
              />
            </motion.div>
            <motion.div className='mb-4 col-span-2' variants={fadeInUpVariants} custom={6}>
              <label htmlFor='swollenLymphNodes' className='block mb-1 text-[#005F73] font-semibold'>Swollen lymph nodes (Lump like structure in neck / armpits)</label>
              <input
                type='text'
                id='swollenLymphNodes'
                name='swollenLymphNodes'
                className='rounded-md border border-3 bg-[#C2E3EB] border-[#005F73] px-3 py-2 w-full'
              />
            </motion.div>
            <motion.button
              type='submit'
              className='bg-[#005F73] text-white px-4 py-2 rounded-md col-span-2'
              variants={fadeInUpVariants}
              custom={7} // Delay for submit button
            >
              Submit
            </motion.button>
          </motion.form>
          {prediction && (
            <motion.div
              className='mt-4'
              initial='hidden'
              animate='visible'
              variants={fadeInUpVariants}
              custom={8} // Delay for prediction text
            >
              <p className='text-[#005F73] font-semibold'>Prediction: {prediction}</p>
            </motion.div>
          )}
        </motion.div>

        {/* Chatbot */}
        <motion.div
          className='bg-white shadow-lg rounded-lg p-6 w-full md:w-[48%]'
          initial='hidden'
          animate='visible'
          variants={fadeInUpVariants}
          custom={5} // Delay for the Chatbot
        >
          <div className='flex justify-center items-center mb-5 text-[#005F73]'>
            <ChatbotMonkey />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default MonkeyPox;
