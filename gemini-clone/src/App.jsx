import React from 'react'
import Sidebar from './components/Sidebar/Sidebar'
import Main from './components/Main/Main'
import { generateText } from "./api/geminiApi";

const App = () => {
  // const prompt = "What is reactJs"
  // const sendPromt = async (prompt)=>{
  //   const result = await generateText(prompt);
  //   console.log(result)
  // }
  // sendPromt(prompt)

  return (
    <>
      <p></p>
      <Sidebar/>
      <Main/>
    </>
  )
}

export default App
