import React, { useEffect } from 'react';
import moment from 'moment';
import Markdown from 'react-markdown';
import prism from 'prismjs';
import { User } from 'lucide-react';

const Messege = ({ message }) => {

  useEffect(() => {
    prism.highlightAll();
  }, [message.content]);

  return (
    <div className="w-full">
      {message.role === "user" ? (
        <div className="flex items-start justify-end my-4 gap-3">
          <div className="flex flex-col items-end gap-1.5 max-w-2xl">
            <div className="p-3.5 px-4 bg-[#EDE9F6] dark:bg-[#1E1730] border border-[#7C3AED]/20 dark:border-white/[0.08] text-[#0F0C1B] dark:text-[#F4F2F8] rounded-[14px] text-[14px] leading-relaxed shadow-sm">
              <p>{message.content}</p>
            </div>
            <span className="text-[11px] font-mono text-[#645D75] dark:text-[#9C97AE] px-1">
              {moment(message.timestamp).fromNow()}
            </span>
          </div>
          <div className="w-8 h-8 rounded-full bg-[#EDE9F6] dark:bg-[#1E1730] border border-[#7C3AED]/30 dark:border-white/10 flex items-center justify-center text-[#7C3AED] dark:text-[#F4F2F8] shrink-0 mt-0.5 shadow-sm">
            <User className="w-4 h-4" />
          </div>
        </div>
      ) : (
        <div className="flex items-start my-4 gap-3">
          <div className="w-8 h-8 rounded-full bg-[#7C3AED] flex items-center justify-center text-white font-bold text-xs shrink-0 mt-0.5 shadow-sm">
            P
          </div>
          <div className="flex flex-col items-start gap-1.5 max-w-2xl">
            {message.isImages ? (
              <div className="p-2 bg-white dark:bg-[#151320] border border-[#E5E2EE] dark:border-white/[0.08] rounded-[16px] shadow-sm inline-block max-w-full">
                <img 
                  src={message.content} 
                  alt="AI Generated Output" 
                  className="w-full max-w-md sm:max-w-lg rounded-xl border border-black/10 dark:border-white/10 object-cover block" 
                />
              </div>
            ) : (
              <div className="p-4 bg-white dark:bg-[#151320] border border-[#E5E2EE] dark:border-white/[0.08] text-[#0F0C1B] dark:text-[#F4F2F8] rounded-[14px] text-[14px] leading-relaxed w-full shadow-sm">
                <div className="text-[14px] text-[#0F0C1B] dark:text-[#F4F2F8] leading-relaxed reset-tw">
                  <Markdown>{message.content}</Markdown>
                </div>
              </div>
            )}
            <span className="text-[11px] font-mono text-[#645D75] dark:text-[#9C97AE] px-1">
              {moment(message.timestamp).fromNow()}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Messege;
