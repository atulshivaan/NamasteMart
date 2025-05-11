import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import { generateVerificationCode } from "../utils/generateVerificationCode.js";
import jwt from "jsonwebtoken";

export const userRegister = async (req, res) => {
  const { name, email, password, number } = req.body;

  try {
    if (!name || !email || !password || !number) {
      return res.status(400).json({
        succes: false,
        message: "All fields are required",
      });
    }

    const emailExist = await User.findOne({ email });
    if (emailExist) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }
    const hashPassword = await bcrypt.hash(password, 10);

    const code = generateVerificationCode();
    const expiry = new Date(Date.now() + 10 * 60 * 1000);

    const newUser = await User.create({
      name,
      email,
      password: hashPassword,
      number,
      verificationCode: code,
      verificationExpires: expiry,
      isVerified: false,
    });

    console.log(`Verification code for ${email} : ${code}`);

    res.status(201).json({
      succes: true,
      message: "User Registered Successfully",
      newUser,
    });
  } catch (error) {
    res.status(500).json({
      succes: false,
      message: error.message,
    });
  }
};
export const verifyUser = async (req, res) => {
  const { email, code } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        succes: false,
        message: "User not found",
      });
    }
    if (user.isVerified) {
      return res.status(400).json({
        succes: false,
        message: "User is already verified",
      });
    }
    if (
      user.verificationCode === code &&
      user.verificationExpires > new Date()
    ) {
      user.isVerified = true;
      user.verificationCode = undefined;
      user.verificationExpires = undefined;

      await user.save();

      return res.status(200).json({
        success: true,
        message: "User verified sucessfully",
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired code",
      });
    }
  } catch (error) {
    res.status(500).json({
      succes: false,
      message: "Something went wrong",
    });
  }
};
export const userLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Password didn't match",
      });
    }

    if (!user.isVerified) {
      return res.status(403).json({
        success: false,
        message: "Please verify your account before logging in",
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res
      .cookie("token", token, {
        httpOnly: true,
        maxAge: 3600000,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
      })
      .status(200)
      .json({
        success: true,
        message: "Login successful",
        user: { id: user._id, email: user.email },
      });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

export const updatePassword = async (req, res) => {
  const { email, oldPassword, newPassword } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Old password is incorrect" });
    }

    const hashed = await bcrypt.hash(newPassword, 10);
    user.password = hashed;
    await user.save();

    res.status(200).json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const code = generateVerificationCode();
    const expiry = new Date(Date.now() + 10 * 60 * 1000);

    user.verificationCode = code;
    user.verificationExpires = expiry;
    await user.save();

    console.log(`Password reset code for ${email}: ${code}`); 

    res.status(200).json({ success: true, message: "Reset code sent to email"  ,code});
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const resetPasswordWithCode = async (req, res) => {
  const { email, code, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || user.verificationCode !== code || user.verificationExpires < new Date()) {
      return res.status(400).json({ success: false, message: "Invalid or expired code" });
    }

    const hashed = await bcrypt.hash(password, 10);
    user.password = hashed;
    user.verificationCode = undefined;
    user.verificationExpires = undefined;

    await user.save();

    res.status(200).json({ success: true, message: "Password reset successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getUsers=async(req,res)=>{
try {
    const users = await User.find().select("-password");
    res.status(200).json({ success: true, users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}
export const getUserbyID =async(req,res)=>{
 try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}
export const userEdit=async(req,res)=>{
try {
    const { name, email, number } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, number },
      { new: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, message: "User updated", user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}
export const userDelete =async(req,res)=>{
 try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, message: "User deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

export const userLogout = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ success: false, message: "No user is logged in" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    res.status(200).json({
      success: true,
      message: `User with ID ${decoded.id} logged out successfully`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
