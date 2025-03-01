import {User} from '../models/user.model.js';
const createuser=async (req, res) => {
    try {
        const { username, password } = req.body;

        const existingUser = await User.findOne({ username });
        if (existingUser) return res.status(400).json({ message: "Username already taken!" });

        const newUser = new User({ username, password });
        await newUser.save();

        res.status(201).json({ message: "User registered successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
const loginUser =async (req, res) => {
    try {
        const { username, password } = req.body;
        
        const user = await User.findOne({ username });
        
        if (!user) return res.status(400).json({ message: "Invalid username or password!" });

        let isMatch=0;
        if(user.password==password){
            isMatch=1;
        }
        
        if (!isMatch) return res.status(400).json({ message: "Invalid username or password!" });

        res.json(
            { 
                message: "Login successful!" ,
                user
            }
        );
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

export {createuser,loginUser}