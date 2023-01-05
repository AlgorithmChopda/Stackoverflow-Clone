import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useSelector} from 'react-redux'
import './HomeMainbar.css'
import Questions from './Questions'
import QuestionList from './QuestionList'
    
const HomeMainbar = () => {

  const user = 12;  
  const navigate = useNavigate() 
  const location = useLocation()

  const questionsList = useSelector(state => state.questionsReducer)
  
    const checkAuth = () => {
        if( user === null ){
            alert("Login or Signup to Ask a Question")    
            navigate("/Auth") 
        }
        else{
            navigate('/AskQuestion')
        }
     }
      return (
              <div className='main-bar'>
                <div className='main-bar-header'>
                    {
                      location.pathname === '/' ? 
                        <h1>Top Questions</h1> : <h1>All Questions</h1>
                    }
                    <button onClick={checkAuth} className='ask-btn'> Ask Question</button>
                </div>    
                    <div>
                        {
                            questionsList.data == null 
                              ? <h1> Loading ....</h1>
                              : <>
                                    <p> { questionsList.data.length } Questions</p>
                                    <QuestionList questionsList = {questionsList.data} />
                                </>
                        }
                    </div>
            </div>
      )
}

export default HomeMainbar
