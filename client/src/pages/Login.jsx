import React, { useState, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';
import toast from 'react-hot-toast';
import { useAppContext } from '../context/AppContext';
import { Sparkles, MessageSquare, Image as ImageIcon, Zap, Shield, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const prefersReducedMotion = useReducedMotion();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const loginRef = useRef(null);

  const [state, setState] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const { axios, setToken } = useAppContext();

  const handleMouseMove = (e) => {
    if (prefersReducedMotion || !loginRef.current) return;
    const rect = loginRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const handleStateToggle = (newState) => {
    setErrorMsg("");
    setState(newState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (state === "otp") {
      return;
    }

    const url = state === "login" ? "/api/user/login" : "/api/user/register";
    setIsSubmitting(true);

    try {
      const { data } = await axios.post(url, { name, email, password });
      if (data.success) {
        if (state === "register") {
          // Registration successful, OTP sent
          setState("otp");
          toast.success(data.message);
        } else {
          setToken(data.token);
          localStorage.setItem("token", data.token);
          navigate('/');
        }
      } else {
        const msg = data.message || "Authentication failed";
        setErrorMsg(msg);
        toast.error(msg);
      }
    } catch (error) {
      const msg = error.response?.data?.message || error.message || "Something went wrong";
      setErrorMsg(msg);
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  // OTP Verification Handler
  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setIsSubmitting(true);

    try {
      const { data } = await axios.post('/api/user/verify-email', { email, otp });
      if (data.success) {
        setToken(data.token);
        localStorage.setItem("token", data.token);
        toast.success(data.message);
        navigate('/');
      } else {
        const msg = data.message || "OTP verification failed";
        setErrorMsg(msg);
        toast.error(msg);
      }
    } catch (error) {
      const msg = error.response?.data?.message || error.message || "Verification error";
      setErrorMsg(msg);
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div 
      ref={loginRef}
      onMouseMove={handleMouseMove}
      className="min-h-screen w-full bg-[#0B0A12] text-[#F4F2F8] bg-noise flex items-center justify-center p-4 sm:p-6 lg:p-12 relative overflow-hidden"
    >
      {/* Flat Blurred Circle Cursor Follow (Disabled if prefers-reduced-motion) */}
      {!prefersReducedMotion && (
        <div 
          className="pointer-events-none absolute w-[400px] h-[400px] rounded-full bg-[#7C3AED] opacity-[0.12] transition-transform duration-300 ease-out -translate-x-1/2 -translate-y-1/2"
          style={{
            left: `${mousePos.x}px`,
            top: `${mousePos.y}px`,
            filter: 'blur(90px)'
          }}
          aria-hidden="true"
        />
      )}
      
      {/* Top Header Navigation Back Link */}
      <div className="absolute top-6 left-6 z-20">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-[13px] text-[#9C97AE] hover:text-[#F4F2F8] transition-colors focus:outline-none focus:ring-2 focus:ring-[#7C3AED] rounded px-2 py-1"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
      </div>

      {/* Main Split Showcase Layout (max-w 1240px) */}
      <div className="w-full max-w-[1240px] grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10 my-auto">
        
        {/* Left Column: Product Showcase Panel (Visible on lg screens) */}
        <div className="hidden lg:flex lg:col-span-7 flex-col justify-between p-8 bg-[#151320] border border-white/[0.08] rounded-[20px] shadow-[0_8px_24px_rgba(0,0,0,0.4)] relative overflow-hidden min-h-[520px]">
          
          {/* Corner Reticle Accents ┌ ┐ */}
          <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#7C3AED]" />
          <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#7C3AED]" />

          <div>
            {/* Platform Eyebrow */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full bg-[#0B0A12] border border-white/10 mb-6">
              <span className="w-2 h-2 rounded-full bg-[#F59E0B]" />
              <span className="text-[12px] font-mono tracking-wider text-[#9C97AE] uppercase">
                Propel AI · 30 Free Credits Included
              </span>
            </div>

            {/* Showcase Headline */}
            <h2 className="font-geist text-[32px] font-semibold text-[#F4F2F8] leading-[1.2] mb-4">
              Power your prompts with <br />
              <span className="text-[#7C3AED]">Google Gemini 2.5</span> & ImageKit.
            </h2>
            <p className="text-[16px] text-[#9C97AE] leading-relaxed max-w-[480px]">
              Access multi-turn text intelligence and instant AI artwork creation from a unified dashboard.
            </p>
          </div>

          {/* Capability Feature Cards Grid */}
          <div className="grid grid-cols-3 gap-3 my-6">
            <div className="bg-[#0B0A12] border border-white/[0.06] rounded-xl p-4">
              <MessageSquare className="w-5 h-5 text-[#7C3AED] mb-2" />
              <h3 className="font-medium text-[13px] text-[#F4F2F8] mb-1">Text Chat</h3>
              <p className="text-[11px] text-[#9C97AE]">Gemini 2.5 Flash (1 Credit)</p>
            </div>

            <div className="bg-[#0B0A12] border border-white/[0.06] rounded-xl p-4">
              <ImageIcon className="w-5 h-5 text-[#7C3AED] mb-2" />
              <h3 className="font-medium text-[13px] text-[#F4F2F8] mb-1">Image Studio</h3>
              <p className="text-[11px] text-[#9C97AE]">Text-to-Image (2 Credits)</p>
            </div>

            <div className="bg-[#0B0A12] border border-white/[0.06] rounded-xl p-4">
              <Zap className="w-5 h-5 text-[#F59E0B] mb-2" />
              <h3 className="font-medium text-[13px] text-[#F4F2F8] mb-1">Razorpay</h3>
              <p className="text-[11px] text-[#9C97AE]">Instant Top-ups</p>
            </div>
          </div>

          {/* Bottom Trust Meta */}
          <div className="flex items-center justify-between text-[12px] text-[#9C97AE] pt-4 border-t border-white/[0.06]">
            <span className="flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-[#10B981]" />
              <span>Encrypted JWT Sessions</span>
            </span>
            <span className="font-mono text-[#7C3AED]">30 Credits Granted</span>
          </div>

          {/* Corner Reticle Accents └ ┘ */}
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#7C3AED]" />
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#7C3AED]" />
        </div>

        {/* Right Column: Form Panel (5 cols on lg, centered on mobile) */}
        <div className="lg:col-span-5 w-full flex justify-center">
          {state === "otp" ? (
            <form 
              onSubmit={handleOtpSubmit} 
              className="flex flex-col gap-5 items-start p-8 sm:p-10 w-full max-w-[420px] bg-[#151320] text-[#F4F2F8] rounded-[20px] border border-white/[0.08] shadow-[0_8px_24px_rgba(0,0,0,0.4)]"
            >
              <h1 className="font-geist text-[24px] font-semibold w-full text-center tracking-tight mb-1">
                <span className="text-[#7C3AED]">Verify</span> Account
              </h1>

              <p className="text-[14px] text-[#9C97AE] text-center w-full leading-relaxed">
                Enter the 6-digit code sent to<br /> 
                <strong className="font-medium text-[#F4F2F8]">{email}</strong>
              </p>

              {/* Accessible Inline Error Banner */}
              {errorMsg && (
                <div 
                  role="alert" 
                  aria-live="polite" 
                  className="w-full p-3 rounded-lg bg-[#F09595]/10 border border-[#F09595]/30 text-[#F09595] text-[13px] font-medium"
                >
                  {errorMsg}
                </div>
              )}

              <div className="w-full">
                <label className="text-[14px] text-[#9C97AE] font-normal mb-1.5 block">
                  Verification Code
                </label>
                <input 
                  onChange={(e) => { setOtp(e.target.value); setErrorMsg(""); }} 
                  value={otp} 
                  placeholder="XXXXXX" 
                  className="bg-[#0B0A12] border border-white/[0.12] focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/40 focus:ring-offset-2 focus:ring-offset-[#151320] text-[#F4F2F8] placeholder-[#6B6478] rounded-lg w-full p-3 text-center tracking-[0.5em] text-xl font-mono outline-none transition-all" 
                  type="text" 
                  maxLength="6" 
                  required 
                  disabled={isSubmitting}
                />
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-medium text-[15px] w-full py-3 rounded-lg transition-all duration-200 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[#7C3AED] focus:ring-offset-2 focus:ring-offset-[#151320] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Verifying...</span>
                  </>
                ) : (
                  "Verify Email"
                )}
              </button>
            </form>
          ) : (
            <form 
              onSubmit={handleSubmit} 
              className="flex flex-col gap-4 items-start p-8 sm:p-10 w-full max-w-[420px] bg-[#151320] text-[#F4F2F8] rounded-[20px] border border-white/[0.08] shadow-[0_8px_24px_rgba(0,0,0,0.4)]"
            >
              <h1 className="font-geist text-[24px] font-semibold w-full text-center tracking-tight mb-2">
                <span className="text-[#7C3AED]">User</span> {state === "login" ? "Login" : "Sign Up"}
              </h1>

              {/* Accessible Inline Error Banner */}
              {errorMsg && (
                <div 
                  role="alert" 
                  aria-live="polite" 
                  className="w-full p-3 rounded-lg bg-[#F09595]/10 border border-[#F09595]/30 text-[#F09595] text-[13px] font-medium"
                >
                  {errorMsg}
                </div>
              )}

              {state === "register" && (
                <div className="w-full">
                  <label className="text-[14px] text-[#9C97AE] font-normal mb-1.5 block">
                    Name
                  </label>
                  <input 
                    onChange={(e) => { setName(e.target.value); setErrorMsg(""); }} 
                    value={name} 
                    placeholder="John Doe" 
                    className="bg-[#0B0A12] border border-white/[0.12] focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/40 focus:ring-offset-2 focus:ring-offset-[#151320] text-[#F4F2F8] placeholder-[#6B6478] rounded-lg w-full p-3 text-[14px] outline-none transition-all" 
                    type="text" 
                    required 
                    disabled={isSubmitting}
                  />
                </div>
              )}

              <div className="w-full">
                <label className="text-[14px] text-[#9C97AE] font-normal mb-1.5 block">
                  Email
                </label>
                <input 
                  onChange={(e) => { setEmail(e.target.value); setErrorMsg(""); }} 
                  value={email} 
                  placeholder="name@company.com" 
                  className="bg-[#0B0A12] border border-white/[0.12] focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/40 focus:ring-offset-2 focus:ring-offset-[#151320] text-[#F4F2F8] placeholder-[#6B6478] rounded-lg w-full p-3 text-[14px] outline-none transition-all" 
                  type="email" 
                  required 
                  disabled={isSubmitting}
                />
              </div>

              <div className="w-full">
                <label className="text-[14px] text-[#9C97AE] font-normal mb-1.5 block">
                  Password
                </label>
                <input 
                  onChange={(e) => { setPassword(e.target.value); setErrorMsg(""); }} 
                  value={password} 
                  placeholder="••••••••" 
                  className="bg-[#0B0A12] border border-white/[0.12] focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/40 focus:ring-offset-2 focus:ring-offset-[#151320] text-[#F4F2F8] placeholder-[#6B6478] rounded-lg w-full p-3 text-[14px] outline-none transition-all" 
                  type="password" 
                  required 
                  disabled={isSubmitting}
                />
              </div>

              {/* State Toggle Link */}
              <div className="w-full text-center py-1">
                {state === "register" ? (
                  <p className="text-[14px] text-[#9C97AE]">
                    Already have an account?{' '}
                    <button 
                      type="button" 
                      onClick={() => handleStateToggle("login")} 
                      className="text-[#7C3AED] font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-[#7C3AED] focus:ring-offset-1 focus:ring-offset-[#151320] rounded px-1 cursor-pointer"
                    >
                      click here
                    </button>
                  </p>
                ) : (
                  <p className="text-[14px] text-[#9C97AE]">
                    Create an account?{' '}
                    <button 
                      type="button" 
                      onClick={() => handleStateToggle("register")} 
                      className="text-[#7C3AED] font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-[#7C3AED] focus:ring-offset-1 focus:ring-offset-[#151320] rounded px-1 cursor-pointer"
                    >
                      click here
                    </button>
                  </p>
                )}
              </div>

              {/* Primary Submit Button */}
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-medium text-[15px] w-full py-3 rounded-lg transition-all duration-200 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[#7C3AED] focus:ring-offset-2 focus:ring-offset-[#151320] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-1"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>{state === "register" ? "Creating Account..." : "Logging in..."}</span>
                  </>
                ) : (
                  state === "register" ? "Create Account" : "Login"
                )}
              </button>
            </form>
          )}
        </div>

      </div>

    </div>
  );
};

export default Login;
