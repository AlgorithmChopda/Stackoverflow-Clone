import mongoose  from "mongoose";
import Questions from "../models/Questions.js";

export const postAnswer = async (req, res) => {
    const { id: _id } = req.params;
    const { noOfAnswers, answerBody, userAnswered, userId } = req.body;

    if( !mongoose.Types.ObjectId.isValid(_id))
        return res.status(404).send("Question not available....")
    updateNoOfAnswers(_id, noOfAnswers)
    try{
        const updatedQuestion = await Questions.findByIdAndUpdate(_id, { $addToSet: {'answer': [ {answerBody, userAnswered, userId}]  }}  )
        return res.status(200).json(updatedQuestion)
    }
    catch(error){
        return res.status(404).json(error)
    }
}

export const updateNoOfAnswers = async(_id, noOfAnswers) => {
    try{
        await Questions.findByIdAndUpdate(_id, { $set:  {'noOfAnswers': noOfAnswers}  })
    }
    catch(error){
        console.log(error)
    }
}

export const deleteAnswer = async(req, res) => {
    const { id: _id } = req.params;
    const { answerId, noOfAnswers } = req.body;

    if( !mongoose.Types.ObjectId.isValid(_id))
        return res.status(404).send("Question not available....")

    if( !mongoose.Types.ObjectId.isValid(answerId))
        return res.status(404).send("Answer available....")    

    updateNoOfAnswers(_id, noOfAnswers)

    try{ 
        await Questions.updateOne(
            {_id},
            { $pull : {'answer' : {_id: answerId}}}
        )
        return res.status(200).json( {message: "Successfully deleted"} )
    }   
    catch(error){
        console.log(error)
        return res.status(404).json(error) 
    }
}