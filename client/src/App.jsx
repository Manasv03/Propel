import React, { useState } from 'react'
import SideBar from './components/SideBar'
import { Route, Routes, useLocation } from 'react-router-dom'
import ChatBox from './components/ChatBox'
import Credits from './pages/Credits'
import Community from './pages/Community'
import { assets } from './assets/assets'
import './assets/prism.css'
import Loading from './pages/Loading'
import Login from './pages/Login'
import { useAppContext } from './context/AppContext'
import { Toaster } from 'react-hot-toast'
import ContactUs from './pages/policies/ContactUs'
import ShippingPolicy from './pages/policies/ShippingPolicy'
import TermsAndConditions from './pages/policies/TermsAndConditions'
import RefundPolicy from './pages/policies/RefundPolicy'
import PrivacyPolicy from './pages/policies/PrivacyPolicy'

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
      {!isMenuOpen && <img src={assets.menu_icon} className='absolute top-3 left-3 w-8 h-8 cursor-pointer md:hidden not-dark:invert' onClick={() => setIsMenuOpen(true)} />}

      {user ? (
        <div className='dark:bg-linear-to-b from-[#242124] to-[#000000] dark:text-white'>
          <div className='flex h-screen w-screen'>
            <SideBar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
            <Routes >
              <Route path='/' element={<ChatBox />} />
              <Route path='/credits' element={<Credits />} />
              <Route path='/community' element={<Community />} />
            </Routes>
          </div>
        </div>
      ) : (
        <div className='bg-linear-to-b from-[#242124] to-[#000000] flex items-center justify-center h-screen w-screen'>
          <Login />
        </div>
      )}
    </>
  )
}

export default App
