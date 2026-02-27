import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { logger } from "../utils/logger.js";

export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const existing = await User.findOne({ where: { email } });

    if (existing) {
      return res.status(409).json({ message: "Email is already exist", success: false });
    }

    const user = await User.create({ name, email, password, role });

    const userData = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    return res.status(201).json({ success: true, message: "User registered successfully", data: userData });
  } catch (error) {
    logger.error("register error", { error: error.message });
    return res.status(500).json({ message: "Server Error", errors: error.message, success: false });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Invalid email or password" });
    }

    const user = await User.findOne({ where: { email, is_active: true } });
    if (!user) {
      return res.status(401).json({ success: false, message: "User is notFound" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
    );

    logger.info(`User logged in : ${email}`);

    const userData = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    return res.status(201).json({ success: true, message: "Login successfull", data: userData, token: token });
  } catch (error) {
    logger.error("register error", { error: error.message });
    return res.status(500).json({ message: "Server Error", errors: error.message, success: false });
  }
};
