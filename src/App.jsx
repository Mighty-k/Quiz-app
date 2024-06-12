import 'bootstrap'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './Home'
import QuestionDisplay from './QuestionDisplay'

const App = () => {
  return(
   <Router>
    <Routes>
      <Route exact path='/' element = {<Home/>}/>
      <Route exact path='/quiz' element = {<QuestionDisplay/>}/>
    </Routes>
   </Router>
  )
}

export default App
