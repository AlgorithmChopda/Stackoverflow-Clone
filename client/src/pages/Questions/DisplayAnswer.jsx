import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import Avatar from '../../components/Avatar/Avatar'
import { useSelector, useDispatch} from 'react-redux'
import { useParams } from 'react-router-dom'
import { deleteAnswer } from '../../actions/question'
import { addComment, deleteComment, editComment } from '../../actions/comments'

const DisplayAnswer = ( { question, handleShare }  ) => {

    const User = useSelector((state) => (state.currentUserReducer))
    const comment_list = useSelector((state) => (state.commentReducer))

    const dispatch = useDispatch()
    const { id } = useParams()
    
    //const [button, setButton] = useState(false);
    const [commentId, setCommentId] = useState(null); // <-- initially null
    const [ commentBody, setCommentBody ] = useState('')

    const handleDelete = (answerId, noOfAnswers) => {
        dispatch(deleteAnswer(id, answerId, noOfAnswers-1))
    }


    const handlePostComment = (e) => {
        setCommentId(null)
        var answer_id = e.target.id
        var user_id = User.result._id
        if(commentBody !== '')
        dispatch(addComment(  {answer_id, user_id, commentBody}  ))
    }

    const handleComment = (e) => {
        if(commentId !== null)
            setCommentId(null)
        else
            setCommentId(e.target.id); // <-- set answer id here                
    };

    const handleCommentDelete = (comment_id) => {
        dispatch(deleteComment(comment_id));
    }

    const handleCommentEdit = (comment_id, comment_body) => {
        var edit_comment = prompt("Edit Comment ", comment_body)
        if(edit_comment === "")
            alert("Comment cannot be empty");
        if(edit_comment !== null && edit_comment !== "")
            dispatch(editComment({comment_id, edit_comment}));    
    }

    return (

        <div>
            {   
                question.answer.map( (ans) => (
                    
                    <div className="display-ans" key={ans._id}>
                        <p>{ans.answerBody}</p>
                        <div className="question-actions-user">
                            <div>
                                <button type="button" onClick={handleShare}>Share</button>
                                {          
                                    User?.result?._id === ans?.userId && (
                                        <button type='button' onClick={ () => handleDelete(ans._id, question.noOfAnswers) }>Delete</button>
                                    )
                                }
                                
                                    <button id={ans._id} type="button" onClick={handleComment} >
                                        Add Comment
                                    </button>

                                    {
                                        commentId === ans._id && 
                                        ( // <-- conditionally render match by id
                                            <div id={ans._id}>
                                            <textarea id = {ans._id} rows="5" cols="30"  onChange={(e) => {setCommentBody(e.target.value)}} />
                                            <br />
                                            <button type="button" id = {ans._id} onClick={handlePostComment} >Post</button>
                                            </div>
                                        )
                                    }
                                
                            </div>

                            <div>
                                <p>answered { moment(ans.answeredOn).fromNow()}</p>
                                <Link to={`/Users/${ans.userId}`} className='user-link' style={{color:'#0086d8'}}>
                                    <Avatar backgroundColor="lightgreen" px='8px' py='5px' borderRadius='4px'>{ans.userAnswered.charAt(0).toUpperCase()}</Avatar>
                                    <div>
                                        {ans.userAnswered}
                                    </div>
                                </Link>
                            </div>

                        </div>

                            <div >
                                {
                                    
                                     comment_list.data.map((comment) => (
                                        <div>
                                                <h5> </h5>
                                                {
                                                    comment.comment_answerid === ans._id
                                                    &&  ( <div class="display-comment"> { comment.comment_body } </div> )
                                                }

                                                {
                                                    comment.comment_answerid === ans._id
                                                    && comment.comment_userid === User?.result?._id
                                                    && ( <>
                                                        <button type='button' className='sep-button' style={{marginLeft: "50px", marginTop: "10px"}} onClick={ () => handleCommentEdit(comment._id, comment.comment_body) }> Edit</button>
                                                        <button type='button' className='sep-button'  onClick={ () => handleCommentDelete(comment._id) }> Delete</button>
                                                        
                                                        <div hidden>
                                                        <textarea id="descricaoLinha" name="descricaoLinha" onFocus="resetField('descricaoLinha')" > TEXT-TEXT-TEXT</textarea>
                                                        </div>
                                                        </>
                                                    )
                                                }
                                        </div>
                                     ))
                                }
                                        
                            </div>
                   </div> 
                ))
            }
        </div>


    )
}

export default DisplayAnswer
