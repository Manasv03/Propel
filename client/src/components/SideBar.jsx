import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import moment from 'moment';
import toast from 'react-hot-toast';
import PolicyModal from './PolicyModal';
import PropelLogo from './PropelLogo';
import { Plus, Search, MessageSquare, Image as ImageIcon, CreditCard, Moon, Sun, User as UserIcon, LogOut, FileText, Trash2, X } from 'lucide-react';

const SideBar = ({ isMenuOpen, setIsMenuOpen }) => {

  const { chats, setSelectedChat, theme, setTheme, user, navigate, createNewChat, axios, setChats, fetchUsersChats, setToken, token, selectedChat } = useAppContext();

  const [search, setSearch] = useState('');
  const [showPolicies, setShowPolicies] = useState(false);

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    toast.success('Logged out successfully');
  };

  const deleteChat = async (e, chatId) => {
    try {
      e.stopPropagation();
      const confirm = window.confirm("Are you sure you want to delete this chat?");
      if (!confirm) return;
      const { data } = await axios.post('/api/chat/delete', { chatId }, { headers: { Authorization: token } });
      if (data.success) {
        setChats(prev => prev.filter(chat => chat._id !== chatId));
        await fetchUsersChats();
        toast.success(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      {/* OVERLAY for closing sidebar on mobile */}
      {isMenuOpen && (
        <div
          onClick={() => setIsMenuOpen(false)}
          className='fixed inset-0 z-20 bg-black/60 md:hidden cursor-pointer backdrop-blur-sm'
          aria-hidden="true"
        />
      )}

      <aside className={`flex flex-col h-screen w-72 p-4 bg-white dark:bg-[#151320] border-r border-[#E5E2EE] dark:border-white/[0.08] text-[#0F0C1B] dark:text-[#F4F2F8] transition-all duration-300 max-md:fixed left-0 top-0 z-30 ${!isMenuOpen && 'max-md:-translate-x-full'}`}>
        
        {/* CREATIVE PROPEL LOGO BLOCK */}
        <div className="flex items-center justify-between px-1 pt-2 pb-4">
          <PropelLogo size="md" showBadge={true} />

          {/* Close button for mobile */}
          <button 
            onClick={() => setIsMenuOpen(false)}
            className="md:hidden text-[#645D75] dark:text-[#9C97AE] hover:text-[#0F0C1B] dark:hover:text-[#F4F2F8] p-1 rounded-md cursor-pointer"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* NEW CHAT BUTTON */}
        <button 
          onClick={createNewChat} 
          className="flex justify-center items-center gap-2 w-full py-3 mt-1 text-white bg-[#7C3AED] hover:bg-[#6D28D9] text-[14px] font-medium rounded-xl transition-all duration-200 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[#7C3AED] focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-[#151320] cursor-pointer shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>New Chat</span>
        </button>

        {/* SEARCH INPUT */}
        <div className="flex items-center gap-2.5 px-3 py-2.5 mt-4 bg-[#F4F3F8] dark:bg-[#0B0A12] border border-[#E5E2EE] dark:border-white/[0.12] rounded-xl focus-within:border-[#7C3AED] focus-within:ring-1 focus-within:ring-[#7C3AED]">
          <Search className="w-4 h-4 text-[#645D75] dark:text-[#9C97AE]" />
          <input 
            onChange={(e) => setSearch(e.target.value)} 
            value={search} 
            type="text" 
            placeholder="Search Conversations..." 
            className="w-full text-[13px] bg-transparent text-[#0F0C1B] dark:text-[#F4F2F8] placeholder-[#645D75] dark:placeholder-[#6B6478] outline-none" 
          />
        </div>

        {/* RECENT CHATS LIST */}
        <div className="mt-5 flex items-center justify-between px-1">
          <span className="text-[12px] font-mono uppercase tracking-wider text-[#645D75] dark:text-[#9C97AE]">
            Recent Chats
          </span>
        </div>

        <div className="flex-1 overflow-y-scroll mt-2 space-y-1 pr-1">
          {chats.length > 0 ? (
            chats
              .filter((chat) => 
                chat.messages[0] 
                  ? chat.messages[0]?.content.toLowerCase().includes(search.toLowerCase()) 
                  : chat.name.toLowerCase().includes(search.toLowerCase())
              )
              .map((chat) => {
                const isSelected = selectedChat?._id === chat._id;
                return (
                  <div 
                    key={chat._id} 
                    onClick={() => { navigate('/'); setSelectedChat(chat); setIsMenuOpen(false); }} 
                    className={`p-2.5 px-3 rounded-lg cursor-pointer flex items-center justify-between group transition-colors ${
                      isSelected
                        ? 'bg-[#EDE9F6] dark:bg-[#1E1730] border border-[#7C3AED]/40 text-[#7C3AED] dark:text-[#F4F2F8]'
                        : 'bg-transparent hover:bg-[#F4F3F8] dark:hover:bg-[#1E1730]/60 border border-transparent text-[#645D75] dark:text-[#9C97AE] hover:text-[#0F0C1B] dark:hover:text-[#F4F2F8]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 overflow-hidden flex-1 mr-2">
                      <MessageSquare className={`w-4 h-4 shrink-0 ${isSelected ? 'text-[#7C3AED]' : 'text-[#645D75] dark:text-[#9C97AE]'}`} />
                      <div className="overflow-hidden">
                        <p className="truncate text-[13px] font-medium leading-tight">
                          {chat.messages.length > 0 ? chat.messages[0].content.slice(0, 32) : chat.name}
                        </p>
                        <p className="text-[11px] text-[#645D75]/70 dark:text-[#9C97AE]/70 mt-0.5">
                          {moment(chat.updatedAt).fromNow()}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={(e) => toast.promise(deleteChat(e, chat._id), { loading: 'Deleting...' })}
                      className="opacity-0 group-hover:opacity-100 transition-opacity p-1 text-[#645D75] dark:text-[#9C97AE] hover:text-[#EF4444] rounded cursor-pointer"
                      title="Delete chat"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })
          ) : (
            <p className="text-[12px] text-[#645D75] dark:text-[#9C97AE] px-2 py-4 italic">No chats yet</p>
          )}
        </div>

        {/* BOTTOM NAV ITEMS & UTILITIES */}
        <div className="pt-3 border-t border-[#E5E2EE] dark:border-white/[0.08] space-y-1 mt-auto">
          
          {/* Community Images */}
          <button 
            onClick={() => { navigate('/community'); setIsMenuOpen(false); }} 
            className="w-full flex items-center gap-3 p-2.5 px-3 rounded-lg text-[13px] text-[#645D75] dark:text-[#9C97AE] hover:text-[#0F0C1B] dark:hover:text-[#F4F2F8] hover:bg-[#F4F3F8] dark:hover:bg-[#1E1730] transition-colors text-left cursor-pointer"
          >
            <ImageIcon className="w-4 h-4 text-[#645D75] dark:text-[#9C97AE]" />
            <span>Community Images</span>
          </button>

          {/* Credits Counter (Amber Icon Highlight) */}
          <button 
            onClick={() => { navigate('/credits'); setIsMenuOpen(false); }} 
            className="w-full flex items-center justify-between p-2.5 px-3 rounded-lg text-[13px] bg-[#F4F3F8] dark:bg-[#0B0A12] border border-[#E5E2EE] dark:border-white/[0.06] hover:border-[#7C3AED]/30 transition-colors text-left cursor-pointer group"
          >
            <div className="flex items-center gap-2.5">
              {/* Exclusive Amber Accent on Credits Icon */}
              <CreditCard className="w-4 h-4 text-[#F59E0B]" />
              <span className="text-[#0F0C1B] dark:text-[#F4F2F8] font-medium">Credits</span>
            </div>
            <span className="text-[12px] font-mono font-semibold px-2 py-0.5 rounded bg-[#F59E0B]/10 text-[#F59E0B]">
              {user?.credits ?? 0}
            </span>
          </button>

          {/* Theme Toggle (Light / Dark Mode Switch) */}
          <div className="flex items-center justify-between p-2.5 px-3 text-[13px] text-[#645D75] dark:text-[#9C97AE]">
            <div className="flex items-center gap-2.5">
              {theme === 'dark' ? <Moon className="w-4 h-4 text-[#7C3AED]" /> : <Sun className="w-4 h-4 text-[#F59E0B]" />}
              <span className="text-[#0F0C1B] dark:text-[#F4F2F8] font-medium">{theme === 'dark' ? 'Dark Mode' : 'Light Mode'}</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={theme === 'dark'} 
                onChange={() => setTheme(theme === 'dark' ? 'light' : 'dark')} 
              />
              <div className="w-8 h-4 bg-[#D8D3E5] dark:bg-[#3A3450] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-[#7C3AED]" />
            </label>
          </div>

          {/* Policies Modal Trigger */}
          <button 
            onClick={() => { setShowPolicies(true); setIsMenuOpen(false); }} 
            className="w-full flex items-center gap-3 p-2.5 px-3 rounded-lg text-[13px] text-[#645D75] dark:text-[#9C97AE] hover:text-[#0F0C1B] dark:hover:text-[#F4F2F8] hover:bg-[#F4F3F8] dark:hover:bg-[#1E1730] transition-colors text-left cursor-pointer"
          >
            <FileText className="w-4 h-4 text-[#645D75] dark:text-[#9C97AE]" />
            <span>Policies</span>
          </button>

          {/* User Account & Logout */}
          <div className="flex items-center justify-between p-2.5 px-3 bg-[#F4F3F8] dark:bg-[#0B0A12] border border-[#E5E2EE] dark:border-white/[0.06] rounded-xl mt-2">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="w-7 h-7 rounded-full bg-[#EDE9F6] dark:bg-[#1E1730] border border-[#7C3AED]/20 text-[#7C3AED] dark:text-[#F4F2F8] flex items-center justify-center text-[12px] font-semibold shrink-0">
                {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
              </div>
              <span className="text-[13px] font-medium text-[#0F0C1B] dark:text-[#F4F2F8] truncate">
                {user ? user.name : 'Account'}
              </span>
            </div>

            {user && (
              <button 
                onClick={logout} 
                className="text-[#645D75] dark:text-[#9C97AE] hover:text-[#EF4444] transition-colors p-1 cursor-pointer" 
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            )}
          </div>

        </div>

      </aside>

      <PolicyModal show={showPolicies} onClose={() => setShowPolicies(false)} />
    </>
  );
};

export default SideBar;
