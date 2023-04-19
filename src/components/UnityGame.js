import React from "react";
import { Canvas } from "react-three-fiber";

function WebGLComponent() {
    return (
        <div style={{ width: "800px", height: "600px" }}>
            <Canvas>
                <ambientLight />
                <pointLight position={[10, 10, 10]} />
                <mesh>
                    <planeBufferGeometry attach="geometry" args={[16, 16]} />
                    <meshStandardMaterial attach="material" color="white" />
                </mesh>
                <mesh>
                    <planeBufferGeometry attach="geometry" args={[10, 10]} />
                    <meshStandardMaterial attach="material" transparent>
                        <texture attach="map" url="/webgl/build/Build/UnityLoader.js" />
                        <texture attach="alphaMap" url="/webgl/build/Build/UnityLoader.js.mem" />
                    </meshStandardMaterial>
                </mesh>
            </Canvas>
        </div>
    );
}

export default WebGLComponent;



// import React from "react";
// import { Unity, useUnityContext } from "react-unity-webgl";
//
// function App() {
//     const { unityProvider } = useUnityContext({
//         loaderUrl: "build/myunityapp.loader.js",
//         dataUrl: "build/myunityapp.data",
//         frameworkUrl: "build/myunityapp.framework.js",
//         codeUrl: "build/myunityapp.wasm",
//     });
//
//     return <Unity unityProvider={unityProvider} />;
// }