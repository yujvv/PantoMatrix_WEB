import React, { useRef, useEffect } from "react";

const WebGLAudioPlayer = () => {
    const canvasRef = useRef(null);
    const audioRef = useRef(null);
    const modelRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const audio = new Audio("/path/to/your/audio/file.mp3"); // Update with the path to your audio file
        const model = new Image();
        const context = new AudioContext();
        const analyser = context.createAnalyser();

        // Set up the canvas
        const ctx = canvas.getContext("2d");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Set up the audio
        audio.crossOrigin = "anonymous";
        audio.addEventListener("canplaythrough", () => {
            const source = context.createMediaElementSource(audio);
            source.connect(analyser);
            analyser.connect(context.destination);
            // Request user interaction before playing audio
            const playPromise = audio.play();
            if (playPromise) {
                playPromise.catch(error => {
                    // Play was prevented, handle error if needed
                    console.error('Failed to play audio:', error);
                });
            }
        });

        // Set up the model
        model.src = "/path/to/your/3d/model.jpg"; // Update with the path to your 3D model texture
        model.onload = () => {
            ctx.drawImage(model, 0, 0, canvas.width, canvas.height);
            modelRef.current = model;
        };

        // Animation loop
        const animate = () => {
            requestAnimationFrame(animate);

            // Get the audio data
            const data = new Uint8Array(analyser.frequencyBinCount);
            analyser.getByteFrequencyData(data);

            // Update the canvas with the audio data
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(modelRef.current, 0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
            for (let i = 0; i < data.length; i++) {
                const barHeight = data[i] / 2;
                const x = i * (canvas.width / data.length);
                const y = canvas.height - barHeight;
                ctx.fillRect(x, y, canvas.width / data.length - 1, barHeight);
            }
        };

        animate();

        // Cleanup
        return () => {
            audio.pause();
            audio.currentTime = 0;
            analyser.disconnect();
            source.disconnect(); // Disconnect the audio element from the audio context
        };
    }, []);

    return (
        <div>
            <canvas ref={canvasRef}/>
            <audio ref={audioRef.current} controls/> {/* Fix here */}
        </div>
    );
};

export default WebGLAudioPlayer;
