import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { motion, useAnimation, useInView } from 'framer-motion';

const Chatbot = () => {
  const [question, setQuestion] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  const controls = useAnimation(); // Controls animation for the outer sections
  const chatRef = useRef(null); // Ref for detecting when the component is in view
  const isInView = useInView(chatRef, { threshold: 0.1 });

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    } else {
      controls.start('hidden');
    }
  }, [isInView, controls]);

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.5, ease: 'easeOut' },
    }),
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        'http://127.0.0.1:5174/api/diabetesChatbot',
        { question },
        { headers: { 'Content-Type': 'application/json' } }
      );
      const response = res.data.response || res.data.error;
      setChatHistory([...chatHistory, { question, response }]);
      setQuestion('');
    } catch (error) {
      setChatHistory([...chatHistory, { question, response: 'Error: ' + error.message }]);
      setQuestion('');
    }
  };

  return (
    <motion.div
      className='bg-white shadow-lg rounded-lg p-6 w-full h-full'
      ref={chatRef}
      initial='hidden'
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
      }}
    >
      <motion.div
        className='flex justify-center items-center mb-5 text-[#005F73]'
        custom={0}
        initial='hidden'
        animate={controls}
        variants={fadeInUpVariants}
      >
        <p className='font-bold text-3xl'>Chatbot</p>
      </motion.div>

      {/* Chat History Section without Animation */}
      <div className='flex flex-col h-96 bg-[#C2E3EB] border border-[#005F73] rounded overflow-y-scroll p-4'>
        {chatHistory.map((chat, index) => (
          <div key={index} className='mb-4'>
            <div className='text-right'>
              <div className='inline-block bg-blue-500 text-white p-2 rounded-lg'>
                {chat.question}
              </div>
            </div>
            <div className='text-left mt-2'>
              <div className='inline-block bg-gray-200 p-2 rounded-lg'>
                {chat.response}
              </div>
            </div>
          </div>
        ))}
      </div>

      <motion.form
        onSubmit={handleSubmit}
        className='mt-4 flex'
        custom={chatHistory.length + 2}
        initial='hidden'
        animate={controls}
        variants={fadeInUpVariants}
      >
        <input
          type='text'
          id='question'
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className='flex-grow shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          placeholder='Type your question...'
        />
        <button
          type='submit'
          className='ml-2 bg-[#005F73] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
        >
          Send
        </button>
      </motion.form>
    </motion.div>
  );
};

export default Chatbot;
