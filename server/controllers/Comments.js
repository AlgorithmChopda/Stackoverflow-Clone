import Comments from '../models/Comments.js'
import mongoose from 'mongoose'

export const AddComment = async (req, res) => {

    const {answer_id, user_id, commentBody} = req.body
    if( 
        !mongoose.Types.ObjectId.isValid(answer_id)   ||
        !mongoose.Types.ObjectId.isValid(user_id)
    )
        return res.status(404).send("Invalid data.....")

    const  _comment = new Comments({comment_body: commentBody, comment_userid: user_id, comment_answerid: answer_id})

    try{
        await _comment.save();
    }
    catch(error){
        console.log(error);
        return res.status(200).json( {message: "error"} )
    }
        
    return res.status(200).json( {message: "Successfully working"} )
}   


export const DeleteComment = async (req, res) => {

    if(!mongoose.Types.ObjectId.isValid(req.params.id))
        return res.status(404).send("Invalid data.....")

    await Comments.findByIdAndDelete(req.params.id);
    
    return res.status(200).json( {message: "Successfully working"} )
}


export const EditComment = async (req, res) => {
    
    const { comment_id, edit_comment } = req.body

    if(!mongoose.Types.ObjectId.isValid(comment_id))
        return res.status(404).send("Invalid data.....")
    
    try{
        const comment = await Comments.findById(comment_id)
        comment.comment_body = edit_comment
        console.log(comment)
        await Comments.findByIdAndUpdate(comment_id, comment)

        return res.status(200).json( {message: "Comment Edited"} )
    }
    catch(error){
        console.log(error)
    }
}