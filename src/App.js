import React, { useState } from 'react';
import { Input, Button, Spin } from 'antd';
import axios from 'axios';
// import UnityWebGLComponent from './components/UnityGame';
import PopUpWindow from "./components/PopUp";
import './App.css';

function App() {
    const [prompt, setPrompt] = useState('');
    const [outputText, setOutputText] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleInputChange = (event) => {
        setPrompt(event.target.value);
    };

    const handleButtonClick = async () => {
        // e.preventDefault();
        setLoading(true);
        console.log({prompt});
        axios
            .post("http://localhost:5555/chat", {prompt})
            .then((res)=> {

                setOutputText(res.data) ;
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
            });

        // setIsModalVisible(true);
    };

    const handleModalOk = () => {
        setIsModalVisible(false);
    };

    // const handleDownload = () => {
    //     // Make a GET request to the /download endpoint
    //     fetch("/download")
    //         .then((response) => {
    //             if (response.ok) {
    //                 console.log("File downloaded successfully!");
    //             } else {
    //                 console.error("Error downloading file:", response.statusText);
    //             }
    //         })
    //         .catch((err) => {
    //             console.error("Error downloading file:", err);
    //         });
    // };


    return (
        <div style={{padding: '20px'}}>
            <h1>Chat with GPT</h1>

            <Input.TextArea
                rows={4}
                placeholder="Enter some text..."
                value={prompt}
                onChange={handleInputChange}
                style={{marginBottom: '20px'}}
            />

            <Button type="primary" onClick={handleButtonClick} disabled={loading}>
                {loading ? <Spin/> : 'Send'}
            </Button>

            {outputText !== null && (
                <div style={{marginTop: '20px'}}>
                    <h3>Response:</h3>
                    <p>{outputText}</p>
                </div>
            )}
            {/*<div*/}
            {/*<UnityGame />*/}
            {/*</div>*/}

            <PopUpWindow
                visible={isModalVisible}
                onOk={handleModalOk}
                onCancel={handleModalOk}
                onSubmit={handleModalOk}
            />

        </div>
    );
}

export default App;
