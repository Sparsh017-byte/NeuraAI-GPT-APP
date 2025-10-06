import React from 'react'
import './Main.css'
import { assets } from '../../assets/assets'
import { useContext } from 'react'
import { Context } from '../../context/Context'
import ReactMarkdown from 'react-markdown';

import rehypeHighlight from 'rehype-highlight';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import remarkGfm from 'remark-gfm';

import 'katex/dist/katex.min.css';
import 'highlight.js/styles/github.css';

const Main = () => {
    const { onSent, recentPrompt, showResult, loading, resultData, setInput, input } = useContext(Context)

    const onCardClick = async(p) => {
        await setInput(p)
        onSent(p)
    }

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {

            onSent()

        }
    };

    return (
        <div className='main'>
            <div className="nav">
                <p>NeuraAI</p>
                <img src={assets.user_icon} alt="" />
            </div>

            <div className="main-container">
                {!showResult ?
                    <>
                        <div className="greet">
                            <p><span>Hello,Dev.</span></p>
                            <p>How can i help you today?</p>
                        </div>
                        <div className="cards">
                            <div onClick={() => { onCardClick("Suggest beautiful places to see on an upcoming road trip") }} className="card">
                                <p>Suggest beautiful places to see on an upcoming road trip</p>
                                <img src={assets.compass_icon} alt="" />
                            </div>
                            <div onClick={() => { onCardClick("Briefly summarize this concept: urban planning") }} className="card">
                                <p>Briefly summarize this concept: urban planning</p>
                                <img src={assets.bulb_icon} alt="" />
                            </div>
                            <div onClick={() => { onCardClick("Brainstorm team bonding activities for our work retreat") }} className="card">
                                <p>Brainstorm team bonding activities for our work retreat</p>
                                <img src={assets.message_icon} alt="" />
                            </div>
                            <div onClick={() => { onCardClick("What is reactJs and where is it used") }} className="card">
                                <p>What is reactJs and where is it used</p>
                                <img src={assets.code_icon} alt="" />
                            </div>
                        </div>

                    </>
                    : <div className='result'>
                        <div className="result-title">
                            <img src={assets.user_icon} alt="" />
                            <p>{recentPrompt}</p>
                        </div>
                        <div className="result-data">
                            <img src={assets.gemini_icon} alt="" />

                            {loading ?
                                <div className='loader'>
                                    <hr />
                                    <hr />
                                    <hr />

                                </div>
                                :
                                <div className="markdown-container">
                                    <ReactMarkdown
                                        remarkPlugins={[remarkMath, remarkGfm]}
                                        rehypePlugins={[rehypeHighlight, rehypeKatex]}
                                        components={{
                                            table: ({ node, ...props }) => (
                                                <table className="custom-table" {...props} />
                                            ),
                                            th: ({ node, ...props }) => (
                                                <th className="custom-th" {...props} />
                                            ),
                                            td: ({ node, ...props }) => (
                                                <td className="custom-td" {...props} />
                                            ),
                                        }}
                                    >
                                        {resultData}
                                    </ReactMarkdown>
                                </div>



                            }



                        </div>
                    </div>



                }

                <div className="main-bottom">
                    <div className="search-box">
                        <input type="text" onChange={(e) => { setInput(e.target.value) }} value={input} onKeyDown={handleKeyDown} placeholder='Enter your prompt here' />
                        <div>
                            <img src={assets.gallery_icon} alt="" />
                            {/* <img src={assets.mic_icon} alt="" /> */}
                            <img src={assets.send_icon} onClick={() => { onSent() }} alt="" />
                        </div>
                    </div>

                </div>
            </div>


        </div>
    )
}

export default Main
