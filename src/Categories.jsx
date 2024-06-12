    import { useState } from "react";
    import { motion } from "framer-motion";

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
                        >
                            <motion.h3
                            initial={{fontSize:22,y:1}}
                            animate={{ fontSize: expanded ? 18 : 24, y: expanded ? -20 : 0 }}
                            transition={{duration:0.1}}
                            >{name}</motion.h3>
                        
                            { expanded && (
                            <motion.div 
                            className="difficulties"
                            initial={{opacity:0}}
                            animate={{opacity:1, y: expanded ? -20 : 0 }}
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
    export default Categories