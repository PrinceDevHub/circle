import React from 'react'
import './App.css'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'

import Cyl from './Cyl'

function App() {
  return (
    <Canvas camera={{ fov: 35, position: [0, 0, 5] }}>
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />

      {/* 3D Object */}
      <Cyl />

      {/* Postprocessing effects */}
      <EffectComposer>
        <Bloom
          mipmapBlur={true}         // ✅ correct spelling
          intensity={1.5}            // 💡 Reduce intensity if 7.0 is too much
          luminanceThreshold={0}
          luminanceSmoothing={0.9}
        />
      </EffectComposer>

      {/* Controls */}
      <OrbitControls />
    </Canvas>
  )
}

export default App
