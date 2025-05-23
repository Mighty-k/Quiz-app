    import { useState } from "react";
    import { motion } from "framer-motion";
    import PropTypes from 'prop-types';
    const Categories = ({name,difficulties, onSelect}) => {
    const [ expanded,setExpanded] = useState(false)
   
    const handleDifficultyClick = (difficulty) => {
        onSelect(name,difficulty)
    }
    const handleToggle = () => {
        setExpanded(!expanded);
      };
    return(
        <>
        <motion.div 
                        className="subject"
                        whileHover={{scale:0.9}}
                        onClick={handleToggle}
                        transition={{duration:0.01}}
                        >
                            <motion.h3
                            initial={{fontSize:22,y:0}}
                            animate={{ fontSize: expanded ? 18 : 24, y: expanded ? -10 : 0 }}
                            transition={{duration:0.01}}
                            >{name}</motion.h3>
                        
                            { expanded && (
                            <motion.div 
                            className="difficulties"
                            initial={{opacity:0}}
                            animate={{opacity:1, y: expanded ? -10 : 0 }}
                            >
                        {Object.keys(difficulties).map((difficulty, index) => (
                        <p key={index} >
                            <motion.button 
                            onClick={() => handleDifficultyClick(difficulty)}
                            whileTap={{ scale: 0.85 }}
                            transition={{ type: 'spring', stiffness: 300 }}
                            >
                            {difficulty}
                            </motion.button>
                            </p>
                ))}
                    </motion.div>
        ) }
        </motion.div>
        
        </>
    )
    }
    Categories.propTypes = {
        name: PropTypes.string.isRequired,
        difficulties: PropTypes.shape({
          easy: PropTypes.object,
          medium: PropTypes.object,
          hard: PropTypes.object
        }).isRequired,
        onSelect: PropTypes.func.isRequired
      };
    export default Categories