
import Navbar from './components/Navbar/Navbar'
import AllRoutes from './AllRoutes'
import { BrowserRouter  } from 'react-router-dom';
import { useEffect } from 'react'
import { fetchAllQuestions } from './actions/question'
import { useDispatch } from 'react-redux'
import { fetchAllUsers } from './actions/users'

function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchAllQuestions())
    dispatch(fetchAllUsers())
  }, [dispatch])

  return (
    <div>
        <BrowserRouter>
          <Navbar />  
          <AllRoutes />
        </BrowserRouter>
    </div>
  )

}

export default App;
