import React, { useEffect, useState, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Preload, useGLTF } from '@react-three/drei';
import CanvasLoader from '../Loader';

// Computers component for the 3D model
const Computers = ({ isMobile }) => {
  // Load the 3D model using useGLTF hook
  const computer = useGLTF('./desktop_pc/scene.gltf');
  const groupRef = useRef();

  // State variable to control rotation
  const [rotation, setRotation] = useState(0);

  // Use the useFrame hook to perform updates on each frame
  useFrame(() => {
    // Update the rotation angle over time
    setRotation((rotation) => rotation + 0.001);
  });

  return (
    // Group the components to apply rotation on the group
    <group ref={groupRef} rotation-y={rotation}>
      {/* Lights for the scene */}
      <hemisphereLight intensity={0.15} groundColor="black" />
      <pointLight intensity={1} />
      <spotLight position={[-20, 50, 10]} angle={0.12} penumbra={1} intensity={1} castShadow />

      {/* Render the 3D model */}
      <primitive
        object={computer.scene}
        scale={isMobile ? 0.5 : 0.65}
        position={isMobile ? [-2.5, -2.5, -2.2] : [0, -3, -1.3]}
        rotation={[-0.01, -0.2, -0.2]}
      />
    </group>
  );
};

// ComputersCanvas component that contains the 3D model
const ComputersCanvas = () => {
  // State to determine if the screen is mobile or not
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Add a listener for changes to the screen size
    const mediaQuery = window.matchMedia("(max-width: 500px)");

    // Set the initial value of the isMobile state variable
    setIsMobile(mediaQuery.matches);

    // Define the callback function to handle the changes to the media query
    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    // Add the callback function as a listener for changes to the media query
    mediaQuery.addEventListener('change', handleMediaQueryChange);

    // Remove the listener when the component is unmounted
    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange);
    };
  }, []);

  return (
    <Canvas
      frameloop="demand"
      shadows
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        {/* Render the Computers component and pass the isMobile state */}
        <Computers isMobile={isMobile} />
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default ComputersCanvas;





