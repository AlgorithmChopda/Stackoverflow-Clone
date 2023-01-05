import * as api from '../api/index'
import { fetchAllQuestions } from './question';

export const addComment = (commmentData) => async (dispatch) => {
    try{    
        await api.addComment(commmentData)
        dispatch(fetchAllQuestions())
    }
    catch(error){
        console.log(error)
    }
}

export const deleteComment = (comment_id) => async (dispatch) => {
    try {
        await api.deleteComment(comment_id)
        dispatch(fetchAllQuestions())
    }
    catch(error){
        console.log(error)
    }
}

export const editComment = (commentData) => async (dispatch) => {
    try{
        await api.editComment(commentData);
        dispatch(fetchAllQuestions())
    }
    catch(error){
        console.log(error)
    }
}