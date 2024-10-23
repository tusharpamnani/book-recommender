import React from 'react'
import { motion } from "framer-motion"

export default function Test(){
  return (
    <>
      <div style={{height:'150vh',background:'grey'}}> 
      <motion.div
            style={{height:'100vh',background:'black'}}
            initial={{opacity:0}}
            whileInView={{opacity:1}}
            transition={{duration:1}}
      >
        hello world
      </motion.div>
      </div>
    </>
  )
}
