import React, { useState } from 'react';
import axios from 'axios';
import Chatbot from '../components/Chatbot';
import { motion } from 'framer-motion';

function Diabetes() {
  const [formData, setFormData] = useState({
    age: '',
    gender: '',
    polyuria: '',
    polydipsia: '',
    suddenWeightLoss: '',
    weakness: '',
    polyphagia: '',
    genitalThrush: '',
    visualBlurring: '',
    itching: '',
    irritability: '',
    delayedHealing: '',
    partialParesis: '',
    muscleStiffness: '',
    alopecia: '',
    obesity: '',
  });
  const [prediction, setPrediction] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    try {
      const response = await axios.post('http://127.0.0.1:5000/api/predictDiabetes', formData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (response.data.prediction) {
        setPrediction(response.data.prediction);
      } else {
        alert('Error submitting data');
      }
    } catch (error) {
      console.log('Error:', error);
      alert('Error submitting data');
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
    <div className='bg-[#e5e5e5] w-full h-full flex flex-col items-center p-4'>
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
              Diabetes
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
            {Object.keys(formData).map((key, index) => (
              <motion.div
                className='mb-4'
                key={key}
                variants={fadeInUpVariants}
                custom={3 + index} // Start custom delay for each field
              >
                <label htmlFor={key} className='block mb-1 text-[#005F73] font-semibold'>
                  {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                </label>
                <input
                  type={key === 'age' ? 'number' : 'text'}
                  id={key}
                  name={key}
                  className='rounded-md border border-3 bg-[#C2E3EB] border-[#005F73] px-3 py-2'
                  value={formData[key]}
                  onChange={handleChange}
                />
              </motion.div>
            ))}
            <motion.button
              type='submit'
              className='bg-[#005F73] text-white px-4 py-2 rounded-md col-span-2'
              variants={fadeInUpVariants}
              custom={19} // Delay for submit button
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
              custom={20} // Delay for prediction text
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
            <Chatbot />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Diabetes;
