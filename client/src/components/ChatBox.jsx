import React, { useEffect, useState, useRef } from 'react';
import { useAppContext } from '../context/AppContext';
import Messege from './Messege';
import toast from 'react-hot-toast';
import PropelLogo from './PropelLogo';
import { Send, Square, Sparkles, ChevronDown } from 'lucide-react';

const ChatBox = () => {

  const containerRef = useRef(null);
  
  const { selectedChat, theme, user, axios, token, setUser } = useAppContext();

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [mode, setMode] = useState('text');
  const [isPublished, setIsPublished] = useState(false);

  const onSubmit = async (e) => {
    try {
      e.preventDefault();
      if (!user) return toast.error('Please login to continue');
      if (!prompt.trim()) return;

      setLoading(true);
      const promptCopy = prompt;  
      setPrompt('');
      setMessages(prev => [...prev, { role: 'user', content: promptCopy, timestamp: Date.now(), isImages: false }]);

      const { data } = await axios.post(
        `/api/message/${mode}`, 
        { chatId: selectedChat?._id, prompt: promptCopy, isPublished }, 
        { headers: { Authorization: token } }
      );

      if (data.success) {
        setMessages(prev => [...prev, data.reply]);
        if (mode === 'image') {
          setUser(prev => ({
            ...prev,
            credits: prev.credits - 2
          }));
        } else {
          setUser(prev => ({
            ...prev,
            credits: prev.credits - 1
          }));
        }
      } else {
        toast.error(data.message);
        setPrompt(promptCopy);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedChat) {
      setMessages(selectedChat.messages);
    }
  }, [selectedChat]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({ top: containerRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className="flex-1 flex flex-col justify-between h-screen p-4 sm:p-6 lg:p-8 bg-[#F8F7FC] dark:bg-[#0B0A12] text-[#0F0C1B] dark:text-[#F4F2F8] max-md:pt-14 relative overflow-hidden transition-colors">
      
      {/* CHAT MESSAGES CONTAINER */}
      <div ref={containerRef} className="flex-1 overflow-y-scroll space-y-4 pr-2 max-w-4xl w-full mx-auto">
        {messages.length === 0 && (
          <div className="h-full flex flex-col justify-center items-center gap-3 text-center my-auto py-12">
            
            {/* Popout Reusable Propel Logo */}
            <PropelLogo size="lg" showBadge={true} className="mb-2" />

            <h1 className="font-geist text-[28px] sm:text-[36px] font-semibold text-[#0F0C1B] dark:text-[#F4F2F8] tracking-tight">
              Ask Me Anything.
            </h1>
            <p className="text-[15px] text-[#645D75] dark:text-[#9C97AE] max-w-[440px] leading-relaxed">
              Start a conversation powered by Google Gemini 2.5 Flash or generate high-resolution AI images with ImageKit.
            </p>
          </div>
        )}

        {messages.map((message, index) => (
          <Messege key={index} message={message} />
        ))}
        
        {/* LOADING SPINNER */}
        {loading && (
          <div className="flex items-center gap-2 text-[#7C3AED] p-3 bg-white dark:bg-[#151320] border border-[#E5E2EE] dark:border-white/[0.08] rounded-xl max-w-xs my-3 animate-pulse shadow-sm">
            <div className="w-4 h-4 rounded-full border-2 border-[#7C3AED] border-t-transparent animate-spin" />
            <span className="text-[13px] font-mono text-[#645D75] dark:text-[#9C97AE]">Generating AI response...</span>
          </div>
        )}
      </div> 

      {/* PROMPT INPUT SECTION */}
      <div className="max-w-4xl w-full mx-auto pt-3">
        
        {/* Community Image Publishing Checkbox */}
        {mode === 'image' && (
          <label className="inline-flex items-center gap-2 mb-3 text-[13px] text-[#645D75] dark:text-[#9C97AE] cursor-pointer mx-auto justify-center w-full">
            <input 
              type="checkbox" 
              className="accent-[#7C3AED] rounded cursor-pointer w-4 h-4" 
              checked={isPublished} 
              onChange={(e) => setIsPublished(e.target.checked)}
            />
            <span>Publish Generated Image to Community Showcase</span>
          </label>
        )}

        {/* INPUT FORM CONTAINER */}
        <form 
          onSubmit={onSubmit} 
          className="bg-white dark:bg-[#151320] border border-[#E5E2EE] dark:border-white/[0.08] focus-within:border-[#7C3AED]/60 focus-within:ring-2 focus-within:ring-[#7C3AED]/30 rounded-2xl p-1.5 sm:p-2.5 pl-2.5 sm:pl-3.5 flex items-center gap-1.5 sm:gap-2 transition-all shadow-lg"
        >
          {/* Mode Selector Dropdown */}
          <div className="relative shrink-0">
            <select 
              onChange={(e) => setMode(e.target.value)} 
              value={mode} 
              className="appearance-none bg-[#F4F3F8] dark:bg-[#1E1730] border border-[#E5E2EE] dark:border-white/[0.12] text-[#0F0C1B] dark:text-[#F4F2F8] text-[12px] sm:text-[13px] font-medium py-1.5 sm:py-2 pl-2 sm:pl-3 pr-6 sm:pr-8 rounded-xl outline-none focus:ring-1 focus:ring-[#7C3AED] cursor-pointer"
            >
              <option value="text">Text (1 Credit)</option>
              <option value="image">Image (2 Credits)</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-[#645D75] dark:text-[#9C97AE] absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Prompt Input Textarea / Input */}
          <input 
            onChange={(e) => setPrompt(e.target.value)} 
            value={prompt} 
            type="text" 
            placeholder="Type your prompt here..." 
            className="flex-1 bg-transparent text-[#0F0C1B] dark:text-[#F4F2F8] placeholder-[#645D75] dark:placeholder-[#6B6478] text-[13px] sm:text-[14px] outline-none px-1 sm:px-2 min-w-0" 
            required 
            disabled={loading}
          />

          {/* Send Action Button */}
          <button 
            type="submit"
            disabled={loading || !prompt.trim()}
            className="w-9 h-9 rounded-xl bg-[#7C3AED] hover:bg-[#6D28D9] disabled:bg-[#D8D3E5] dark:disabled:bg-[#3A3450] text-white flex items-center justify-center transition-all duration-200 hover:scale-[1.04] focus:outline-none focus:ring-2 focus:ring-[#7C3AED] cursor-pointer disabled:cursor-not-allowed shrink-0 shadow-sm"
            title="Send prompt"
          >
            {loading ? <Square className="w-4 h-4 fill-current text-white" /> : <Send className="w-4 h-4 fill-current" />}
          </button>
        </form>

      </div>

    </div>
  );
};

export default ChatBox;
