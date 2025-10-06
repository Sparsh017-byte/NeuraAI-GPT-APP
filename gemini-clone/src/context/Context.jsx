import { useState } from "react";
import { generateText } from "../api/geminiApi";

import { createContext } from "react";

export const Context = createContext()
const ContextProvider = (props)=>{

    const[input,setInput] = useState("");
    const[recentPrompt,setRecentPrompt] = useState("");
    const[prevPrompts,setPrevPrompts] = useState([]);
    const[showResult,setShowResult] = useState(false);
    const[loading,setLoading] = useState(false);
    const[resultData,setResultData] = useState("");

    const delayPara = (index,nextWord) =>{
        setTimeout(()=>{
            setResultData(prev=>prev+nextWord)
        },50*index)
    }
    const newChat = () =>{
        setLoading(false)
        setShowResult(false)
    }

    const onSent = async(prompt)=>{
        setResultData("")
        setLoading(true)
        setShowResult(true)
        let response;
        if(prompt !== undefined){
            response = await generateText(prompt)
            setRecentPrompt(prompt)
        }
        else{
            setPrevPrompts(prev=>[...prev,input])
            setRecentPrompt(input)
            response = await generateText(input)
        }
        
        
        
        
        
        let newResponseArray = response.split(" ");
        for(let i = 0;i<newResponseArray.length;i++){
            const nextWord = newResponseArray[i];
            delayPara(i,nextWord + " ")
        }
        setLoading(false)
        setInput("")
    }
    
    const contextValue = {
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat
        
    }
    return (
        <Context.Provider value={contextValue}> 
            {props.children}
        </Context.Provider>
    )
}
export default ContextProvider