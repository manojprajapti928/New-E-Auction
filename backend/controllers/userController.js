const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const JWT_SECRET = "jwt-secret";

// Register a new user
exports.register = async (req, res) => {
  const {
    username,
    email,
    password,
    role,
    address,
    city,
    state,
    country,
    contactNo,
  } = req.body;
  console.log(
    username,
    email,
    password,
    role,
    address,
    city,
    state,
    country,
    contactNo,
    "body"
  );

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const imageUrl = req.file ? `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}` : null;
    console.log(imageUrl,"profilePic");

    // const imageUrl = req.files.imageUrl
    // ? `${req.protocol}://${req.get("host")}/uploads/${req.files.imageUrl[0].filename}`
    // : null;
  
  // const profilePic = req.files.profilePic
  //   ? `${req.protocol}://${req.get("host")}/uploads/${req.files.profilePic.filename}`
  //   : null;
    

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      role: role || "user",
      imageUrl,
      address,
      city,
      state,
      country,
      contactNo,
    });
    console.log(user, "created");

    res.status(201).json({
      message: "User registered",
      user: { username: user.username, email: user.email },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      console.error("User not found");
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.error("Invalid password");
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: "1h" }
    );
    const role = user.role;
    // console.log('Token generated:', token, role);

    res.status(200).json({ message: "Login successful", token, role });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: error.message });
  }
};

// Get all users (admin only)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "username", "email", "role","imageUrl"],
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete user (admin only)
exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    await user.destroy();
    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
