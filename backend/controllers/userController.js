// used to get the current logged in user
import uploadOnCloudinary from '../config/cloundinary.js';
import upload from '../middleware/multer.js';
import User from '../model/userModel.js';

export const getCurrentUser = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password').populate("enrolledCourses"); // Assuming req.user is set by authentication middleware
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }   
        res.status(200).json(user);
    } catch (error) {
        console.error('Error getting current user:', error);
        res.status(500).json({ message: `Get current user error: ${error}` }); 
    }
};
export default { getCurrentUser };

// now make route of this controller in routes/userRoute.js

export const updateProfile = async(req, res) => {
    try {
        const userId = req.userId
        const { description, name } = req.body
        let photoUrl
        if(req.file) {
            photoUrl = await uploadOnCloudinary(req.file.path)
        }
        const user = await User.findByIdAndUpdate(userId, {name, description, photoUrl})
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        await user.save()
        res.status(200).json(user);
    } catch(error) {
        res.status(500).json({ message: `Update Profile error: ${error}` });
    }
}