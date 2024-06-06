'use client';

import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Model } from './Model';
import { Environment } from '@react-three/drei';

export default function Scene() {
  return (
    <Canvas
      style={{
        background: '#000000',
        background: '-webkit-linear-gradient(to left, #191919, #000000)',
        background: 'linear-gradient(to left, #191919, #000000)',
      }}
    >
      <directionalLight intensity={3} position={[0, 3, 2]} />
      <Environment preset="studio" />
      <Model />
    </Canvas>
  );
}
