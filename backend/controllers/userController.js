const UserModel = require('../models/userModel')

const userController = {
    addUser: async (req, res) => {
        try {
            const { user, interest, age, mobile, email } = req.body;

            // Basic validations
            if (!user || typeof user !== 'string') {
                return res.status(400).json({ error: 'User name is required and must be a string' });
            }
            if (interest && !Array.isArray(interest)) {
                return res.status(400).json({ error: 'Interest must be an array' });
            }
            if (age && (typeof age !== 'number' || age < 0)) {
                return res.status(400).json({ error: 'Age must be a positive number' });
            }
            if (mobile && !/^\d{10,15}$/.test(mobile)) {
                return res.status(400).json({ error: 'Mobile number must be between 10 to 15 digits' });
            }
            if (!email || typeof email !== 'string' || !/.+\@.+\..+/.test(email)) {
                return res.status(400).json({ error: 'Valid email is required' });
            }

            const EmailExist = await UserModel.findOne({ email })
            if (EmailExist) {
                return res.status(400).json({ error: 'Email Already Exist' });

            }
            // Create a new user instance
            const newUser = new UserModel({
                user,
                interest,
                age,
                mobile,
                email,
            });

            // Save the user to the database
            const savedUser = await newUser.save();

            // Respond with the saved user
            res.status(201).json(savedUser);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },
    getUserById: async (req, res) => {
        try {
            const userId = req.params.id;

            // Validate user ID format (if needed)
            if (!isValidObjectId(userId)) {
                return res.status(400).json({ error: 'Invalid user ID' });
            }

            // Query the database for the user
            const user = await UserModel.findById(userId);

            // Check if user exists
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            // Respond with the user data
            res.status(200).json(user);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },
    getUsers: async (req, res) => {
        try {
            const users = await UserModel.find();
            res.status(200).json(users);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },
    updateUserById: async (req, res) => {
        try {
            const userId = req.params.id;
            const { user, interest, age, mobile, email } = req.body;

            if (!isValidObjectId(userId)) {
                return res.status(400).json({ error: 'Invalid user ID' });
            }

            const updatedUser = await UserModel.findByIdAndUpdate(userId, {
                user,
                interest,
                age,
                mobile,
                email,
            }, { new: true });

            if (!updatedUser) {
                return res.status(404).json({ error: 'User not found' });
            }

            res.status(200).json(updatedUser);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },
    deleteUserById: async (req, res) => {
        try {
            const userId = req.params.id;

            if (!isValidObjectId(userId)) {
                return res.status(400).json({ error: 'Invalid user ID' });
            }

            const deletedUser = await UserModel.findByIdAndDelete(userId);

            if (!deletedUser) {
                return res.status(404).json({ error: 'User not found' });
            }

            res.status(200).json({ message: 'User deleted successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },
}

module.exports = userController


// Helper function to validate MongoDB ObjectId
function isValidObjectId(id) {
    const mongoose = require('mongoose');
    return mongoose.Types.ObjectId.isValid(id);
}