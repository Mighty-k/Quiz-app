import 'bootstrap'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './Home'
import QuestionDisplay from './QuestionDisplay'
import Results from './Results'
import ScrollToTop from './ScrollTop'

const App = () => {
  return(
   <Router>
    <ScrollToTop />
    <Routes>
      <Route exact path='/' element = {<Home/>}/>
      <Route exact path='/quiz' element = {<QuestionDisplay/>}/>
      <Route path="/results" element={<Results/>} />
    </Routes>
   </Router>
  )
}

export default App
