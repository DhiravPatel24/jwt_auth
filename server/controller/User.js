const User = require('../model/User.js')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const AddUser = async (req,res) =>{
    const {email, password} = req.body

    try{
        const newUser = new User({
            email,
            password
        })
        await newUser.save()
        res.status(200).json({
            message:'use added sucessfully',
            user:newUser
        })
    }catch(error){
        console.log('Error in adding the user', error)
        res.status(500).json({message:'server error'})
    }
}


const JWT_SECRET = process.env.JWT_SECRET;
const LoginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        console.log("user",user)
        if (!user) {
            return res.status(401).json({ message: 'Invalid email' });
        }

        const isPasswordValid = await User.findOne({ password });
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
            expiresIn: '1h',
        });

        res.status(200).json({
            message: 'Login successful',
            token,
        });
    } catch (error) {
        console.error('Error in logging in the user', error);
        res.status(500).json({ message: 'Server error' });
    }
};


module.exports = {AddUser,LoginUser}