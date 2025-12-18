import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useAppContext } from '../context/AppContext';

const Login = () => {
    const [state, setState] = useState("login");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [otp, setOtp] = useState("");
    const { axios, setToken } = useAppContext();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (state === "otp") {
            const otpCode = password; // Using password field for OTP input in this quick adaptation or creating new state
            // Wait, let's better use a designated state for OTP. 
            // The current UI code uses 'password' state for password input. 
            // I should add 'otp' state. Rerouting to a better implementation in the next chunk logic.
            return;
        }

        const url = state === "login" ? "/api/user/login" : "/api/user/register";

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
                }
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    // OTP Verification Handler
    const handleOtpSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('/api/user/verify-email', { email, otp });
            if (data.success) {
                setToken(data.token);
                localStorage.setItem("token", data.token);
                toast.success(data.message);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    if (state === "otp") {
        return (
            <form onSubmit={handleOtpSubmit} className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] text-gray-500 rounded-lg shadow-xl border border-gray-200 bg-white">
                <p className="text-2xl font-medium m-auto">
                    <span className="text-purple-700">Verify</span> Account
                </p>
                <p className="text-sm text-gray-500 text-center w-full">Enter the 6-digit code sent to<br /> <span className="font-semibold text-gray-700">{email}</span></p>

                <div className="w-full">
                    <input onChange={(e) => setOtp(e.target.value)} value={otp} placeholder="XXXXXX" className="border border-gray-200 rounded w-full p-2 mt-1 outline-purple-700 text-center tracking-[0.5em] text-xl" type="text" maxLength="6" required />
                </div>

                <button type='submit' className="bg-purple-700 hover:bg-purple-800 transition-all text-white w-full py-2 rounded-md cursor-pointer">
                    Verify Email
                </button>
            </form>
        )
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] text-gray-500 rounded-lg shadow-xl border border-gray-200 bg-white">
            <p className="text-2xl font-medium m-auto">
                <span className="text-purple-700">User</span> {state === "login" ? "Login" : "Sign Up"}
            </p>
            {state === "register" && (
                <div className="w-full">
                    <p>Name</p>
                    <input onChange={(e) => setName(e.target.value)} value={name} placeholder="type here" className="border border-gray-200 rounded w-full p-2 mt-1 outline-purple-700" type="text" required />
                </div>
            )}
            <div className="w-full ">
                <p>Email</p>
                <input onChange={(e) => setEmail(e.target.value)} value={email} placeholder="type here" className="border border-gray-200 rounded w-full p-2 mt-1 outline-purple-700" type="email" required />
            </div>
            <div className="w-full ">
                <p>Password</p>
                <input onChange={(e) => setPassword(e.target.value)} value={password} placeholder="type here" className="border border-gray-200 rounded w-full p-2 mt-1 outline-purple-700" type="password" required />
            </div>
            {state === "register" ? (
                <p>
                    Already have account? <span onClick={() => setState("login")} className="text-purple-700 cursor-pointer">click here</span>
                </p>
            ) : (
                <p>
                    Create an account? <span onClick={() => setState("register")} className="text-purple-700 cursor-pointer">click here</span>
                </p>
            )}
            <button type='submit' className="bg-purple-700 hover:bg-purple-800 transition-all text-white w-full py-2 rounded-md cursor-pointer">
                {state === "register" ? "Create Account" : "Login"}
            </button>
        </form>
    )
}

export default Login
