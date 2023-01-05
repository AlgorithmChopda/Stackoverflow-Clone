import { Routes, Route } from 'react-router-dom'
import Auth from './pages/Auth/Auth'
import React from 'react'
import Home from './pages/Home/Home'
import Questions from './pages/Questions/Questions'
import AskQuestion from './pages/AskQuestion/AskQuestion'
import DisplayQuestions from './pages/Questions/DisplayQuestions'
import Tags from './pages/Tags/Tags'
import Users from './pages/Users/Users'
import UserProfile from './pages/UserProfile/UserProfile'
const AllRoutes = () => {
  return (  
      <Routes>
          <Route exact path='/' element={ <Home /> }> </Route>
          <Route exact path='/Auth' element={ <Auth /> }> </Route>
          <Route exact path='/Questions' element={ <Questions /> }> </Route>
          <Route exact path='/AskQuestion' element={ <AskQuestion /> }> </Route>
          <Route exact path='/Questions/:id' element={ <DisplayQuestions /> }> </Route>
          <Route exact path='/Tags' element={ <Tags /> }> </Route>
          <Route exact path='/Users' element={ <Users />}> </Route>
          <Route exact path='/Users/:id' element={ <UserProfile />}> </Route>
      </Routes>
  );
}

export default AllRoutes
