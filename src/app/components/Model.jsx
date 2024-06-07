import { TextContent } from './TextContent';
import {
  useGLTF,
  Text,
  OrbitControls,
  MeshTransmissionMaterial,
} from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import React, { useEffect, useRef, useState } from 'react';
import { useControls } from 'leva';
import {
  EffectComposer,
  ChromaticAberration,
  Bloom,
  Glitch,
  Vignette,
  Noise,
  RenderPass,
  MaskPass,
} from '@react-three/postprocessing';

export const Model = () => {
  const mesh = useRef();
  const controls = useRef();
  const { viewport, camera } = useThree();
  const [scaleValue, setScaleValue] = useState(1);
  const [upperYValue, setUpperYValue] = useState(0);
  const [lowerYValue, setLowerYValue] = useState(0);
  const [upperFontSize, setUpperFontSize] = useState(0);
  const [lowerFontSize, setLowerFontSize] = useState(0);
  const isMobile = window.innerWidth < 600;

  const { nodes } = useGLTF('/medias/logo__3d.glb');

  const materialProps = useControls('Material', {
    thickness: { value: 0.2, min: 0, max: 3, step: 0.05 },
    roughness: { value: 0.25, min: 0, max: 1, step: 0.01 },
    transmission: { value: 1, min: 0, max: 1, step: 0.1 },
    ior: { value: 1.2, min: 0, max: 3, step: 0.1 },
    chromaticAberration: { value: 0.02, min: 0, max: 1 },
    backside: { value: true },
  });

  const effectProps = useControls('Effects', {
    chromaticAberration: { value: 0.5, min: 0, max: 20 },
    bloomIntensity: { value: 0.3, min: 0, max: 1 },
    glitchIntensity: { value: 0.5, min: 0, max: 1 },
    vignetteDarkness: { value: 0.5, min: 0, max: 10 },
    noiseOpacity: { value: 0.2, min: 0, max: 10 },
  });

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    const scale = scaleValue + Math.sin(time) * 0.008;
    const y = Math.sin(time) * 0.01;
    if (mesh.current) {
      mesh.current.scale.set(scale, scale, scale);
      mesh.current.rotation.z += 0.001;
      mesh.current.position.y = y;
      mesh.current.position.x = y;
    }
  });

  useEffect(() => {
    setScaleValue(isMobile ? 20 : 6);
  }, [isMobile]);

  useEffect(() => {
    if (controls.current && mesh.current) {
      controls.current.target.copy(mesh.current.position);
      controls.current.update();
    }
  }, [mesh.current]);

  return (
    <group dispose={null} scale={viewport.width / 3}>
      <TextContent />
      <mesh ref={mesh} {...nodes.Rig} geometry={nodes.Rig.geometry}>
        <MeshTransmissionMaterial {...materialProps} />
      </mesh>
      <OrbitControls
        ref={controls}
        minAzimuthAngle={-Math.PI / 8}
        maxAzimuthAngle={Math.PI / 8}
        minPolarAngle={Math.PI / 2}
        maxPolarAngle={Math.PI - Math.PI / 2}
        enableZoom={false}
      />
    </group>
  );
};
