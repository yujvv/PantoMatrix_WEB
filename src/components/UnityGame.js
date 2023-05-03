import React, { useState } from "react";
import "./components.css";
import { Button } from "antd";

function WebGLPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    function handleLoadProgress(event) {
        if (event.lengthComputable) {
            const loaded = event.loaded / event.total;
            setProgress(loaded * 100);
        }
    }

    function handleLoadComplete() {
        setIsLoading(false);
    }

    function handleTogglePlay() {
        setIsPlaying(!isPlaying);
        if (!isPlaying) {
            setIsLoading(true);
        }
    }

    const unityGameUrl = isPlaying ? "/WebGL/index.html" : "";

    return (
        <div className="webgl-page">
            {isLoading && (
                <div className="progress-bar" style={{ width: `${progress}%` }} />
            )}
            <div className="webgl-window" style={{ display: isPlaying ? "block" : "none" }}>
                <iframe
                    src={unityGameUrl}
                    width="800"
                    height="600"
                    frameBorder="0"
                    title="Unity WebGL Build"
                    onLoad={handleLoadComplete}
                    onProgress={handleLoadProgress}
                />
                <Button className="close-button" type="primary" onClick={handleTogglePlay}>
                    Close
                </Button>
            </div>
            {!isPlaying && (
                <Button
                    className="play-button"
                    type="primary"
                    style={{ backgroundColor: "green", width: "200px", height: "50px", fontSize: "24px", display: "block", margin: "0 auto" }}
                    onClick={handleTogglePlay}
                >
                    Play
                </Button>

                // <Button className="play-button" type="primary" onClick={handleTogglePlay}>
                //     Play
                // </Button>
            )}
            {isPlaying && (
                <Button
                    className="pause-button"
                    type="primary"
                    style={{ backgroundColor: "red", width: "200px", height: "50px", fontSize: "24px", display: "block", margin: "0 auto" }}
                    onClick={handleTogglePlay}
                >
                    Pause
                </Button>
            )}
        </div>
    );
}

export default WebGLPage;
