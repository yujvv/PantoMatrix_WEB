import React from 'react';

const UnityWebGLComponent = () => {
    return (
        <div>
            <h1>Unity WebGL Build</h1>
            <iframe
                src="/webgl/build/index.html" // Update the path to your WebGL build
                width="800"
                height="600"
                frameBorder="0"
                title="Unity WebGL Build"
            ></iframe>
        </div>
    );
};

export default UnityWebGLComponent;
