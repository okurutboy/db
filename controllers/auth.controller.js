import User from "../models/user.model.js";
import createError from "../utils/createError.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  const {
    fullName,
    lastName,
    username,
    email,
    password,
    retypedPassword,
    role,
    isAgent,
    isAdmin,
    isClient,
  } = req.body;
  // Check if required fields are not empty
  // Check if required fields are not empty
  if (!fullName) {
    return res.status(400).json({ message: "Full name is required." });
  }

  if (!username) {
    return res.status(400).json({ message: "Username is required." });
  }

  if (!email) {
    return res.status(400).json({ message: "Email is required." });
  }

  if (!password) {
    return res.status(400).json({ message: "Password is required." });
  }

  if (!retypedPassword) {
    return res.status(400).json({ message: "Retyped password is required." });
  }
  if (!role) {
    return res.status(400).json({ message: "Role is required." });
  }

  // Check if password meets criteria
  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{3,}$/;
  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      message:
        "Password must contain at least 3 characters, including at least one letter, one number, and one special character (@$!%*#?&).",
    });
  }

  // Check if password and retypedPassword match
  if (password !== retypedPassword) {
    return res.status(400).json({ message: "Passwords do not match." });
  }

  try {
    // Check if username or email already exists
    const userWithSameUsername = await User.findOne({ username });
    if (userWithSameUsername) {
      return res.status(409).json({ message: "Username already taken." });
    }

    const userWithSameEmail = await User.findOne({ email });
    if (userWithSameEmail) {
      return res.status(409).json({ message: "Email already exists." });
    }

    // If all validations pass, create new user
    const hash = bcrypt.hashSync(password, 5);
    const newUser = new User({
      fullName,
      lastName,
      username,
      email,
      password: hash,
      role,
      isAgent: isAgent,
      isAdmin: isAdmin,
      isClient: isClient,
    });

    await newUser.save();
    res.status(201).json({ message: "User has been created." });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Signing up failed, please try again later." });
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (!user) {
      return next(createError(404, "Invalid credentials1"));
    }

    const isCorrect = bcrypt.compareSync(req.body.password, user.password);
    if (!isCorrect) {
      return next(createError(400, "Invalid credentials2"));
      // res.json(err)
    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_KEY
    );

    const { password, ...info } = user._doc;
    res
      .cookie("accessToken", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        // secure: true, // Enable this option if using HTTPS
      })
      .status(200)
      .send(info);
    res.redirect("http://localhost:3000");
  } catch (err) {
    // Log the error and return a generic error message to the client
    console.error(err);
    return next(createError(500, "An unexpected error occurred"));
  }
};

export const logout = async (req, res) => {
  res
    .clearCookie("accessToken", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .send("User has been logged out.");
};

export const updatePassword = async (req, res) => {
  const { oldPassword, newPassword, newRepassword } = req.body;
  const userId = req.userId;
  try {
    // Find the user by the authenticated userId
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log("user aold passwrd::", user.password);
    const isCorrect = bcrypt.compareSync(oldPassword, user.password);
    if (!isCorrect) {
      // return next(createError(400, "Incorrect old password"));
      return res.status(400).json({ message: "Incorrect old password" });
    }

    // Validate the new password and new repassword
    if (newPassword !== newRepassword) {
      return res
        .status(400)
        .json({ message: "New password and new repassword do not match" });
    }

    // Check if password meets criteria
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/;
    if (!passwordRegex.test(newPassword)) {
      return res.status(400).json({
        message:
          "Password must contain at least 6 characters, including at least one letter, one number, and one special character (@$!%*#?&).",
      });
    }

    const hash = bcrypt.hashSync(newPassword, 5);
    // Update the password
    user.password = hash;
    await user.save();

    return res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};
