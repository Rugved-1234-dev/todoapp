import z from "zod";
import { User } from "../models/user.models.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  username: z.string().min(3),
});
const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const signUp = async (req, res) => {
  try {
    const { email, password, username } = req.body;

    const data = { email, password, username };

    const validateData = signUpSchema.safeParse(data);

    if (validateData.success) {
      const userExist = await User.findOne({ email });

      if (userExist) {
        return res.status(400).json({
          success: false,
          message: "User already exists",
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        email,
        password: hashedPassword,
        username,
      });

      await newUser.save();

      const jsonToken = jwt.sign({ email, username }, "secret", {
        expiresIn: "1h",
      });

      res.status(201).json({
        success: true,
        message: "User registered successfully",
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Invalid data",
      });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const signIn = async (req, res) => {
    try {
      const { email, password } = req.body;
      const validateData = signInSchema.safeParse({ email, password });
  
      if (validateData.success) {
        const userExist = await User.findOne({ email });
  
        if (!userExist) {
          return res.status(400).json({
            success: false,
            message: "User does not exist",
          });
        }
  
   
  
        const isMatch = await bcrypt.compare(password, userExist.password);
        
        if (isMatch) {
          const jsonToken = jwt.sign(
            { email: userExist.email, username: userExist.username },
            "secret",
            { expiresIn: "1h" }
          );
  
          return res.status(200).json({
            success: true,
            message: "User Logged In",
            token: jsonToken,
            name:  userExist.username,

          });
        } else {
          return res.status(400).json({
            success: false,
            message: "Wrong password",
          });
        }
      } else {
        return res.status(400).json({
          success: false,
          message: "Invalid data",
        });
      }
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  };
  
