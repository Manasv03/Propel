import React, { useState } from 'react'
import SideBar from './components/SideBar'
import { Route, Routes, useLocation, Navigate } from 'react-router-dom'
import ChatBox from './components/ChatBox'
import Credits from './pages/Credits'
import Community from './pages/Community'
import { assets } from './assets/assets'
import './assets/prism.css'
import { Menu } from 'lucide-react'
import Loading from './pages/Loading'
import Login from './pages/Login'
import { useAppContext } from './context/AppContext'
import { Toaster } from 'react-hot-toast'
import ContactUs from './pages/policies/ContactUs'
import ShippingPolicy from './pages/policies/ShippingPolicy'
import TermsAndConditions from './pages/policies/TermsAndConditions'
import RefundPolicy from './pages/policies/RefundPolicy'
import PrivacyPolicy from './pages/policies/PrivacyPolicy'
import Home from './pages/Home'
import Documentation from './pages/Documentation'

const App = () => {

  const { user, loadingUser } = useAppContext();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { pathname } = useLocation()

  if (pathname.startsWith('/policy')) {
    return (
      <Routes>
        <Route path='/policy/contact-us' element={<ContactUs />} />
        <Route path='/policy/shipping-policy' element={<ShippingPolicy />} />
        <Route path='/policy/terms-and-conditions' element={<TermsAndConditions />} />
        <Route path='/policy/cancellation-refund' element={<RefundPolicy />} />
        <Route path='/policy/privacy-policy' element={<PrivacyPolicy />} />
      </Routes>
    )
  }

  if (pathname === '/loading' || loadingUser) return <Loading />;

  return (
    <>
      <Toaster />
      {user && !isMenuOpen && (
        <button 
          onClick={() => setIsMenuOpen(true)}
          className="fixed top-3 left-3 z-40 md:hidden p-2.5 rounded-xl bg-white dark:bg-[#151320] border border-[#E5E2EE] dark:border-white/[0.08] text-[#0F0C1B] dark:text-[#F4F2F8] shadow-md focus:outline-none focus:ring-2 focus:ring-[#7C3AED] cursor-pointer"
          aria-label="Open navigation menu"
        >
          <Menu className="w-5 h-5 text-[#0F0C1B] dark:text-[#F4F2F8]" />
        </button>
      )}

      {
        user ? (
          <div className='bg-[#F8F7FC] dark:bg-[#0B0A12] text-[#0F0C1B] dark:text-[#F4F2F8] transition-colors'>
            <div className='flex h-screen w-screen'>
              <SideBar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
              <Routes >
                <Route path='/' element={<ChatBox />} />
                <Route path='/credits' element={<Credits />} />
                <Route path='/community' element={<Community />} />
                <Route path='*' element={<Navigate to='/' replace />} />
              </Routes>
            </div>
          </div>
        ) : (
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/docs' element={<Documentation />} />
            <Route path='/login' element={<Login />} />
            <Route path='*' element={<Home />} />
          </Routes>
        )
      }
    </>
  )
}

export default App
