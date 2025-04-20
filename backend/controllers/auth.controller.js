import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendWelcomeEmail } from "../emails/emailHandlers.js";

export const signup = async (req, res) => {
    // res.send("signup");
    try {
        const { name, username, email, password } = req.body;
        console.log(name,username);
        if (!name || !username || !email || !password) {
            return res.status(400).json({ message: "Please fill all fields" });
        }
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            console.log("in email jhamela");
            return res.status(400).json({ message: "Email already exists" });
        }
        console.log("out email jhamela");
        const existingUsername = await User.findOne({ username });
        if (existingUsername) {
            return res.status(400).json({ message: "Username already exists" });
        }

        if(password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            name,
            username,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });

        res.cookie("jwt-CampusConnect", token, {
            httpOnly: true,
            maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production",
        });
        
        res.status(201).json({message: "User created successfully"});

        // todo: send welcome email
        const profileUrl = `${process.env.CLIENT_URL}/profile/${newUser.username}`;

        try {
            await sendWelcomeEmail(newUser.email, newUser.name,profileUrl);
        }
        catch (error) {
            console.error("Error sending welcome email:", error);
        } 

    }
    catch (error) {
        console.error("Error in signup:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const login = async (req, res) => {
	try {
		const { username, password } = req.body;

		// Check if user exists
		const user = await User.findOne({ username });
		if (!user) {
			return res.status(400).json({ message: "Invalid credentials" });
		}

		// Check password
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.status(400).json({ message: "Invalid credentials" });
		}

		// Create and send token
		const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
		await res.cookie("jwt-CampusConnect", token, {
			httpOnly: true,
			maxAge: 1 * 24 * 60 * 60 * 1000,
			sameSite: "strict",
			secure: process.env.NODE_ENV === "production",
		});

		res.json({ message: "Logged in successfully" });
	} catch (error) {
		console.error("Error in login controller:", error);
		res.status(500).json({ message: "Server error" });
	}
};


export const logout = (req, res) => {
	res.clearCookie("jwt-CampusConnect");
	res.json({ message: "Logged out successfully" });
};

export const getCurrentUser = async (req, res) => {
    try {
        res.json(req.user);
    }
    catch (error) {
        console.error("Error in getCurrentUser:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}