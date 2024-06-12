import Categories from "./Categories"
import "./Home.css"
import Nav from "./Nav";
import questionsData from './questions.json'
import { useNavigate } from "react-router-dom"
// import {motion} from 'framer-motion'


const Home = () => {
    const navigate = useNavigate()
   
    const handleSelect = (subject, difficulty) => {
       navigate('/quiz', {state:{subject, difficulty}})
    }

    return(
    <>
        <Nav/>
                <section className="subjects">
                <div className="container text-center">
                    <p className="text-center">
                        Welcome, Pick a subject!
                    </p>
                    <div className="container subj-grid ">
                        {
                            questionsData.map((questions, index) => (  
                                <Categories 
                                    key={index}
                                    name={questions.name} 
                                    difficulties={questions.difficulties}
                                    onSelect={handleSelect}
                                />
                              ))
                        }
                    </div>
                </div>
    
            </section>
     </>
          );
        };
       
export default Home