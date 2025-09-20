import React, { useRef, useState, useEffect } from 'react'
import { useTexture } from '@react-three/drei'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'

const Cyl = () => {
  const textures = useTexture([
    './images.png',
    './images1.png',
    './images2.png',
    './images3.png',
    './images4.png',
    './images5.png'
  ])

  const cyl = useRef()
  const [currentTexture, setCurrentTexture] = useState(0)

  // Apply filtering to sharpen textures
  useEffect(() => {
    textures.forEach((texture) => {
      texture.minFilter = THREE.NearestFilter
      texture.magFilter = THREE.NearestFilter
      texture.anisotropy = 16
      texture.needsUpdate = true
    })
  }, [textures])

  // Rotate cylinder
  useFrame((state, delta) => {
    if (cyl.current) {
      cyl.current.rotation.y += delta
    }
  })

  // Cycle textures every 2s
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTexture((prev) => (prev + 1) % textures.length)
    }, 2000)

    return () => clearInterval(interval)
  }, [textures.length])

  return (
    <group rotation={[0, 1.4, 0.5]}>
      <mesh ref={cyl}>
        <cylinderGeometry args={[1, 1, 1, 60, 60, true]} />
        <meshStandardMaterial
          map={textures[currentTexture]}
          transparent
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  )
}

export default Cyl
