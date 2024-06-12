import { Link } from "react-router-dom"
import { motion } from "framer-motion"
const Nav = () => {
    return (
        <nav className="navbar">
            <p>
                QuizMe
            </p>
            <ul>
                <motion.li className="nav-item home-lnk"
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 300, duration:0.01 }}
                >
                    <Link to='/'>
                        Home
                    </Link>
                </motion.li>
            </ul>
            </nav>
    )
}

export default Nav