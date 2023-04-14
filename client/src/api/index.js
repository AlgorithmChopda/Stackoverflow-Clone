import axios from 'axios'

const API = axios.create( {baseURL: 'https://stackoverflow-clone.up.railway.app/'} )

API.interceptors.request.use((req) => {
    if(localStorage.getItem('Profile')){
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('Profile')).token}`
    }
    return req;
})

export const logIn = (authData) => API.post('/user/login', authData)
export const signUp = (authData) => API.post('/user/signup', authData)
export const fetchAllUsers = () => API.get('/user/getAllUsers')
export const updateProfile = (id, updateData) => API.patch( `/user/update/${id}`, updateData)

export const postQuestion = (questionData) => API.post('/questions/Ask', questionData)
export const getAllQuestions = () => API.get('/questions/get')
export const deleteQuestion = (id) => API.delete(`/questions/delete/${id}`)
export const voteQuestion = (id, type, userId) => API.patch(`/questions/vote/${id}`, {type, userId})

export const postAnswer = (id, noOfAnswers, answerBody, userAnswered, userId) => API.patch(`/answer/post/${id}`, {id, noOfAnswers, answerBody, userAnswered, userId} )
export const deleteAnswer = (id, answerId, noOfAnswers) => API.patch(`/answer/delete/${id}`, {answerId, noOfAnswers} )

export const addComment = (commentData) => API.post('/comment/add', commentData)
export const deleteComment = (comment_id) => API.delete(`/comment/delete/${comment_id}`)
export const editComment = (commentData) => API.patch('/comment/edit', commentData)