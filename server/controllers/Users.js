import mongoose from "mongoose";
import User from '../models/auth.js'


export const getAllUsers = async(req, res) => {
    try{
        const allUsers = await User.find();
        const allUsersDetails = []
        allUsers.forEach(user => {
            allUsersDetails.push( {_id: user._id, name: user.name, about: user.about, tags: user.tags, joinedOn: user.joinedOn, loc: user.loc} )
        })

        return res.status(200).json(allUsersDetails)
    }
    catch(error){
        console.log(error);
        return res.status(404).json( {message: error.message})
    }
}

export const updateProfile = async(req, res) => {
    const {id: _id} = req.params
    const {name, about, tags, loc} = req.body

    if( !mongoose.Types.ObjectId.isValid(_id))
        return res.status(404).send("Profile not available....")

    try{                                                                                                                  // returns the new updated profile  
        const updatedProfile = await User.findByIdAndUpdate(_id, { $set: {'name': name, 'about': about, 'tags': tags, 'loc': loc } }, {new: true} )
        return res.status(200).json(updatedProfile)
    }
    catch(error){
        console.log(error);
        return res.status(404).json( {message: error.message} )
    }
}