import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/AppContext'
import { assets } from '../assets/assets';
import Messege from './Messege';

const ChatBox = () => {
  
  const {selectedChat,theme} = useAppContext();

  const [messages,setMessages] = useState([]);

  const [loading,setLoading] = useState(false);

  useEffect(()=>{
    if(selectedChat){
      setMessages(selectedChat.messages);
    }
  },[selectedChat])

  return (
    <div className='flex-1 flex flex-col justify-between m-5 md:m-10 xl:mx-30 max-md:mt-14 2xl:pr-40'>
      
      {/* Chat MESSAGES */}
      <div className='flex-1 mb-5 overflow-y-scroll'>
        {messages.length === 0 &&(
          <div className='h-full flex flex-col justify-center items-center gap-2 text-primary'>
            <img src={theme === 'dark' ? assets.logo_new : assets.logo_new} alt="" className='w-full max-w-56 sm:max-w-68'/>
            <p className='mt-5 text-4xl sm:text-6xl text-center text-gray-400 dark:text-white'>Ask Me Anything.</p>
          </div>
        )}

        {messages.map((message, index)=><Messege key={index} message={message} />)}
      </div> 

      {/* INPUT BOX */}
      <form>

      </form>
    </div>
  )
}

export default ChatBox
