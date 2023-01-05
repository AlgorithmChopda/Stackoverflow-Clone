import Questions from '../models/Questions.js'
import Comments from '../models/Comments.js';
import mongoose from 'mongoose'

export const AskQuestion = async (req, res) => {
    const postQuestionData = req.body;
    const postQuestion = new Questions(postQuestionData);
    console.log(postQuestionData)
    try {
        await postQuestion.save();
        res.status(200).json("Posted a question successfully")
    } catch (error) {
        res.status(409).json("Couldn't post a new question")        
    }
}

export const getAllQuestions = async (req, res) => {
    try{
        const questionList = await Questions.find();
        const comment_list = await Comments.find();

        res.status(200).json( {questionList, comment_list} );
    }
    catch(error){
        res.status(404).json("Hello Error")
    }
}

export const deleteQuestion = async (req, res) => {
    const {id: _id} = req.params;
    if( !mongoose.Types.ObjectId.isValid(_id))
        return res.status(404).send("Question not available....")

    try{
        await Questions.findByIdAndRemove(_id);
        return res.status(200).json( {message: "Successfully deleted "} )
    }
    catch(error){
        console.log(error)
        return res.status(404).json( {message: error.message} )
    }
}

export const voteQuestion = async (req, res) => {
    const {id: question_id} = req.params;
    const { type, userId } = req.body;

    if( !mongoose.Types.ObjectId.isValid(question_id))
        return res.status(404).send("Question not available....")

    try{
        const question = await Questions.findById(question_id);
        const upindex = question.upVote.findIndex( (id) => id === String(userId) )
        const downindex = question.downVote.findIndex( (id) => id === String(userId) )

        if(type === 'upvote'){ // user wants to upvote
            
            if(upindex !== -1) // user has upvoted
                question.upVote = question.upVote.filter( (id) => id !== userId)
            
            else{   // user hasn't upvoted 
                question.upVote.push(userId); 
                if(downindex !== -1)
                    question.downVote = question.downVote.filter( (id) => id !== userId)   
            }
        }
        else{   // user wants to downvote
            if(downindex !== -1) // user has downvoted
                question.downVote = question.downVote.filter( (id) => id !== userId)
            
            else{   // user hasn't downvoted
                question.downVote.push(userId); 
                if(upindex !== -1)
                    question.upVote = question.upVote.filter( (id) => id !== userId)   
            }        
        }

        await Questions.findByIdAndUpdate(question_id, question)
        return res.status(200).json( {message: "user voted"} )
    }
    catch(error){
        console.log(error)
        return res.status(404).json( {message: "unable to vote"} )
    }
}