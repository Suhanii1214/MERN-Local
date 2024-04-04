import User from '../models/user.model.js'
import jwt from 'jsonwebtoken'
import ENV from '../config.js'
import bcrypt, { hash } from 'bcrypt'

//signup function
export const signup = (req,res) => {
    const {name, email, password} = req.body

    if(!name || !email || !password) {
        res.status(400).json({msg: 'Please enter all fields'})
    }

    User.findOne({email})
    .then(user => {
        if(user) return res.status(400).json({msg: 'User already exists'})

        const newUser = new User({name, email, password})

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, (err, hash) => {
                if(err) throw err
                newUser.password = hash
                newUser.save()
                    .then(user => {
                        jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: 3600}, (err, token) => {
                            if(err) throw err
                            res.json({ 
                                token,
                                user: {
                                    id: user._id,
                                    name: user.name,
                                    email: user.email
                                }
                            })
                            }
                        )
                    })
            })
    })
})
}


//login function
export const login = async (req,res) => {
    const { email, password } = req.body;
    if(!email || !password){
        res.status(400).json({msg: 'Please enter all fields'});
    }
    User.findOne({email})
        .then(user => {
            if(!user) return res.status(400).json({msg: 'User does not exist'});

            // Validate password
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if(!isMatch) return res.status(400).json({ msg: 'Invalid credentials'});

                    jwt.sign(
                        { id: user._id },
                        process.env.JWT_SECRET,
                        { expiresIn: 3600 },
                        (err, token) => {
                            if(err) throw err;
                            res.json({
                                token,
                                user: {
                                    id: user._id,
                                    name: user.name,
                                    email: user.email
                                }
                            });
                        }
                    )
                })
        })
}

//showing user info
export const get_user = (req,res) => {
    User.findById(req.user.id)
        .select('-password')
        .then(user => res.json(user));
}

export const updateUser = async (req, res) => {
    const { name, email, contact, address } = req.body;

    try {
        // Find the user by ID
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        // Update user information if provided
        if (name) user.name = name;
        if (email) user.email = email;
        if (contact) user.contact = contact;
        if (address) user.address = address;

        // Save the updated user
        await user.save();

        // Respond with the updated user (excluding the password)
        const updatedUser = await User.findById(req.user.id).select('-password');
        res.json(updatedUser);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};


const authController = { signup, login, get_user, updateUser };
export default authController;


