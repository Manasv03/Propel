import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import Chat from "../models/Chat.js";
import transporter from "../configs/nodemailer.js";

// Geneeate JWT Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    })
}

// API to register a user
export const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        let user = await User.findOne({ email })

        if (user) {
            if (user.isAccountVerified) {
                return res.json({ success: false, message: "User Already Exists" });
            }

            // If user exists but not verified, update details and resend OTP
            const otp = String(Math.floor(100000 + Math.random() * 900000));

            user.name = name;
            user.password = password; // Will be hashed by pre-save hook
            user.verifyOtp = otp;
            user.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000;

            await user.save();

            // Send OTP Email
            const mailOptions = {
                from: process.env.SENDER_EMAIL || process.env.SMTP_USER,
                to: email,
                subject: 'Account Verification OTP',
                text: `Welcome to Propel! Your verification code is: ${otp}`
            };

            try {
                await transporter.sendMail(mailOptions);
            } catch (error) {
                // Log email error but don't block registration
            }

            return res.json({ success: true, message: "OTP sent to your email" });
        }

        // Generate 6-digit OTP
        const otp = String(Math.floor(100000 + Math.random() * 900000));

        user = await User.create({
            name,
            email,
            password,
            verifyOtp: otp,
            verifyOtpExpireAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
            authProvider: 'email'
        });

        // Send OTP Email
        const mailOptions = {
            from: process.env.SENDER_EMAIL || process.env.SMTP_USER,
            to: email,
            subject: 'Account Verification OTP',
            text: `Welcome to Propel! Your verification code is: ${otp}`
        };

        try {
            await transporter.sendMail(mailOptions);
        } catch (error) {
            console.error("Email send error: ", error); // Log email error but don't block registration
        }

        // We do NOT return a token here anymore
        res.json({ success: true, message: "OTP sent to your email" });

    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}

// API to verify email
export const verifyEmail = async (req, res) => {
    const { email, otp } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        if (user.verifyOtp === '' || user.verifyOtp !== otp) {
            return res.json({ success: false, message: "Invalid OTP" });
        }

        if (user.verifyOtpExpireAt < Date.now()) {
            return res.json({ success: false, message: "OTP Expired" });
        }

        user.isAccountVerified = true;
        user.verifyOtp = '';
        user.verifyOtpExpireAt = 0;
        await user.save();

        const token = generateToken(user._id);
        res.json({ success: true, token, message: "Email verified successfully" });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

// API to login a user
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email })
        if (user) {
            const isMatch = await bcrypt.compare(password, user.password);

            if (isMatch) {
                // Check if account is verified
                if (!user.isAccountVerified && user.authProvider === 'email') {
                    return res.json({ success: false, message: "Please verify your email first" });
                }

                const token = generateToken(user._id);
                return res.json({ success: true, token })
            }
        }
        return res.json({ success: false, message: "Invalid Email or Password" })
    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}

// API to get user details
export const getUser = async (req, res) => {
    try {
        const user = req.user;
        return res.json({ success: true, user })
    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}

// API to get published images 
export const getPublishedImages = async (req, res) => {
    try {
        const publishedImageMessages = await Chat.aggregate([
            { $unwind: "$messages" },
            {
                $match: {
                    "messages.isImages": true,
                    "messages.isPublished": true
                }
            },
            {
                $project: {
                    _id: 0,
                    imageUrl: "$messages.content",
                    userName: "$userName"
                }
            }
        ])
        res.json({ success: true, images: publishedImageMessages.reverse() })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}