import User from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";


function generateToken(user) {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
}


export async function registerUser(req, res, next) {
  try {
    const { username, email, password } = req.body;

    
    let role = "user";
    if (username == "root" && email === "root@admin.com" && password === "root") {
      role = "admin";
    }

    const user = await User.create({ username, email, password, role });

    res.status(201).json({
      message: "Vartotojas sukurtas",
      user: { id: user._id, username: user.username, email: user.email, role: user.role }
    });
  } catch (err) {
  console.error("REG klaida backend:", err);
  res.status(400).json({
    message: "Registracija nepavyko",
    error: err.message,       
    stack: err.stack          
  });
}
}

// Prisijungimas
export async function loginUser(req, res, next) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Neteisingi prisijungimo duomenys" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Neteisingi prisijungimo duomenys" });
    }

    // Admin
    if (email === "root@admin.com" && password === "root") {
      user.role = "admin";
      await user.save();
    }

    const token = generateToken(user);

    res.json({
      token,
      user: { id: user._id, username: user.username, email: user.email, role: user.role }
    });
  } catch (err) {
    next(err);
  }
}
